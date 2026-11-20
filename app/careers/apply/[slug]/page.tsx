import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobApplicationForm } from "@/components/sections/JobApplicationForm";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/shared/Container";
import { openings } from "@/lib/careers";
import { careersEmail } from "@/lib/settings";

export const dynamicParams = false;

export function generateStaticParams() {
  return openings.length > 0 ? openings.map(({ slug }) => ({ slug })) : [{ slug: "closed" }];
}

async function getOpening(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  if (openings.length === 0 && slug === "closed") return null;
  const opening = openings.find((item) => item.slug === slug);
  if (!opening) notFound();
  return opening;
}

export async function generateMetadata({
  params,
}: PageProps<"/careers/apply/[slug]">): Promise<Metadata> {
  const opening = await getOpening(params);
  return {
    title: opening ? `Apply for ${opening.title}` : "Applications closed",
    robots: { index: false, follow: true },
  };
}

export default async function ApplicationPage({ params }: PageProps<"/careers/apply/[slug]">) {
  const opening = await getOpening(params);

  if (!opening) {
    return (
      <PageHeader id="application-title" title="Applications closed">
        <Link
          href="/careers/"
          className="mt-6 inline-block text-primary underline underline-offset-4"
        >
          Back to Careers
        </Link>
      </PageHeader>
    );
  }

  return (
    <>
      <PageHeader id="application-title" title={`Apply for ${opening.title}`}>
        <Link
          href={`/careers/#${opening.slug}`}
          className="mt-6 inline-block text-primary underline underline-offset-4"
        >
          Back to the job listing
        </Link>
      </PageHeader>
      <Container className="pb-16 lg:pb-24">
        <JobApplicationForm position={opening.title} email={careersEmail} />
      </Container>
    </>
  );
}
