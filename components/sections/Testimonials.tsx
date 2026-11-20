import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { home } from "@/content/home";
import { testimonials } from "@/lib/testimonials";

/**
 * Review layouts for when approved customer feedback is available:
 * Home: [short quote + customer attribution] [short quote + customer attribution]
 * Product: [workflow screenshot] [quote about that workflow + attribution]
 * Case study: [before and after] [customer quote beside the documented outcome]
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section labelledBy="testimonials-title" tone="muted">
      <SectionHeading id="testimonials-title" title={home.testimonials.title} />
      <ul className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {testimonials.map((item) => (
          <li key={`${item.name}-${item.company}`}>
            <figure className="border-l-2 border-primary pl-6">
              <blockquote className="text-lead">
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{item.name}</span>
                <span className="text-muted-foreground">
                  , {item.role}, {item.company}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
