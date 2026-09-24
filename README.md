# PRIME

PRIME is the Daily Bruin's quarterly arts, culture and lifestyle magazine. This
repository builds **PRIME's archive** — every issue from spring 2018 through
spring 2026, 235 stories.

## Where it lives

The archive is at **[dailybruin.com/prime](https://dailybruin.com/prime)**.

It used to live at `prime.dailybruin.com`. That address still works, but it now
forwards to dailybruin.com — there is no separate PRIME site any more. Moving it
onto the main site means PRIME's stories benefit from dailybruin.com's
reputation in Google instead of competing with it.

## The archive is closed

**New PRIME stories are published in WordPress**, like any other Daily Bruin
article, with the PRIME category. They show up on
[dailybruin.com/category/prime](https://dailybruin.com/category/prime) on their
own.

Nothing new is added to this repository. You only need it if you have to change
something in a story published before the 2026–27 school year.

## Changing an old story

The words and images do not live in this repository — they live in Google Docs,
written in [ArchieML](http://archieml.org/), which
[Kerckhoff](https://github.com/dailybruin/kerckhoff) turns into data this site
reads:

```
Google Doc (ArchieML) → Kerckhoff → this site → HTML
```

So edit the Google Doc first. Then rebuild and re-upload, following the steps
below.

## Running it locally

```
corepack enable
yarn
yarn start
```

Then open [localhost:1234](http://localhost:1234).

If the install or build fails, try Node 20 (`nvm use 20`). This is an older
Gatsby site and newer versions of Node can trip it up.

## Publishing changes

**1. Build it**

```
yarn build:prefix-paths
```

⚠️ Use this command, **not** `yarn build`. The archive is served from a folder
called `prime/`, and this is the command that tells the site so. Plain
`yarn build` produces a version that loads no styling or images and looks
completely broken.

**2. Upload it**

Upload **everything inside** the `public/` folder to the `prime/` folder of the
`prime.dailybruin.com` bucket in Amazon S3.

- Upload the *contents* of `public/`, not the `public` folder itself. You want
  `prime/index.html`, not `prime/public/index.html`.
- Do **not** upload to the top level of the bucket. That holds the old site,
  which nothing uses any more.
- Ask Online's external sites editor if you do not have access.

**3. Make the files public**

Select the `prime/` folder → Actions → Make public using ACL.

New uploads are private by default, so if you skip this, every page shows
"Access Denied" instead of the story.

**4. Clear the cache**

In Cloudflare: Caching → Configuration → Purge Cache → Custom Purge, and purge
the pages you changed. Otherwise readers keep seeing the old version for up to
an hour.

**5. Check it worked**

Open the story on dailybruin.com/prime and confirm your change is there.

## A note on the code

Until 2026 this site sent search engines almost nothing — about 16 words per
story, because the text was added by the reader's browser after the page
arrived, and search engines mostly don't wait for that. PRIME's journalism was
effectively invisible in Google for seven years.

It was caused by a workaround added in 2019 to get the site deploying: it
switched off the step that writes the story into the page, and every page had to
be told to skip rendering as a result. The site looked perfect to anyone using a
browser, which is why nobody noticed.

That is fixed. Each page now contains its full story text before any JavaScript
runs. If you are changing how pages are built, be careful not to reintroduce it:
after a change, open a story, use **View Source** (not Inspect — Inspect shows
the page after JavaScript runs and hides the problem), and check the story's
text is actually there.

One story carries a `noindex` tag at its author's request, in
`src/templates/article.tsx`. Please keep it.
