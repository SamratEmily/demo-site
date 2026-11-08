/**
 * GET /api/auth — step 1 of the Decap CMS GitHub login (see lib/cms-oauth.ts).
 * Opened by /admin in a popup. Sends the popup to GitHub's consent screen.
 */
import {
  callbackUrl,
  randomToken,
  setStateCookie,
  siteOrigin,
  type PagesContext,
} from "../../lib/cms-oauth";

/** "repo" is needed for private repositories and for editorial-workflow pull requests. */
const allowedScopes = new Set(["repo", "public_repo"]);

export function onRequestGet({ request, env }: PagesContext): Response {
  const url = new URL(request.url);

  // The state cookie only works on the domain GitHub returns to.
  if (url.origin !== siteOrigin) {
    return Response.redirect(`${siteOrigin}/api/auth${url.search}`, 302);
  }

  if (!env.GITHUB_CLIENT_ID) {
    console.error("cms auth: GITHUB_CLIENT_ID is not set");
    return new Response("The content manager login isn't set up yet.", {
      status: 500,
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
    });
  }

  const provider = url.searchParams.get("provider") ?? "github";
  if (provider !== "github") {
    return new Response("Unknown login provider.", {
      status: 400,
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
    });
  }

  const requestedScope = url.searchParams.get("scope") ?? "repo";
  const scope = allowedScopes.has(requestedScope) ? requestedScope : "repo";
  const state = randomToken();

  const github = new URL("https://github.com/login/oauth/authorize");
  github.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  github.searchParams.set("redirect_uri", callbackUrl);
  github.searchParams.set("scope", scope);
  github.searchParams.set("state", state);
  github.searchParams.set("allow_signup", "false");

  return new Response(null, {
    status: 302,
    headers: {
      location: github.toString(),
      "set-cookie": setStateCookie(state),
      "cache-control": "no-store",
      "referrer-policy": "no-referrer",
    },
  });
}
