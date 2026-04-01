export default function DetailSkeleton() {
  return (
    <>
      <section className="pt-12 pb-8 bg-white">
        <div className="container-page animate-pulse">
          <div className="flex gap-2 mb-6">
            <div className="h-3 w-12 bg-gray-200 rounded" />
            <div className="h-3 w-3 bg-gray-200 rounded" />
            <div className="h-3 w-10 bg-gray-200 rounded" />
            <div className="h-3 w-3 bg-gray-200 rounded" />
            <div className="h-3 w-36 bg-gray-200 rounded" />
          </div>
          <div className="h-12 md:h-14 bg-gray-200 rounded w-3/4 mb-6" />
          <div className="flex items-center gap-4 mb-8">
            <div className="h-5 w-20 bg-gray-200 rounded" />
            <div className="h-1 w-1 bg-gray-200 rounded-full" />
            <div className="h-5 w-28 bg-gray-200 rounded" />
            <div className="h-1 w-1 bg-gray-200 rounded-full" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>
          <div className="flex gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        </div>
      </section>
      <div className="w-full mb-16">
        <div className="container-page">
          <div className="w-full h-[400px] md:h-[500px] bg-gray-200 rounded-none animate-pulse" />
        </div>
      </div>
      <div className="container-page mb-24 animate-pulse">
        <div className="max-w-none space-y-4">
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-5/6" />
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-4/5" />
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    </>
  )
}
