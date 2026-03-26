import { useNavigate } from "react-router-dom";
import { roomsDummyData } from "../assets/assets";
import type { Room } from "../types";
import HotelCard from "./HotelCard";
import Title from "./Title";

export default function FeaturedDestination() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      <Title
        title="Featured Destination"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        align="center"
        font="font-playfair"
      />
      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {roomsDummyData.slice(0, 4).map((room: Room, index: number) => (
          <HotelCard key={index} room={room} index={index} />
        ))}
      </div>

      <button
        className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
        onClick={() => {
          navigate("/rooms");
          window.scrollTo(0, 0);
        }}
      >
        View All Destinations
      </button>
    </div>
  );
}
