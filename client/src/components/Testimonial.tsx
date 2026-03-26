import { testimonials } from "../assets/assets";
import type { Testimonial } from "../types";
import StarRating from "./StarRating";
import Title from "./Title";

export default function Testimonial() {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
      <Title
        title="What Our Guests Say"
        subTitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world."
        align="center"
      />

      <div className="flex flex-wrap items-center justify-center gap-6 pt-14 mt-14">
        {testimonials.map((testimonial: Testimonial, index: number) => (
          <div
            key={index}
            className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5"
          >
            <div className="flex flex-col items-center px-5 py-4 relative">
              <img
                className="h-24 w-24 absolute -top-14 rounded-full"
                src={
                  testimonial.image ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                }
                alt={testimonial.name}
              />
              <div className="pt-8 text-center">
                <h1 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-gray-800/80">{testimonial.address}</p>
              </div>
            </div>
            <p className="text-gray-500 px-6 text-center">
              {testimonial.review}
            </p>
            <div className="flex justify-center pt-4">
              <div className="flex gap-0.5">
                <StarRating rating={testimonial.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
