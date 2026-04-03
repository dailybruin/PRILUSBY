# PRIME — Kerckhoff to Oink Migration

## What This Is

PRIME is the Daily Bruin's long-form publication website, built as a Gatsby JAMstack site. During build time, it fetches article and issue data from an internal CMS API and generates static pages. This project migrates the data source from the old CMS (Kerckhoff) to the new CMS (Oink) for articles published from spring26 onwards, while keeping all prior articles on Kerckhoff.

## Core Value

PRIME articles are fetched and rendered correctly regardless of which CMS they originate from.

## Requirements

### Validated

- ✓ Articles and issues fetched from Kerckhoff during Gatsby build — existing
- ✓ Static pages generated per article and per issue — existing
- ✓ Main package (prime.map.articles.to.issues) drives article discovery — existing
- ✓ Individual article packages fetched by slug — existing

### Active

- [ ] Articles from spring26 onward are fetched from Oink instead of Kerckhoff
- [ ] Articles prior to spring26 continue to be fetched from Kerckhoff
- [ ] Oink fetch logic mirrors Kerckhoff fetch logic (same structure, same process)
- [ ] The main map package (prime.map.articles.to.issues) is used from Oink for new issues
- [ ] Build succeeds with both APIs supplying data simultaneously

### Out of Scope

- Redesigning the data model or GraphQL schema — Oink mirrors Kerckhoff structure
- Migrating old articles to Oink — old packages stay on Kerckhoff permanently
- Any UI/frontend changes — data layer only

## Context

- `gatsby-node.js` is where all Kerckhoff API calls live (lines ~13, 48, 97)
- Kerckhoff base URL: `https://kerckhoff.dailybruin.com/api/packages/prime/`
- Oink is expected to mirror Kerckhoff's URL structure and auth patterns
- Term ordering for cutoff: terms prior to spring26 → Kerckhoff; spring26 and later → Oink
- Term format in data: `{season}{YY}` e.g. `fall25`, `winter26`, `spring26`

## Constraints

- **Tech stack**: Gatsby + Node.js — changes confined to `gatsby-node.js`
- **Compatibility**: Must not break existing Kerckhoff-sourced articles
- **Oink API**: Assumed to mirror Kerckhoff — no known structural differences

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Filter by term string (e.g. spring26) not timestamp | Terms are the canonical identifier in the data model | — Pending |
| Oink handles spring26+ only | Old packages not transferrable to Oink per team decision | — Pending |

---
*Last updated: 2026-04-02 after initialization*
