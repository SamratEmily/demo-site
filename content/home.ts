import type { HomeContent } from "@/lib/types";

/** Marketing copy for the Home page. Button and link labels live in messages/*.json. */
export const home: HomeContent = {
  hero: {
    title: "We build the software your business runs on.",
    intro:
      "Beacon Soft builds custom web applications, APIs, online stores and WordPress sites for businesses in Bangladesh and abroad, and keeps them running after launch.",
    caption: "Gari Becho, our vehicle shop management software",
  },
  services: {
    title: "What we do",
    intro: "From a first version of a new product to keeping an existing system healthy.",
  },
  spotlight: {
    title: "Built by us, used every day",
    languagesNote: "Works in English and Bangla, on phone and computer.",
  },
  products: {
    title: "Our products",
    intro: "Ready-made software we build and maintain, for businesses with common needs.",
  },
  process: {
    title: "How we work",
    intro: "Six steps, with your approval before each big decision.",
  },
  aiDevelopment: {
    title: "AI-driven development",
    intro:
      "A smarter way to build and improve your products: we use AI at every stage, from first idea to launch, so you get working software sooner without cutting corners.",
    points: [
      {
        icon: "app-window",
        title: "Working versions sooner",
        description:
          "AI helps us turn your requirements into screens and code quickly, so you can try a working version early and tell us what to change.",
      },
      {
        icon: "shield-check",
        title: "Checked by our engineers",
        description:
          "Every line of code AI suggests is read, tested and approved by our engineers before it goes into your product.",
      },
      {
        icon: "file-check",
        title: "More testing, fewer bugs",
        description:
          "We use AI to write and run more tests and to catch problems early, so fewer bugs reach the people using your software.",
      },
    ],
  },
  team: {
    title: "Meet the team",
    intro: "The people who plan, build and support your software.",
  },
  testimonials: {
    title: "What our clients say",
  },
  cta: {
    title: "Tell us what you need to build",
    intro:
      "Share a short description of your project. We'll reply with questions, a rough plan and a quote.",
  },
};
