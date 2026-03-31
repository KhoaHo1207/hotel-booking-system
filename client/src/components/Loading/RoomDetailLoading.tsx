export default function RoomDetailLoading() {
  return (
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32 animate-pulse">
      {/* Title */}
      <div className="flex flex-col md:flex-row gap-2">
        <div className="h-8 w-64 bg-gray-300 rounded" />
        <div className="h-5 w-24 bg-gray-300 rounded" />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-3">
        <div className="h-4 w-24 bg-gray-300 rounded" />
        <div className="h-4 w-16 bg-gray-300 rounded" />
      </div>

      {/* Address */}
      <div className="h-4 w-80 bg-gray-300 rounded mt-3" />

      {/* Images */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full h-72 bg-gray-300 rounded-xl" />
        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-300 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10 gap-4">
        <div className="flex-1">
          <div className="h-6 w-72 bg-gray-300 rounded mb-4" />
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 w-24 bg-gray-300 rounded-lg" />
            ))}
          </div>
        </div>

        <div className="h-8 w-32 bg-gray-300 rounded" />
      </div>

      {/* Booking Form */}
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow p-6 rounded-xl mt-16">
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 w-20 bg-gray-300 rounded" />
          <div className="h-10 bg-gray-300 rounded" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="h-4 w-20 bg-gray-300 rounded" />
          <div className="h-10 bg-gray-300 rounded" />
        </div>

        <div className="flex flex-col gap-2 w-32">
          <div className="h-4 w-20 bg-gray-300 rounded" />
          <div className="h-10 bg-gray-300 rounded" />
        </div>

        <div className="h-12 w-40 bg-gray-300 rounded mt-auto" />
      </div>

      {/* Common Specs */}
      <div className="mt-20 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-6 h-6 bg-gray-300 rounded" />
            <div className="flex-1">
              <div className="h-4 w-40 bg-gray-300 rounded mb-1" />
              <div className="h-3 w-64 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="my-15 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-5/6" />
      </div>

      {/* Host */}
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full" />
        <div className="flex-1">
          <div className="h-5 w-40 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>
      </div>

      <div className="h-10 w-40 bg-gray-300 rounded mt-6" />
    </div>
  );
}
