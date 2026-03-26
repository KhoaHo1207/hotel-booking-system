import ExclusiveOffers from "../components/ExclusiveOffers";
import FeaturedDestination from "../components/FeaturedDestination";
import Hero from "../components/Hero";
import Testimonial from "../components/Testimonial";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedDestination />
      <ExclusiveOffers />
      <Testimonial />
    </div>
  );
}
