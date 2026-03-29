import { useCallback, useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { addRoom } from "../../store/slices/hotelSlice";
import { Loader2 } from "lucide-react";

export default function AddRoom() {
  const [images, setImages] = useState<Record<string, File | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    priceperNight: 0,
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });
  const { isRoomAdding } = useSelector((state: RootState) => state.hotel);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(
        addRoom({
          roomType: inputs.roomType,
          pricePerNight: inputs.priceperNight,
          amenities: Object.keys(inputs.amenities).filter(
            (key) => inputs.amenities[key as keyof typeof inputs.amenities]
          ),
          images: Object.values(images).filter((image) => image !== null),
        })
      );
      setInputs({
        roomType: "",
        priceperNight: 0,
        amenities: {
          "Free Wifi": false,
          "Free Breakfast": false,
          "Room Service": false,
          "Mountain View": false,
          "Pool Access": false,
        },
      });
      setImages({
        "1": null,
        "2": null,
        "3": null,
        "4": null,
      });
    },
    [dispatch, inputs, images]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience."
      />

      {/* Upload Area For Images */}
      <p className="text-gray-800 mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key, index) => (
          <label htmlFor={`roomImage${key}`} key={index}>
            <img
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt=""
              className="cursor-pointer max-h-13 opacity-80"
            />
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setImages({ ...images, [key]: e.target.files?.[0] ?? null })
              }
            />
          </label>
        ))}
      </div>

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select
            name=""
            id=""
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setInputs({ ...inputs, roomType: e.target.value as string })
            }
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Bed">Luxury Bed</option>
            <option value="Family Bed">Family Bed</option>
          </select>
        </div>

        <div>
          <p className="mt-4 text-gray-800">
            Price <span className="text-xs">/night</span>
          </p>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputs({ ...inputs, priceperNight: Number(e.target.value) })
            }
            required
            min={0}
          />
        </div>
      </div>

      <p className="text-gray-800 mt-4">Amentities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {Object.keys(inputs.amenities).map((key, index) => (
          <div key={index} className="flex items-center ">
            <input
              type="checkbox"
              id={`amenity${index + 1}`}
              checked={inputs.amenities[key as keyof typeof inputs.amenities]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [key]:
                      !inputs.amenities[key as keyof typeof inputs.amenities],
                  },
                })
              }
              className="mr-2 cursor-pointer"
            />
            <label htmlFor={`amenity${index + 1}`} className="cursor-pointer">
              {key}
            </label>
          </div>
        ))}
      </div>

      <button
        className="bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer"
        disabled={isRoomAdding}
      >
        {isRoomAdding ? (
          <p className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Adding Room...</span>
          </p>
        ) : (
          <p>Add Room</p>
        )}
      </button>
    </form>
  );
}
