import { assets, facilityIcons } from "../assets/assets";
import type { Room } from "../types";
import { getRandomRating } from "../utils/helper";
import StarRating from "./StarRating";

interface Props {
  room: Room;
  onClick: () => void;
}

export default function RoomCard({ room, onClick }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0">
      <img
        src={room.images[0]}
        alt={room.hotel.name}
        title="View Room Details"
        className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
        onClick={onClick}
      />
      <div className="md:w-1/2 flex flex-col gap-2">
        <p className="text-gray-500">{room.hotel.city}</p>
        <p
          className="text-gray-800 text-3xl font-playfair cursor-pointer"
          onClick={onClick}
        >
          {room.hotel.name}
        </p>
        <div className="flex items-center">
          <StarRating rating={getRandomRating()} />
          <p className="ml-2">200+ reviews</p>
        </div>
        <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm ">
          <img src={assets.locationIcon} alt="" />
          <span>{room.hotel.address}</span>
        </div>
        {/* Room Amenities */}
        <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
          {room.amenities.map((amenity: string, index: number) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
            >
              <img
                src={facilityIcons[amenity as keyof typeof facilityIcons]}
                alt={amenity}
              />
              <p className="text-xs">{amenity}</p>
            </div>
          ))}
        </div>

        {/* Room Price per Night */}
        <p className="text-xl font-medium text-gray-700">
          ${room.pricePerNight} /night
        </p>
      </div>
    </div>
  );
}
