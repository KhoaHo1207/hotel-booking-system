import { assets, exclusiveOffers } from "../assets/assets";
import ExclusiveOfferCard from "./ExclusiveOfferCard";
import Title from "./Title";

export default function ExclusiveOffers() {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full">
        <Title
          align="left"
          title="Exclusive Offers"
          subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
        />
        <button className="group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12">
          View All Offers{" "}
          <img
            src={assets.arrowIcon}
            alt=""
            className="group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {exclusiveOffers.map((offer, index) => (
          <ExclusiveOfferCard offer={offer} key={index} />
        ))}
      </div>
    </div>
  );
}
