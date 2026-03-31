import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import Title from "../components/Title";
import type { RootState } from "../store/store";
import type { Room } from "../types";

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
      htmlFor={label}
      className="flex gap-3 items-center cursor-pointer mt-2 text-sm"
    >
      <input
        type="checkbox"
        id={label}
        name={label}
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
      htmlFor={label}
      className="flex gap-3 items-center cursor-pointer mt-2 text-sm"
    >
      <input
        type="radio"
        id={label}
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

export default function AllRooms() {
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    roomTypes: string[];
    priceRanges: string[];
  }>({
    roomTypes: [],
    priceRanges: [],
  });
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

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

  const currency = import.meta.env.VITE_CURRENCY || "$";

  const navigate = useNavigate();
  const { rooms } = useSelector((state: RootState) => state.hotel);

  const handleFilterChange = (
    checked: boolean,
    value: string,
    type: "roomTypes" | "priceRanges"
  ) => {
    setSelectedFilters(
      (prevFilters: {
        roomTypes: string[];
        priceRanges: string[];
      }): { roomTypes: string[]; priceRanges: string[] } => {
        const updatedFilters = { ...prevFilters };
        if (checked) {
          updatedFilters[type].push(value);
        } else {
          updatedFilters[type] = updatedFilters[type].filter(
            (filter) => filter !== value
          );
        }
        return updatedFilters;
      }
    );
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
  };
  //Function to check if the room matches the selected room types
  const matchesRoomType = (room: Room) => {
    return (
      selectedFilters.roomTypes.length === 0 ||
      selectedFilters.roomTypes.includes(room.roomType)
    );
  };
  //Function to check if the room matches the selected price range
  const matchesPriceChange = (room: Room) => {
    return (
      selectedFilters.priceRanges.length === 0 ||
      selectedFilters.priceRanges.some((range) => {
        const [min, max] = range.split(" to ").map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    );
  };

  //Function to sort rooms based on the selected sort option
  const sortRooms = (a: Room, b: Room) => {
    if (selectedSort === "Price Low to High") {
      return a.pricePerNight - b.pricePerNight;
    } else if (selectedSort === "Price High to Low") {
      return b.pricePerNight - a.pricePerNight;
    } else if (selectedSort === "Newest First") {
      return (
        new Date(b.createdAt || "").getTime() -
        new Date(a.createdAt || "").getTime()
      );
    }
    return 0;
  };

  //Filter Destination
  const filterDestination = (room: Room) => {
    const destination = searchParams.get("destination");
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };

  //Filter and sort rooms based on the selcted filters and sort option
  const filteredRooms = useMemo(() => {
    return rooms
      .filter(
        (room) =>
          matchesRoomType(room) &&
          matchesPriceChange(room) &&
          filterDestination(room)
      )
      .sort(sortRooms);
  }, [rooms, selectedFilters, selectedSort, searchParams]);

  //Clear all filter
  const clearFilters = () => {
    setSelectedFilters({
      roomTypes: [],
      priceRanges: [],
    });
    setSelectedSort("");
    setSearchParams({});
    window.scrollTo(0, 0);
  };
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

        {filteredRooms.map((room, index) => (
          <RoomCard
            key={index}
            room={room as Room}
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
            <span className="hidden lg:block" onClick={clearFilters}>
              CLEAR
            </span>
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
                selected={selectedFilters.roomTypes.includes(roomType)}
                onChange={(checked) =>
                  handleFilterChange(checked, roomType, "roomTypes")
                }
              />
            ))}
          </div>
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`${currency} ${range}`}
                selected={selectedFilters.priceRanges.includes(range)}
                onChange={(checked) =>
                  handleFilterChange(checked, range, "priceRanges")
                }
              />
            ))}
          </div>
          <div className="px-5 py-5">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSort === option}
                onChange={() => handleSortChange(option)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
