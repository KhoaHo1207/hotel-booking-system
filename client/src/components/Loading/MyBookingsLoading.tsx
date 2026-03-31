export default function MyBookingsLoading() {
  return (
    <div className="py-28 md:pb-36 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 animate-pulse">
      {/* Title */}
      <div className="mb-6">
        <div className="h-8 w-56 bg-gray-300 rounded mb-3" />
        <div className="h-4 w-full max-w-2xl bg-gray-200 rounded" />
      </div>

      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] border-b border-gray-300 py-3 mb-4">
        <div className="h-4 w-24 bg-gray-300 rounded" />
        <div className="h-4 w-32 bg-gray-300 rounded" />
        <div className="h-4 w-20 bg-gray-300 rounded" />
      </div>

      {/* Booking Items */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] border-b border-gray-300 py-6 gap-4"
        >
          {/* Hotel Info */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-44 h-28 bg-gray-300 rounded" />

            <div className="flex flex-col gap-2 flex-1">
              <div className="h-5 w-48 bg-gray-300 rounded" />
              <div className="h-4 w-64 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-300 rounded mt-2" />
            </div>
          </div>

          {/* Date */}
          <div className="flex gap-8 md:items-center">
            <div>
              <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
              <div className="h-3 w-28 bg-gray-200 rounded" />
            </div>
            <div>
              <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
              <div className="h-3 w-28 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Payment */}
          <div className="flex flex-col gap-3 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full" />
              <div className="h-4 w-16 bg-gray-300 rounded" />
            </div>

            <div className="h-7 w-24 bg-gray-300 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
