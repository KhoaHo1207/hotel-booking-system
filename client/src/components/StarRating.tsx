import { assets } from "../assets/assets";

interface Props {
  rating: number;
}
export default function StarRating({ rating = 5 }: Props) {
  return (
    <>
      {Array(5)
        .fill("")
        .map((_: void, index: number) => (
          <img
            src={
              rating > index ? assets.starIconFilled : assets.starIconOutlined
            }
            alt=""
            className="size-4.5"
          />
        ))}
    </>
  );
}
