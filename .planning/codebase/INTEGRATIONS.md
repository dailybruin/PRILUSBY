# Integrations

## External APIs
- **Kerckhoff API**: Content management system API
  - Base URL: `https://kerckhoff.dailybruin.com/api/`
  - Endpoints used:
    - `/packages/prime/prime.map.articles.to.issues/` - Fetches issue and article mapping
    - `/packages/prime?all=True` - Fetches all prime articles and content
    - `/packages/prime/prime.about` - Fetches about page content
  - Data format: JSON with ArchieML-sourced content
  - Used for: Dynamic content sourcing at build time (gatsby-node.js)

- **Google Fonts API**: Web font delivery
  - Endpoint: `https://fonts.googleapis.com/css?family=Barlow`
  - Fonts loaded: Barlow (400, 500, 600, 800, 900), EB Garamond (400), Source Serif Pro (400)
  - Used for: Typography and heading styling

## Databases
- **Google Drive** (indirect via Kerckhoff): Source of truth for article content
  - Content stored in ArchieML format within Google Docs
  - Reference: https://docs.google.com/document/d/1CBXuDRDNLyZZVe51Z0F_0eEgwupJWF9J0NQ0CK7jlNQ/edit?usp=sharing
  - Data pipeline: Google Docs → Kerckhoff CMS → API → Gatsby → HTML

## Analytics & Monitoring
- **Google Analytics 4 (GA4)**: Analytics tracking via gtag
  - Tracking ID: G-1D4G812DSQ
  - Plugin: gatsby-plugin-gtag
  - Configuration: Head script enabled, anonymization enabled
  - Note: Legacy Google Analytics (UA-28181852-23) is commented out and disabled

## Content Delivery & Asset Hosting
- **AWS S3**: Static asset hosting
  - Assets domain: `https://assets.dailybruin.com/`
  - Assets domain 3: `https://assets3.dailybruin.com/`
  - Purpose: Hosting article cover images, featured images, and other static assets
  - Deployment: Generated public/ folder is uploaded to S3 bucket after build

## Auth Providers
- None currently configured

## Other Services
- **Daily Bruin Internal Design System (Lux)**
  - Package: @dailybruin/lux (v1.15.0)
  - Purpose: Reusable React components (Article, Video, etc.) for consistent UI
  - GitHub: https://github.com/dailybruin/lux

- **Daily Bruin Kerckhoff CMS**
  - Package: @dailybruin/gatsby-source-kerckhoff (v1.1.1)
  - Purpose: Source plugin for Gatsby to fetch content from Kerckhoff
  - GitHub: https://github.com/dailybruin/kerckhoff

- **Travis CI**: Continuous Integration
  - Configuration: .travis.yml
  - Triggers: On push, builds project with `yarn build`
  - Node versions tested: current and LTS

- **Renovate**: Dependency management automation
  - Configuration: renovate.json
  - Strategy: Base config, group non-major updates, weekly schedule
  - Purpose: Automated PR creation for dependency updates

- **Docker Registry (Docker Hub)**
  - Repository: dailybruin/prilusby:latest
  - Purpose: Container image distribution for deployment
  - Deployment command: `yarn deploy` (builds and pushes Docker image)

- **Font Awesome Icons**: Icon library
  - Packages: @fortawesome/fontawesome-svg-core (v1.2.20), @fortawesome/react-fontawesome (v0.1.4)
  - Purpose: SVG-based icon components

- **Swiper**: Mobile-friendly carousel/slider
  - Package: react-id-swiper (v1.6.9)
  - Purpose: Image galleries and content sliders

## Third-Party Libraries/Services
- **react-photo-gallery** (v6.3.4): Photo gallery component
- **react-images** (v0.5.19): Image viewing/zoom component
- **react-social-icons** (v4.1.0): Social media sharing icons
- **react-rectangle** (v1.3.3): Geometric drawing component

## Data Flow
```
Google Drive (ArchieML) → Kerckhoff CMS → Kerckhoff API → 
Gatsby (gatsby-node.js sourceNodes) → GraphQL → 
React Components → S3 (static files) → Nginx (production serving)
```
