export default function FeaturedHotelLoading() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="max-w-70 w-full rounded-xl overflow-hidden bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
        >
          {/* Image */}
          <div className="h-44 w-full bg-gray-300"></div>

          {/* Content */}
          <div className="p-4 pt-5 space-y-3">
            {/* Hotel name + rating */}
            <div className="flex items-center justify-between">
              <div className="h-5 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-10 bg-gray-300 rounded"></div>
            </div>

            {/* Location */}
            <div className="h-4 w-24 bg-gray-200 rounded"></div>

            {/* Price + button */}
            <div className="flex items-center justify-between mt-4">
              <div className="h-5 w-20 bg-gray-300 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
