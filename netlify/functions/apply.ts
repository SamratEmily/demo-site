import { submitApplication } from "../../lib/submit-application";

export const config = { path: "/api/apply", method: "POST" };

export default function apply(request: Request) {
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CAREERS_TO_EMAIL } = process.env;
  return submitApplication(request, { RESEND_API_KEY, CONTACT_FROM_EMAIL, CAREERS_TO_EMAIL });
}
