import { getRequestConfig } from "next-intl/server";
import messages from "../messages/en.json";

/** The site is English only; next-intl just supplies the UI labels in messages/en.json. */
export default getRequestConfig(async () => ({ locale: "en", messages }));
