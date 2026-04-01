import { useState, useEffect, useCallback } from 'react'
import { nl } from '../translations'
import {
  submitContact,
  submitContactDynamic,
  getContactFormConfig,
  getTopicLikeValue,
} from '../services/contactService'
import { ApiError } from '../services/api'

export function needsAttachmentForReden(redenVal, config) {
  if (!redenVal || typeof redenVal !== 'string') return false
  const r = redenVal.trim().toLowerCase()
  if (r.includes('ondersteuning')) return true
  return config.attachment_required_for?.some((x) => String(x).toLowerCase() === r) ?? false
}

function collectDynamicPayload(form, config) {
  const fd = new FormData(form)
  const values = { ...(config.extra_params ?? {}) }
  const files = {}

  for (const field of config.fields) {
    const n = field.name
    if (field.type === 'checkbox') {
      let checked = false
      for (const el of form.querySelectorAll('input[type="checkbox"]')) {
        if (el.name !== n) continue
        if (
          field.checkboxOptionValue != null &&
          el.value !== field.checkboxOptionValue
        ) {
          continue
        }
        checked = Boolean(el.checked)
        break
      }
      // CMS: enkele optie met `value` (b.v. consent) — backend valideert vaak `in:contact`, geen boolean.
      if (field.checkboxOptionValue != null) {
        values[n] = checked ? String(field.checkboxOptionValue) : ''
      } else {
        values[n] = checked
      }
      continue
    }
    if (field.type === 'radio') {
      let val = ''
      for (const el of form.querySelectorAll('input[type="radio"]')) {
        if (el.name !== n || !el.checked) continue
        val = el.value != null ? String(el.value) : ''
        break
      }
      values[n] = val
      continue
    }
    if (field.type === 'hidden') {
      const raw = fd.get(n)
      values[n] = raw != null ? String(raw) : field.defaultValue ?? ''
      continue
    }
    if (field.type === 'file') {
      const input = form.querySelector(`input[type="file"][name="${n}"]`)
      const f = input?.files?.[0]
      if (f && f.size > 0) files[n] = f
      continue
    }
    const v = fd.get(n)
    values[n] = v != null ? String(v).trim() : ''
  }

  return { values, files }
}

/**
 * @param {object} [options]
 * @param {Array} [options.initialSections] — page-sections `contact`; voorkomt dubbele GET op Contact-pagina.
 */
export function useContactForm(options = {}) {
  const { initialSections } = options
  const [config, setConfig] = useState(null)
  const [configLoading, setConfigLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [reden, setReden] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    let cancel = false
    setConfigLoading(true)
    getContactFormConfig(initialSections)
      .then((cfg) => {
        if (!cancel) setConfig(cfg)
      })
      .finally(() => {
        if (!cancel) setConfigLoading(false)
      })
    return () => {
      cancel = true
    }
  }, [initialSections])

  const getFieldError = useCallback(
    (name) => {
      const keys = [name, name.replace(/-/g, '_'), name.replace(/_/g, '-')]
      for (const k of keys) {
        const msg = fieldErrors[k]?.[0]
        if (msg) return msg
      }
      return null
    },
    [fieldErrors],
  )

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (!config) return
      setError(null)
      setFieldErrors({})
      setSuccess(null)

      const form = e.target

      if (config.mode === 'dynamic' && Array.isArray(config.fields) && config.fields.length > 0) {
        const { values, files } = collectDynamicPayload(form, config)
        const topicVal = getTopicLikeValue(config.fields, values)

        const needsAttachment = needsAttachmentForReden(topicVal, config)
        const fileFieldNames = config.fields.filter((f) => f.type === 'file').map((f) => f.name)
        const hasFile = fileFieldNames.some((n) => files[n] instanceof File)
        if (needsAttachment && !hasFile) {
          setError(nl('contact.attachment'))
          return
        }

        setSubmitting(true)
        try {
          const res = await submitContactDynamic(config.submitPath, values, files)
          const serverMessage =
            res && typeof res === 'object' && typeof res.message === 'string'
              ? res.message
              : null
          setSuccess(serverMessage ?? nl('contact.success'))
          form.reset()
          setReden('')
          setSelectedFile(null)
        } catch (err) {
          if (err instanceof ApiError && err.errors) {
            setFieldErrors(err.errors)
            setError(err.message)
          } else {
            setError(
              err?.message ?? 'Er is iets misgegaan. Probeer het later opnieuw.',
            )
          }
        } finally {
          setSubmitting(false)
        }
        return
      }

      const fd = new FormData(form)
      const first_name = fd.get('first_name')?.trim() ?? ''
      const last_name = fd.get('last_name')?.trim() ?? ''
      const email = fd.get('email')?.trim() ?? ''
      const phone = fd.get('phone')?.trim() ?? ''
      const redenVal = fd.get('reden') ?? ''
      const bericht = fd.get('bericht')?.trim() ?? ''
      const privacyChecked = form.querySelector('#avg-optin')?.checked ?? false
      const newsletterChecked = form.querySelector('#nieuwsbrief')?.checked ?? false
      const organisatie = fd.get('organisatie')?.trim() ?? ''
      const contact_preference = fd.get('contact_preference') ?? 'query'
      const country_code = fd.get('country_code')?.trim() ?? ''
      const file = selectedFile instanceof File && selectedFile.size > 0 ? selectedFile : undefined

      const data = {
        first_name,
        last_name,
        email,
        phone: phone || undefined,
        reden: redenVal,
        bericht,
        'avg-optin': privacyChecked ? '1' : '0',
        contact_preference,
        organisatie: organisatie || undefined,
        country_code: country_code || undefined,
        nieuwsbrief: newsletterChecked ? '1' : undefined,
        bijlage: file,
      }

      const needsAttachment = needsAttachmentForReden(redenVal, config)
      if (needsAttachment && !file) {
        setError(nl('contact.attachment'))
        return
      }

      setSubmitting(true)
      try {
        const res = await submitContact(data)
        const serverMessage =
          res && typeof res === 'object' && typeof res.message === 'string'
            ? res.message
            : null
        setSuccess(serverMessage ?? nl('contact.success'))
        form.reset()
        setReden('')
        setSelectedFile(null)
      } catch (err) {
        if (err instanceof ApiError && err.errors) {
          setFieldErrors(err.errors)
          setError(err.message)
        } else {
          setError(
            err?.message ?? 'Er is iets misgegaan. Probeer het later opnieuw.',
          )
        }
      } finally {
        setSubmitting(false)
      }
    },
    [config, selectedFile],
  )

  const subjects = config?.subjects ?? []
  const contactPreferences =
    config?.contact_preferences?.length > 0
      ? config.contact_preferences
      : [
          { value: 'query', label: 'Via formulier' },
          { value: 'call', label: 'Telefonisch' },
          { value: 'email', label: 'Per e-mail' },
        ]
  const showAttachment = config ? needsAttachmentForReden(reden, config) : false
  const isDynamic = config?.mode === 'dynamic' && (config?.fields?.length ?? 0) > 0

  return {
    config,
    configLoading,
    isDynamic,
    submitting,
    success,
    error,
    fieldErrors,
    reden,
    setReden,
    selectedFile,
    setSelectedFile,
    handleSubmit,
    getFieldError,
    subjects,
    contactPreferences,
    showAttachment,
  }
}
