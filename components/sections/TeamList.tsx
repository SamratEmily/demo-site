import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { BrandIcon } from "@/components/shared/BrandIcon";
import type { TeamMember } from "@/lib/types";

interface TeamListProps {
  members: TeamMember[];
}

/** Team members with an optional photo and LinkedIn link. Caller hides it when empty. */
export function TeamList({ members }: TeamListProps) {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member) => {
        const name = member.name[locale];
        return (
          <li key={member.name.en}>
            {member.photo ? (
              <Image
                src={member.photo}
                width={320}
                height={320}
                alt=""
                loading="lazy"
                className="aspect-square w-full rounded-lg bg-surface-muted object-cover"
              />
            ) : null}
            <p className="mt-4 font-semibold">{name}</p>
            <p className="text-muted-foreground">{member.role[locale]}</p>
            {member.linkedin ? (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("linkedin", { name })}
                className="mt-2 inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
              >
                <BrandIcon name="linkedin" className="size-5" />
              </a>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
