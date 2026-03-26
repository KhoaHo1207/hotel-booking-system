import { assets } from "../assets/assets";
import type { ExclusiveOffer } from "../types";

interface Props {
  offer: ExclusiveOffer;
}

export default function ExclusiveOfferCard({ offer }: Props) {
  return (
    <div
      className="group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center "
      style={{ backgroundImage: `url(${offer.image})` }}
    >
      <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
        {offer.priceOff}% OFF
      </p>
      <div>
        <p className="text-2xl font-medium font-playfair">{offer.title}</p>
        <p>{offer.description}</p>
        <p className="text-xs text-white/70 mt-3">
          Expires on: {offer.expiryDate}
        </p>
      </div>
      <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
        View Offers{" "}
        <img
          src={assets.arrowIcon}
          alt=""
          className="invert group-hover:translate-x-1 transition-all"
        />
      </button>
    </div>
  );
}
