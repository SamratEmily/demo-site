import { submitApplication, type ApplicationEnv } from "../../lib/submit-application";

export function onRequestPost({ request, env }: { request: Request; env: ApplicationEnv }) {
  return submitApplication(request, env);
}
