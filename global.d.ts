import type messages from "./messages/en.json";

// Gives next-intl type-safe message keys.
declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages;
  }
}
