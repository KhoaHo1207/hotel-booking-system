import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomLoading from "../../components/Loading/RoomLoading";
import Title from "../../components/Title";
import {
  getOwnerRooms,
  toggleRoomAvailability,
} from "../../store/slices/hotelSlice";
import type { AppDispatch, RootState } from "../../store/store";

export default function ListRoom() {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const { ownerRooms, isOwnerRoomsLoading, isRoomAvailabilityToggling } =
    useSelector((state: RootState) => state.hotel);

  const dispatch = useDispatch<AppDispatch>();

  const handleToggleRoomAvailability = useCallback(
    (roomId: string) => {
      dispatch(toggleRoomAvailability(roomId))
        .unwrap()
        .then(() => {
          dispatch(getOwnerRooms()).unwrap();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getOwnerRooms()).unwrap();
  }, [dispatch]);

  if (isOwnerRoomsLoading || isRoomAvailabilityToggling) {
    return <RoomLoading />;
  }
  return (
    <div>
      <Title
        align="left"
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
        font="outfit"
      />

      <p className="text-gray-500 mt-8">All Rooms</p>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-96 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Price/ night
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {ownerRooms.map((room, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {room.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {room.amenities.join(", ")}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {currency} {room.pricePerNight}
                </td>
                <td className="py-3 px-4 border-t border-gray-300 text-center">
                  <label
                    htmlFor=""
                    className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3"
                    onClick={() => handleToggleRoomAvailability(room._id)}
                  >
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={room.isAvailable}
                    />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className="dot absolute left-1 top-1 size-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
