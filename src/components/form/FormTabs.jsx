import { nl } from '../../translations'
import ContactForm from './ContactForm'

function FormTabs() {
  return (
    <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 sm:p-10">
        <p className="text-gray-600 mb-8">{nl('contact.tabQuestionDesc')}</p>
        <ContactForm />
      </div>
    </div>
  )
}

export default FormTabs
