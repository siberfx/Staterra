function TimelineSkeleton() {
  return (
    <div className="space-y-0">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="py-10 border-t border-gray-100 first:border-t-0 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-12">
            <div className="flex flex-col gap-2">
              <div className="h-4 bg-gray-200 w-24" />
              <div className="h-6 w-12 bg-gray-200 rounded-full" />
            </div>
            <div>
              <div className="h-7 bg-gray-200 w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 w-full mb-2" />
              <div className="h-4 bg-gray-200 w-2/3 mb-4" />
              <div className="space-y-1.5 mb-4">
                <div className="h-4 bg-gray-200 w-full" />
                <div className="h-4 bg-gray-200 w-4/5" />
                <div className="h-4 bg-gray-200 w-3/4" />
              </div>
              <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                <div className="h-3 w-28 bg-amber-200/50 rounded mb-2" />
                <div className="h-4 bg-amber-200/50 rounded w-full" />
                <div className="h-4 bg-amber-200/50 rounded w-5/6 mt-1" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TimelineSkeleton
