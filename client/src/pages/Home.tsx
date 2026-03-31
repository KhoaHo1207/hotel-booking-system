import ExclusiveOffers from "../components/ExclusiveOffers";
import FeaturedDestination from "../components/FeaturedDestination";
import Hero from "../components/Hero";
import RecommendHotel from "../components/RecommendHotel";
import NewsLetter from "../components/NewsLetter";
import Testimonial from "../components/Testimonial";

export default function Home() {
  return (
    <div>
      <Hero />
      <RecommendHotel />
      <FeaturedDestination />
      <ExclusiveOffers />
      <Testimonial />
      <NewsLetter />
    </div>
  );
}
