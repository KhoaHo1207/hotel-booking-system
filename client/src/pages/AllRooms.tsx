import { useNavigate } from "react-router-dom";
import { roomsDummyData } from "../assets/assets";
import RoomCard from "../components/RoomCard";
import Title from "../components/Title";
import type { Room } from "../types";
import { useState } from "react";

const CheckBox = ({
  label,
  selected = false,
  onChange,
}: {
  label: string;
  selected: boolean;
  onChange: (value: boolean, label: string) => void;
}) => {
  return (
    <label
      htmlFor=""
      className="flex gap-3 items-center cursor-pointer mt-2 text-sm"
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked, label)
        }
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const RadioButton = ({
  label,
  selected = false,
  onChange,
}: {
  label: string;
  selected: boolean;
  onChange: (label: string) => void;
}) => {
  return (
    <label
      htmlFor=""
      className="flex gap-3 items-center cursor-pointer mt-2 text-sm"
    >
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

export default function AllRooms() {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Bed", "Family Bed"];

  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 1500",
    "1500 to 2000",
  ];

  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-36 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Rooms */}
      <div>
        <div>
          <Title
            align="left"
            title="Hotel Rooms"
            subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
          />
        </div>

        {roomsDummyData.map((room: Room, index: number) => (
          <RoomCard
            key={index}
            room={room}
            onClick={() => {
              navigate(`/rooms/${room._id}`);
              window.scrollTo(0, 0);
            }}
          />
        ))}
      </div>
      {/* Filters */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-2.5 lg:border-b border-gray-300 ${
            openFilters && "border-b"
          }`}
        >
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <div className="text-xs cursor-pointer">
            <span
              className="lg:hidden"
              onClick={() => setOpenFilters(!openFilters)}
            >
              {openFilters ? "HIDE" : "SHOW"}
            </span>
            <span className="hidden lg:block">CLEAR</span>
          </div>
        </div>

        <div
          className={`${
            openFilters ? "h-auto" : "h-0 lg:h-auto"
          } overflow-hidden transition-all duration-700`}
        >
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular filters</p>
            {roomTypes.map((roomType, index) => (
              <CheckBox
                key={index}
                label={roomType}
                selected={false}
                onChange={() => {}}
              />
            ))}
          </div>
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`$ ${range}`}
                selected={false}
                onChange={() => {}}
              />
            ))}
          </div>
          <div className="px-5 py-5">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={false}
                onChange={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
