import { get, post, ApiError } from './api'
import { getPageSections } from './pageSectionsService'

const CONTACT_LOG = '[ContactForm]'

let cache = null
let formConfigCache = null

/**
 * Normaliseert GET /contact/subjects (array of strings of { value, label, title, slug, … }).
 */
export function normalizeSubjects(raw) {
  if (raw == null) return []
  const list = Array.isArray(raw) ? raw : raw?.data ?? raw?.subjects ?? []
  if (!Array.isArray(list)) return []
  return list
    .map((item) => {
      if (typeof item === 'string') {
        return { value: item, label: item }
      }
      const value =
        item.value ?? item.slug ?? item.key ?? item.title ?? item.name ?? item.id
      const label = item.label ?? item.title ?? item.name ?? String(value ?? '')
      if (value == null || value === '') return null
      return { value: String(value), label: String(label || value) }
    })
    .filter(Boolean)
}

/**
 * GET /api/contact/subjects — onderwerpen voor het contactformulier (reden).
 */
export async function getContactSubjects() {
  try {
    const res = await get('contact/subjects')
    return normalizeSubjects(res?.data)
  } catch {
    return []
  }
}

export async function getContact() {
  if (cache) return cache
  const res = await get('contact')
  const data = res?.data ?? {}
  const subjects = res?.subjects ?? data?.subjects ?? []
  const faqs = res?.faqs ?? null
  cache = { ...data, subjects, faqs }
  return cache
}

export function getCachedContact() {
  return cache
}

