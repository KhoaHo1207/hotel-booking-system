export default function RoomLoading() {
  return (
    <div>
      {/* Title skeleton */}
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-96 bg-gray-200 rounded mt-2 animate-pulse"></div>

      <div className="mt-8">
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Table skeleton */}
      <div className="w-full max-w-3xl border border-gray-300 rounded-lg max-h-96 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th className="py-3 px-4 max-sm:hidden">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th className="py-3 px-4">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th className="py-3 px-4">
                <div className="h-4 w-16 bg-gray-200 rounded mx-auto animate-pulse"></div>
              </th>
            </tr>
          </thead>

          <tbody>
            {[...Array(6)].map((_, index) => (
              <tr key={index}>
                <td className="py-3 px-4 border-t border-gray-300">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-3 px-4 border-t max-sm:hidden border-gray-300">
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-3 px-4 border-t border-gray-300">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-3 px-4 border-t text-center border-gray-300">
                  {/* Toggle skeleton */}
                  <div className="w-12 h-7 bg-gray-200 rounded-full mx-auto animate-pulse relative">
                    <div className="absolute left-1 top-1 size-5 bg-gray-300 rounded-full"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
