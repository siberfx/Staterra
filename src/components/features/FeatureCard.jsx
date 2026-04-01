function FeatureCard({ title, description }) {
  return (
    <div className="flex flex-col items-start group pl-6 border-l-4 border-l-primary">
      <h3 className="text-xl font-bold text-black mb-3 group-hover:text-secondary transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      <div className="h-px w-12 bg-gray-200 group-hover:bg-secondary transition-colors mt-auto" />
    </div>
  )
}

export default FeatureCard
