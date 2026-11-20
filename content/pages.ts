interface PageCopy {
  title: string;
  intro: string;
  /** Used for <meta name="description"> and social previews. */
  metaDescription: string;
}

export const productsPage: PageCopy & {
  availableTitle: string;
} = {
  title: "Our products",
  intro:
    "Explore our software products. We offer demos, setup, customization, and ongoing support for each product.",
  metaDescription:
    "Explore Beacon Soft’s products and services for vehicle shops, real estate developers, university admission preparation, IELTS preparation, and laundry point of sale.",
  availableTitle: "Available products",
};

export const servicesPage: PageCopy & {
  includedTitle: string;
  technologiesTitle: string;
  ctaTitle: string;
  ctaBody: string;
} = {
  title: "Services",
  intro:
    "We design, build and look after web software for businesses. Here is what each service covers, so you know what to expect before we talk.",
  metaDescription:
    "Custom web applications, APIs and integrations, e-commerce, WordPress, maintenance and hosting setup by Beacon Soft Ltd. in Bangladesh.",
  includedTitle: "What's included",
  technologiesTitle: "Typical technologies",
  ctaTitle: "Not sure which service you need?",
  ctaBody:
    "Tell us what you want to get done. We'll suggest an approach and send you a written estimate.",
};

export const caseStudiesPage: PageCopy & { emptyNote: string } = {
  title: "Case studies",
  intro:
    "See how our software handles everyday business workflows, from keeping track of stock to following up on payments.",
  metaDescription: "Explore software case studies and product walkthroughs from Beacon Soft Ltd.",
  emptyNote: "We are writing up our first case studies. In the meantime, ask us for references.",
};

export const aboutPage: PageCopy & {
  storyTitle: string;
  story: string[];
  missionTitle: string;
  mission: string;
  valuesTitle: string;
  teamTitle: string;
  teamIntro: string;
  companyTitle: string;
  ctaTitle: string;
  ctaBody: string;
} = {
  title: "About Beacon Soft",
  intro:
    "We are a software company in Bangladesh. We build our own products and custom software for businesses, and we keep supporting it after launch.",
  metaDescription:
    "About Beacon Soft Ltd.: our story, mission, the values we work by and company details.",
  storyTitle: "Our story",
  // [TODO: add the founding year and how the company started]
  story: [
    "Many businesses in Bangladesh still run on notebooks, spreadsheets and phone calls. We started Beacon Soft to build software that fits how these businesses actually work, in the language their staff use every day.",
    "Our first live product, Gari Becho, replaced the paper records of vehicle shops with one system for stock, sales, installments and investors, in Bangla and English. We also offer Real Estate CRM, Onushilon360 for university admission preparation, IELTS Platform, and Laundry POS System, alongside custom projects for clients.",
  ],
  missionTitle: "Our mission",
  mission:
    "To build reliable, easy-to-use software that helps businesses keep accurate records, save time and make decisions with clear numbers.",
  valuesTitle: "How we work",
  teamTitle: "Our team",
  teamIntro: "The people who design, build and support our software.",
  companyTitle: "Company details",
  ctaTitle: "Let's talk about your project",
  ctaBody: "Tell us what you need. We'll reply with questions or a plan, not a sales pitch.",
};

export const blogPage: PageCopy = {
  title: "Blog",
  intro:
    "Practical notes on planning, building and running business software, from the team that builds it.",
  metaDescription:
    "Articles from Beacon Soft Ltd. on planning, building and maintaining software for businesses in Bangladesh.",
};

export const careersPage: PageCopy & { valuesTitle: string; valuesIntro: string } = {
  title: "Careers",
  intro:
    "We build software for businesses in Bangladesh and abroad. If you care about clear code, careful testing and explaining things simply, we'd like to hear from you.",
  metaDescription:
    "Jobs at Beacon Soft Ltd.: open positions for developers and other roles, and how to apply.",
  valuesTitle: "How we work",
  valuesIntro: "The principles behind every project, and what we expect from everyone on the team.",
};

export const contactPage: PageCopy = {
  title: "Contact us",
  intro:
    "Tell us what you need: a new project, help with existing software, or a demo of one of our products. We'll reply by email with questions or a next step.",
  metaDescription:
    "Contact Beacon Soft Ltd. about a software project, support for existing software, or a product demo.",
};
