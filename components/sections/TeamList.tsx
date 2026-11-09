import { useTranslations } from "next-intl";
import Image from "next/image";
import { BrandIcon } from "@/components/shared/BrandIcon";
import type { TeamMember } from "@/lib/types";

interface TeamListProps {
  members: TeamMember[];
}

/** "Tuhin Ahmed" → "TA": shown in place of a missing photo. */
function initials(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

/**
 * Team members with a photo (or their initials when there is none) and an
 * optional LinkedIn link. Caller hides it when empty.
 */
export function TeamList({ members }: TeamListProps) {
  const t = useTranslations("about");

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
      {members.map((member) => {
        const name = member.name;
        return (
          <li key={member.name}>
            {member.photo ? (
              <Image
                src={member.photo}
                width={320}
                height={320}
                alt=""
                loading="lazy"
                className="aspect-square w-full rounded-lg bg-surface-muted object-cover"
              />
            ) : (
              <div
                aria-hidden
                className="flex aspect-square w-full items-center justify-center rounded-lg bg-primary/10 text-h2 font-semibold text-primary"
              >
                {initials(member.name)}
              </div>
            )}
            <p className="mt-4 font-semibold">{name}</p>
            <p className="text-muted-foreground">{member.role}</p>
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
