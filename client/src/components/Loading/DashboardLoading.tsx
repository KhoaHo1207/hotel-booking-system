export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      {/* Title */}
      <div className="mb-6">
        <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-full max-w-xl bg-gray-200 rounded"></div>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-4 my-8">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8 w-48"
          >
            <div className="max-sm:hidden h-10 w-10 bg-gray-300 rounded"></div>

            <div className="flex flex-col sm:ml-4 gap-2 w-full">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-5 w-16 bg-gray-400 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings Title */}
      <div className="h-5 w-40 bg-gray-300 rounded mb-5"></div>

      {/* Table */}
      <div className="w-full max-w-3xl border border-gray-300 rounded max-h-80 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 p-4 flex justify-between">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 rounded max-sm:hidden"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>

        {/* Rows */}
        <div>
          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="flex justify-between items-center px-4 py-3 border-t border-gray-200"
            >
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-24 bg-gray-300 rounded max-sm:hidden"></div>
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
              <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
