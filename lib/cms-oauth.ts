// Relative imports only: functions/api/auth.ts and callback.ts bundle this
// file with Wrangler, which doesn't know the "@/" path alias.
import { site } from "../content/site";

/**
 * GitHub login for Decap CMS (/admin), shared by the two Pages Functions:
 *
 * 1. /api/auth sends the login popup to GitHub with a random `state`, also
 *    kept in a short-lived, HttpOnly cookie (protects against login CSRF).
 * 2. GitHub sends the popup back to /api/callback with a one-time `code`.
 *    The function checks `state`, swaps the code for an access token, and
 *    returns a small page that hands the token to the CMS window with
 *    postMessage, to our own site origin only.
 *
 * Secrets: GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET, Cloudflare
 * environment variables only. The token is never logged or stored.
 */
export interface OAuthEnv {
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
}

export interface PagesContext {
  request: Request;
  env: OAuthEnv;
}

/** The only origin allowed to receive the token: site.url in content/site.ts. */
export const siteOrigin = new URL(site.url).origin;
export const callbackUrl = `${siteOrigin}/api/callback`;

/** `__Host-` cookies must be Secure, Path=/ and without Domain, so no other site can set them. */
export const stateCookie = "__Host-decap-oauth-state";
const stateMaxAgeSeconds = 600;

export function randomToken(bytes = 32): string {
  const values = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...values))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function setStateCookie(state: string): string {
  return `${stateCookie}=${state}; Path=/; Max-Age=${stateMaxAgeSeconds}; Secure; HttpOnly; SameSite=Lax`;
}

export const clearStateCookie = `${stateCookie}=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=Lax`;

export function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return value.join("=");
  }
  return undefined;
}

/** Compares without stopping at the first difference. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length || a.length === 0) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** JSON that is safe inside an inline <script>. */
function scriptJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export type OAuthResult =
  { status: "success"; token: string } | { status: "error"; message: string };

/**
 * The page /api/callback returns inside the login popup. It follows Decap's
 * handshake: announce "authorizing:github" to the CMS window, wait for the
 * CMS to answer from our own origin, then send the result to that origin.
 */
export function popupResponse(result: OAuthResult, status = 200): Response {
  const nonce = randomToken(16);
  const content =
    result.status === "success"
      ? { token: result.token, provider: "github" }
      : { message: result.message, provider: "github" };
  const visibleText =
    result.status === "success"
      ? "Logged in. You can close this window if it stays open."
      : result.message;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<title>Logging in…</title>
</head>
<body>
<p id="status">${visibleText.replace(/[<>&"]/g, "")}</p>
<script nonce="${nonce}">
(function () {
  var origin = ${scriptJson(siteOrigin)};
  var message = ${scriptJson(`authorization:github:${result.status}:`)} + JSON.stringify(${scriptJson(content)});
  if (!window.opener) {
    document.getElementById("status").textContent = "Open the content manager at " + origin + "/admin/ and log in from there.";
    return;
  }
  window.addEventListener("message", function (event) {
    if (event.origin !== origin || event.source !== window.opener) return;
    window.opener.postMessage(message, origin);
  });
  window.opener.postMessage("authorizing:github", origin);
})();
</script>
</body>
</html>`;

  return new Response(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "referrer-policy": "no-referrer",
      "x-content-type-options": "nosniff",
      "content-security-policy": `default-src 'none'; script-src 'nonce-${nonce}'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`,
      "set-cookie": clearStateCookie,
    },
  });
}
