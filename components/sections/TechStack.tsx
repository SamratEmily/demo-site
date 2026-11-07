import { useLocale } from "next-intl";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { home } from "@/content/home";
import { techStack } from "@/content/tech-stack";

export function TechStack() {
  const locale = useLocale();

  return (
    <Section labelledBy="tech-title">
      <SectionHeading
        id="tech-title"
        title={home.technologies.title[locale]}
        intro={home.technologies.intro?.[locale]}
      />

      <dl className="mt-12 border-b">
        {techStack.map((group) => (
          <div
            key={group.area.en}
            className="grid gap-3 border-t py-5 sm:grid-cols-[14rem_1fr] sm:items-center sm:gap-8"
          >
            <dt className="font-semibold">{group.area[locale]}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2" lang="en">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border bg-background px-2.5 py-1 font-mono text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