/** Zelfde logica als newsletter Cta26: pad relatief t.o.v. API base (/api). */
export function normalizeSubmitPath(endpoint) {
  if (endpoint == null || endpoint === '') return 'contact'
  const s = String(endpoint).trim()
  if (s.startsWith('http')) {
    try {
      const u = new URL(s)
      let p = u.pathname.replace(/\/$/, '')
      if (p.startsWith('/api/')) p = p.slice(5)
      else if (p.startsWith('api/')) p = p.slice(4)
      else if (p.startsWith('/')) p = p.slice(1)
      return p || 'contact'
    } catch {
      return 'contact'
    }
  }
  return s.replace(/^\/api\//, '').replace(/^\//, '') || 'contact'
}

function normalizeFieldOptions(raw) {
  if (!Array.isArray(raw)) return []
  return raw
    .map((o) => {
      if (o == null) return null
      if (typeof o === 'string') return { value: o, label: o }
      const value = o.value ?? o.id ?? o.key ?? o.slug
      const label = o.label ?? o.title ?? o.name ?? String(value ?? '')
      if (value === undefined || value === null || value === '') return null
      return { value: String(value), label: String(label || value) }
    })
    .filter(Boolean)
}

function normalizeAccept(raw) {
  if (raw == null) return undefined
  if (Array.isArray(raw)) return raw.filter(Boolean).join(',')
  return String(raw)
}

/**
 * Eén veld uit PageSection (CMS): `key`, `ui.width`, `ui.rows`, `ui.autocomplete`, `ui.layout` (radio).
 */
export function normalizeContactField(raw) {
  if (!raw || typeof raw !== 'object') return null
  const name = raw.key ?? raw.name ?? raw.field ?? raw.id
  if (name == null || String(name).trim() === '') return null
  let type = String(raw.type ?? 'text').toLowerCase()
  if (type === 'string') type = 'text'

  const ui = raw.ui && typeof raw.ui === 'object' ? raw.ui : {}
  const width = ui.width === 'half' || raw.width === 'half' ? 'half' : 'full'
  const rowsFromUi = Number(ui.rows)
  const rowsFromRaw = Number(raw.rows)
  const rows =
    rowsFromUi > 0 ? rowsFromUi : rowsFromRaw > 0 ? rowsFromRaw : 5
  const autocomplete =
    ui.autocomplete != null ? String(ui.autocomplete) : undefined
  const radioLayout = ui.layout === 'inline' ? 'inline' : 'stacked'

  const defaultValue =
    raw.default_value != null
      ? String(raw.default_value)
      : raw.default != null
        ? String(raw.default)
        : ''

  const options = normalizeFieldOptions(raw.options ?? raw.choices)
  let checkboxOptionValue
  if (type === 'checkbox' && options.length === 1) {
    const ov = options[0].value
    if (ov != null && ov !== '') checkboxOptionValue = String(ov)
  }

  return {
    name: String(name).trim(),
    label: raw.label ?? raw.title ?? String(name),
    type,
    required: Boolean(raw.required),
    placeholder: raw.placeholder != null ? String(raw.placeholder) : '',
    options,
    width,
    rows,
    accept: normalizeAccept(raw.accept),
    defaultValue,
    autocomplete,
    radioLayout,
    checkboxOptionValue,
  }
}

function buildDynamicConfigFromSectionContent(c) {
  const fieldsRaw = c.fields ?? c.form_fields ?? c.form?.fields
  if (!Array.isArray(fieldsRaw) || fieldsRaw.length === 0) return null
  const fields = fieldsRaw.map(normalizeContactField).filter(Boolean)
  if (!fields.length) return null

  const submitPath = normalizeSubmitPath(c.submit_endpoint ?? 'contact')
  const extra =
    c.extra_params && typeof c.extra_params === 'object' && !Array.isArray(c.extra_params)
      ? { ...c.extra_params }
      : {}

  return {
    mode: 'dynamic',
    submitPath,
    fields,
    extra_params: extra,
    attachment_required_for: Array.isArray(c.attachment_required_for)
      ? c.attachment_required_for
      : [],
    submit_button_text:
      c.submit_button_text ?? c.button_text ?? 'Versturen',
  }
}

/**
 * Bepaalt formulierconfig uit reeds geladen page-sections (contact).
 * Voorrang: section_key `contact-form`, daarna eerste sectie met fields[].
 */
export function extractDynamicFormConfig(sections) {
  const list = Array.isArray(sections) ? sections : []
  const byFormKey = list.find(
    (s) =>
      s?.section_key === 'contact-form' &&
      Array.isArray(s.content?.fields) &&
      s.content.fields.length > 0,
  )
  const section = byFormKey ?? list.find(
    (s) =>
      Array.isArray(s.content?.fields) && s.content.fields.length > 0,
  )
  if (!section?.content) return null
  return buildDynamicConfigFromSectionContent(section.content)
}

/**
 * GET page-sections?page=contact — dynamisch formulier.
 */
export async function loadDynamicContactFormFromSections() {
  const sections = await getPageSections('contact')
  return extractDynamicFormConfig(sections)
}

/**
 * @param {Array|undefined} preloadedSections — van Contact-pagina (één GET); anders interne fetch.
 */
export async function getContactFormConfig(preloadedSections) {
  const fromParent = Array.isArray(preloadedSections)
  if (!fromParent && formConfigCache) return formConfigCache

  const dynamic = fromParent
    ? extractDynamicFormConfig(preloadedSections)
    : await loadDynamicContactFormFromSections()

  if (dynamic) {
    if (!fromParent) formConfigCache = dynamic
    return dynamic
  }

  const subjects = await getContactSubjects()

  if (subjects.length > 0) {
    const cfg = {
      ...getEmptyFormConfig(),
      subjects,
      attachment_required_for: ['ondersteuning', 'Ondersteuning'],
    }
    if (!fromParent) formConfigCache = cfg
    return cfg
  }

  try {
    const contact = await getContact()
    if (contact?.form_config?.subjects?.length || contact?.form_config?.contact_preferences?.length) {
      const cfg = contact.form_config
      if (!fromParent) formConfigCache = cfg
      return cfg
    }
    if (contact?.subjects?.length) {
      const fromContact = [...contact.subjects]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((s) => ({ value: s.title, label: s.title }))
      const cfg = {
        ...getEmptyFormConfig(),
        subjects: fromContact,
        attachment_required_for: ['ondersteuning', 'Ondersteuning'],
      }
      if (!fromParent) formConfigCache = cfg
      return cfg
    }
  } catch (_) {}

  const empty = getEmptyFormConfig()
  if (!fromParent) formConfigCache = empty
  return empty
}

export function invalidateContactFormConfigCache() {
  formConfigCache = null
}

function getEmptyFormConfig() {
  return {
    subjects: [],
    contact_preferences: [
      { value: 'query', label: 'Via formulier' },
      { value: 'call', label: 'Telefonisch' },
      { value: 'email', label: 'Per e-mail' },
    ],
    attachment_required_for: [],
  }
}

function collectBijlagen(data) {
  const out = []
  if (data.bijlage instanceof File) out.push(data.bijlage)
  if (Array.isArray(data.bijlagen)) {
    for (const f of data.bijlagen) {
      if (f instanceof File) out.push(f)
    }
  }
  return out
}

/**
 * Dynamische POST naar submitPath (bijv. contact → POST /api/contact).
 * Zonder bestanden: JSON. Met bestanden: multipart FormData.
 */
export async function submitContactDynamic(submitPath, values, files = {}) {
  const fileEntries = Object.entries(files).filter(([, f]) => f instanceof File && f.size > 0)

  if (fileEntries.length > 0) {
    const form = new FormData()
    for (const [k, v] of Object.entries(values)) {
      if (v === undefined || v === null) continue
      if (typeof v === 'boolean') {
        form.append(k, v ? '1' : '0')
      } else {
        form.append(k, String(v))
      }
    }
    for (const [k, f] of fileEntries) {
      form.append(k, f)
    }
    console.info(CONTACT_LOG, `POST ${submitPath} (multipart)`, {
      keys: [...Object.keys(values), ...fileEntries.map(([k]) => k)],
    })
    return post(submitPath, form)
  }

  const body = {}
  for (const [k, v] of Object.entries(values)) {
    if (v === undefined) continue
    body[k] = v
  }

  console.info(CONTACT_LOG, `POST ${submitPath} (json)`, { keys: Object.keys(body) })
  return post(submitPath, body)
}

/** Waarde van topic/reden-achtig veld voor bijlage-regels. */
export function getTopicLikeValue(fields, values) {
  const TOPIC_NAMES = new Set(['topic', 'reden', 'onderwerp', 'subject'])
  for (const f of fields ?? []) {
    if (TOPIC_NAMES.has(f.name)) {
      const v = values[f.name]
      return v != null ? String(v) : ''
    }
  }
  return ''
}

export async function submitContact(data) {
  const files = collectBijlagen(data)
  const hasFile = files.length > 0
  const optIn = data['avg-optin'] === true || data['avg-optin'] === '1'
  const fn = data.first_name ?? ''
  const ln = data.last_name ?? ''
  const reden = data.reden ?? ''
  const pref = data.contact_preference ?? 'query'

  const appendField = (target, key, val) => {
    if (val != null && val !== '') target.append(key, val)
  }

  if (hasFile) {
    const form = new FormData()
    form.append('first_name', fn)
    form.append('last_name', ln)
    form.append('voornaam', fn)
    form.append('achternaam', ln)
    form.append('email', data.email ?? '')
    form.append('reden', reden)
    form.append('onderwerp', reden)
    form.append('bericht', data.bericht ?? '')
    form.append('avg-optin', optIn ? '1' : '0')
    form.append('contact_preference', pref)
    appendField(form, 'phone', data.phone)
    appendField(form, 'organisatie', data.organisatie)
    appendField(form, 'company_name', data.organisatie)
    appendField(form, 'country_code', data.country_code)
    appendField(form, 'nieuwsbrief', data.nieuwsbrief)
    for (const file of files) {
      form.append('bijlage[]', file)
    }
    console.info(CONTACT_LOG, 'POST contact/verstuur (multipart)', {
      bestanden: files.length,
    })
    try {
      const res = await post('contact/verstuur', form)
      console.info(
        CONTACT_LOG,
        'API succes — HTTP 2xx (axios levert alleen body; geen 4xx/5xx)',
        res,
      )
      return res
    } catch (e) {
      const status = e instanceof ApiError ? e.status : undefined
      console.warn(CONTACT_LOG, 'API fout', { status, message: e?.message })
      throw e
    }
  }

  const params = new URLSearchParams()
  params.set('first_name', fn)
  params.set('last_name', ln)
  params.set('voornaam', fn)
  params.set('achternaam', ln)
  params.set('email', data.email ?? '')
  params.set('reden', reden)
  params.set('onderwerp', reden)
  params.set('bericht', data.bericht ?? '')
  params.set('avg-optin', optIn ? '1' : '0')
  params.set('contact_preference', pref)
  if (data.phone) params.set('phone', data.phone)
  if (data.organisatie) params.set('organisatie', data.organisatie)
  if (data.organisatie) params.set('company_name', data.organisatie)
  if (data.country_code) params.set('country_code', data.country_code)
  if (data.nieuwsbrief) params.set('nieuwsbrief', data.nieuwsbrief)
  console.info(CONTACT_LOG, 'POST contact/verstuur (x-www-form-urlencoded)', {
    heeftBestand: false,
  })
  try {
    const res = await post('contact/verstuur', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    console.info(
      CONTACT_LOG,
      'API succes — HTTP 2xx (axios levert alleen body; geen 4xx/5xx)',
      res,
    )
    return res
  } catch (e) {
    const status = e instanceof ApiError ? e.status : undefined
    console.warn(CONTACT_LOG, 'API fout', { status, message: e?.message })
    throw e
  }
}
