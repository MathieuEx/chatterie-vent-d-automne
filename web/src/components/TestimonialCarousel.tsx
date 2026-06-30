import TestimonialCard from "@/components/TestimonialCard";
import type { Testimonial } from "@/lib/sanity/types";

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const track = [...testimonials, ...testimonials];

  return (
    <div className="testimonial-carousel">
      <div className="testimonial-carousel__track">
        {track.map((testimonial, i) => (
          <div
            className="testimonial-carousel__item"
            key={`${testimonial._id}-${i}`}
            aria-hidden={i >= testimonials.length}
          >
            <TestimonialCard testimonial={testimonial} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
