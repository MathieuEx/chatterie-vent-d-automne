import type { Testimonial } from "@/lib/sanity/types";

const SOURCE_LABEL: Record<Testimonial["source"], string> = {
  google: "Avis Google",
  facebook: "Avis Facebook",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function TestimonialCard({
  testimonial,
  index = 0,
}: {
  testimonial: Testimonial;
  index?: number;
}) {
  const avatarVariant = (index % 6) + 1;
  const dateLabel = testimonial.date
    ? new Date(testimonial.date).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
    : null;

  return (
    <article className="testimonial-card">
      <p className="testimonial__stars">
        {"★".repeat(testimonial.rating)}
        {"☆".repeat(5 - testimonial.rating)}
      </p>
      <p className="quote-text">&laquo; {testimonial.text} &raquo;</p>
      <div className="testimonial__author">
        <span className={`testimonial__avatar avatar--${avatarVariant}`}>
          {getInitials(testimonial.authorName)}
        </span>
        <div>
          <p className="testimonial__name">{testimonial.authorName}</p>
          <p className="testimonial__city">
            {SOURCE_LABEL[testimonial.source]}
            {dateLabel ? ` · ${dateLabel}` : ""}
          </p>
        </div>
      </div>
    </article>
  );
}
