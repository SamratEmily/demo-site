/**
 * GET /api/callback — step 2 of the Decap CMS GitHub login (see lib/cms-oauth.ts).
 * GitHub returns the popup here. Checks `state`, swaps the one-time code for
 * an access token and hands it to the CMS window on our own origin only.
 * Errors shown to the user are generic; details go to the function log.
 */
import {
  callbackUrl,
  popupResponse,
  readCookie,
  safeEqual,
  stateCookie,
  type PagesContext,
} from "../../lib/cms-oauth";

const fetchTimeoutMs = 10_000;
const genericError = "GitHub login didn't work. Close this window and try again.";

async function exchangeCode(code: string, clientId: string, secret: string) {
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "user-agent": "beacon-soft-website-cms",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: secret,
      code,
      redirect_uri: callbackUrl,
    }),
    signal: AbortSignal.timeout(fetchTimeoutMs),
  });
  const body: unknown = await res.json().catch(() => null);
  if (typeof body !== "object" || body === null) return { error: `http_${res.status}` };
  if ("access_token" in body && typeof body.access_token === "string" && body.access_token) {
    return { token: body.access_token };
  }
  return { error: "error" in body && typeof body.error === "string" ? body.error : "no_token" };
}

export async function onRequestGet({ request, env }: PagesContext): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state") ?? "";
  const expectedState = readCookie(request, stateCookie) ?? "";

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    console.error("cms callback: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is not set");
    return popupResponse({ status: "error", message: genericError }, 500);
  }

  const githubError = url.searchParams.get("error");
  if (githubError) {
    // E.g. access_denied when the user presses Cancel on GitHub.
    console.error(`cms callback: GitHub returned ${githubError}`);
    return popupResponse({ status: "error", message: genericError }, 400);
  }

  if (!code || code.length > 100 || !safeEqual(state, expectedState)) {
    console.error("cms callback: missing code, or state didn't match (expired or forged)");
    return popupResponse({ status: "error", message: genericError }, 400);
  }

  try {
    const result = await exchangeCode(code, env.GITHUB_CLIENT_ID, env.GITHUB_CLIENT_SECRET);
    if ("token" in result && result.token) {
      return popupResponse({ status: "success", token: result.token });
    }
    console.error(`cms callback: token exchange failed (${result.error})`);
  } catch (error) {
    console.error("cms callback: token exchange request failed", error);
  }
  return popupResponse({ status: "error", message: genericError }, 502);
}
