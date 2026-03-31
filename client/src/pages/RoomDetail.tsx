import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { createBooking, getRoomDetail } from "../store/slices/hotelSlice";
import { checkAvailability } from "../store/slices/userSlice";
import type { AppDispatch, RootState } from "../store/store";
import type { Room, RoomCommon } from "../types";
import { getRandomRating } from "../utils/helper";
import RoomDetailLoading from "../components/Loading/RoomDetailLoading";
import toast from "react-hot-toast";

export default function RoomDetail() {
  const [room, setRoom] = useState<Room | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [formData, setFormDate] = useState<{
    checkInDate: string;
    checkOutDate: string;
    guests: number;
  }>({
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  });
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isRoomDetailLoading, isBookingLoading } = useSelector(
    (state: RootState) => state.hotel
  );
  const handleCheckAvailability = async () => {
    if (!room) {
      toast.error("Room details are still loading");
      return;
    }

    if (!formData.checkInDate || !formData.checkOutDate) {
      toast.error("Please select both check-in and check-out dates");
      return;
    }

    if (formData.checkInDate >= formData.checkOutDate) {
      toast.error("Check-In Date must be less than Check-Out Date");
      return;
    }

    try {
      const isAvailable = await dispatch(
        checkAvailability({
          room: room._id,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
        })
      ).unwrap();

      setIsAvailable(isAvailable);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAvailable) {
      await handleCheckAvailability();
      return;
    }
    try {
      await dispatch(
        createBooking({
          room: room?._id as string,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
          guests: formData.guests,
        })
      ).unwrap();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      navigate("/my-bookings");
    } catch (error) {
      console.error(error);
    }
    console.log(formData);
  };

  useEffect(() => {
    dispatch(getRoomDetail(id as string))
      .unwrap()
      .catch(() => {
        // allow retry, errors handled via toast
      })
      .then((room) => {
        setRoom(room as Room);
        const initialImage = (room as Room).images[0]?.url ?? "";
        setMainImage(initialImage);
      });
  }, [dispatch, id]);

  if (isRoomDetailLoading) {
    return <RoomDetailLoading />;
  }

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span className="font-inter text-sm">{room.roomType}</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>
        {/* Room Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating rating={getRandomRating()} />
          <p className="ml-2">200+ reviews</p>
        </div>

        {/* Room Address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Room Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage || ""}
              alt={room.hotel.name}
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  src={image.url}
                  alt={`Room Image`}
                  key={index}
                  onClick={() => setMainImage(image.url)}
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                    mainImage === image.url && "outline-2 outline-orange-500"
                  }`}
                />
              ))}
          </div>
        </div>

        {/* Room Hightlights */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div>
            <h1 className="text-3xl mdLtext-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                >
                  <img
                    src={facilityIcons[amenity as keyof typeof facilityIcons]}
                    alt={amenity}
                    className="size-5"
                  />
                  <p>{amenity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Room Price */}
          <p className="text-2xl font-medium">${room.pricePerNight} /night</p>
        </div>

        <form
          action=""
          className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="checkInDate" className="font-medium">
              Check-In
            </label>
            <input
              type="date"
              id="checkInDate"
              placeholder="Check-In"
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
              aria-label="Check In Date"
              value={formData.checkInDate}
              onChange={(e) =>
                setFormDate({ ...formData, checkInDate: e.target.value })
              }
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="w-px h-15 bg-gray-300/70 max-md:hidden " />

          <div className="flex flex-col">
            <label htmlFor="checkOutDate" className="font-medium">
              Check-Out
            </label>
            <input
              type="date"
              id="checkOutDate"
              placeholder="Check-Out"
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
              aria-label="Check Out Date"
              value={formData.checkOutDate}
              onChange={(e) =>
                setFormDate({ ...formData, checkOutDate: e.target.value })
              }
              min={formData.checkInDate}
            />
          </div>

          <div className="w-px h-15 bg-gray-300/70 max-md:hidden " />

          <div className="flex flex-col">
            <label htmlFor="guests" className="font-medium">
              Guests
            </label>
            <input
              type="number"
              id="guests"
              placeholder="Guests"
              className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
              aria-label="Guests"
              min={1}
              value={formData.guests}
              onChange={(e) =>
                setFormDate({ ...formData, guests: Number(e.target.value) })
              }
            />
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-15 py-23 md:py-4 text-base cursor-pointer"
            disabled={isBookingLoading}
          >
            {isBookingLoading
              ? "Booking..."
              : isAvailable
              ? "Book Now"
              : "Check Availability"}
          </button>
        </form>

        {/* Common Specifications */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((item: RoomCommon, index: number) => (
            <div key={index} className="flex items-start gap-2">
              <img
                src={item.icon}
                alt={`${item.title}-icon`}
                className="w-6.5"
              />
              <div>
                <p className="text-base">{item.title}</p>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p className="text-base leading-6">
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable Two bedroom apartment has a true
            city feeling. The price quoted is for two guest, at the guest slot
            please mark the number of guests to get the exact price for groups.
            The Guests will be allocated ground floor according to availability.
            You get the comfortable two bedroom apartment that has a true city
            feeling.
          </p>
        </div>
        {/* Hosted By */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-4">
            <img
              src={room.hotel.owner.image}
              alt="Host"
              className="size-14 md:size-18 rounded-full"
              loading="lazy"
              title={room.hotel.owner.username}
            />
            <div className="">
              <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
              <div className="flex items-center mt-1">
                <StarRating rating={getRandomRating()} />
                <p className="ml-2">200+ reviews</p>
              </div>
            </div>
          </div>

          <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">
            Contact Now
          </button>
        </div>
      </div>
    )
  );
}
