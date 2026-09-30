/**
 * Where this site is actually published.
 *
 * The archive is served at dailybruin.com/prime/* by a Cloudflare Worker that
 * reverse-proxies the S3 bucket. prime.dailybruin.com redirects here and is
 * kept only for that redirect.
 *
 * Every canonical, og:url and twitter:url is built from this. It has to be an
 * absolute URL, and it has to be the address readers and crawlers actually
 * land on -- a canonical pointing anywhere else tells Google to index that
 * other address instead of this one.
 *
 * Do not try to fix this at the edge. The Worker can rewrite the canonical in
 * the HTML it serves, but react-helmet re-applies the value below once the
 * page hydrates and the rewrite is lost -- the rendered DOM is what Google
 * records. Whatever is here is the canonical, so change it here.
 *
 * No trailing slash: the paths below supply their own, matching the internal
 * links Gatsby generates (`/prime/all`, not `/prime/all/`). The one exception
 * is the home page, which is linked as `/prime/` and so keeps the slash.
 */
export const SITE_URL = 'https://dailybruin.com/prime'
