import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import HotelCard from "./HotelCard";
import Title from "./Title";
import FeaturedHotelLoading from "./Loading/FeaturedHotelLoading";
import { useEffect } from "react";
import { getRecommendRooms } from "../store/slices/userSlice";
import type { AppDispatch } from "../store/store";
export default function RecommendHotel() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { recommendRooms, isUserLoading } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(getRecommendRooms());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 py-20">
      <Title
        title="Recommend Hotel Rooms"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        align="center"
        font="font-playfair"
      />
      <div className="flex flex-wrap items-center justify-center gap-6 mt-20 w-full">
        {isUserLoading ? (
          <FeaturedHotelLoading />
        ) : (
          recommendRooms
            ?.slice(0, 4)
            .slice(0, 4)
            .map((room, index) => (
              <HotelCard key={index} room={room} index={index} />
            ))
        )}
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
