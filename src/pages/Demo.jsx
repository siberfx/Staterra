import { nl } from '../translations'
import { PageHero } from '../components/hero'
import { DemoForm } from '../components/form'

function Demo() {
  const steps = [
    nl('demo.step1'),
    nl('demo.step2'),
    nl('demo.step3'),
    nl('demo.step4'),
    nl('demo.step5'),
  ]

  return (
    <>
      <PageHero
        title={nl('demo.title')}
        subtitle={nl('demo.subtitle')}
        breadcrumbs={[{ label: nl('nav.demoAanvragen') }]}
      />

      <section className="container-page pt-12 md:pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            {nl('demo.processTitle')}
          </h2>
          <div className="bg-white overflow-hidden shadow-sm">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 px-5 py-4.5 ${i < steps.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[13px] font-medium text-gray-600">
                  {i + 1}
                </span>
                <span className="text-[15px] text-gray-900 leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white overflow-hidden p-8 shadow-sm">
          <DemoForm />
        </div>
        </div>
      </section>
    </>
  )
}

export default Demo
