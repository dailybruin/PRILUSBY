# Directory Structure

## Top-Level Layout

```
prime-temp/
├── .git/                          # Git repository metadata
├── .github/                       # GitHub configuration (workflows, etc.)
├── .planning/                     # Planning and documentation directory
│   └── codebase/                  # Codebase architecture maps
├── .vscode/                       # VS Code editor settings and extensions
├── .yarn/                         # Yarn package manager cache
├── src/                           # Source code root
├── public/                        # Build output (generated during gatsby build)
├── node_modules/                  # Dependencies (installed via yarn)
├── .editorconfig                  # Editor configuration (formatting standards)
├── .gitignore                     # Git ignore patterns
├── .prettierrc                    # Prettier code formatting config
├── .travis.yml                    # Travis CI configuration
├── .yarnrc / .yarnrc.yml          # Yarn configuration
├── Dockerfile                     # Docker container specification
├── gatsby-config.js               # Gatsby site configuration
├── gatsby-node.js                 # Gatsby build-time hooks
├── nginx-boot.sh                  # Nginx boot script (production deployment)
├── package.json                   # NPM/Yarn dependencies and scripts
├── README.md                      # Project overview and setup instructions
├── documentation.md               # Feature-level documentation
├── renovate.json                  # Renovate dependency auto-update config
└── yarn.lock                      # Locked dependency versions
```

## Key Directories

### /src - Source Code Root
Contains all application code, components, pages, and assets.

#### /src/pages/
Static Gatsby pages and dynamic page templates. Files here become routes:
- `index.tsx` → Homepage at `/`
- `all.tsx` → Article archive at `/all`
- `about.tsx` → About page at `/about`
- `pastissues.tsx` → Past issues archive at `/pastissues`

**Pattern**: Each file exports a React component that receives a `data` prop from GraphQL queries.

#### /src/templates/
Dynamic page templates used for programmatically generated pages:
- `article.tsx` → Template for individual articles
  - Receives context: `{ slug, term }`
  - Queries single article by slug
  - Renders article content based on type-driven rendering
  
- `issue.tsx` → Template for issue landing pages
  - Receives context: `{ term, articles, coverphoto, title }`
  - Displays issue metadata and article list
  - Handles special issue variants (Issuu embeds)

**Pattern**: Templates use `graphql` tagged template literals to declare data dependencies.

#### /src/components/
Reusable React components organized by responsibility:

**Layout & Structural**:
- `CustomHeader.tsx` - Navigation and site header
- `Footer.tsx` - Site footer
- `FooterAuthorBio.tsx` - Author bio footer section
- `CustomHead.tsx` - Meta tag management (SEO, social sharing)

**Article Display**:
- `ArticleCard.tsx` - Compact article preview with image
- `ArticleGrid.tsx` - Container for arranging article cards
- `StyledCoverPhoto.tsx` - Article cover image with credits
- `TitleGallery.tsx` - Featured article gallery layout
- `CoverGallery.tsx` - Image carousel/gallery viewer

**Content Rendering**:
- `pullQuote.tsx` - Formatted pull quote block
- `pullImage.tsx` - Image with caption within article flow
- `GraphicNovel.tsx` - Sequential image/graphic display

**Layout Variants**:
- `ThreeArticleCardRow.tsx` - 3-column responsive grid
- `TwoArticleCardRow.tsx` - 2-column responsive grid

**Interactive/Special**:
- `MobilePopup.tsx` - Mobile-triggered overlay/popup
- `Magazine.tsx` - Issuu magazine viewer embed
- `QuarterlyStories.tsx` - Quarterly issue spotlight component

**Header Variants** (TripleHeader/):
- `TripleHeader.tsx` - Primary header with three sections
- `TripleHeaderAlternative.tsx` - Alternative layout variant
- `HeaderHighLight.tsx` - Emphasized text header component

**Styling**:
- `styles.css` - Global CSS for components

#### /src/utils/
Utility modules for site-wide configuration:
- `typography.js` - Typography system setup
  - Configures Google Fonts (Barlow, EB Garamond, Source Serif Pro)
  - Sets header and body font families
  - Integrates with gatsby-plugin-typography

#### /src/images/
Static image assets:
- `favicons/` - Favicon variants (PNG, SVG, ICO formats)
- `db-logo.png` - Daily Bruin logo for manifest

### /public/
Auto-generated directory (do not commit):
- Compiled static site output from `gatsby build`
- Contains HTML, CSS, JS bundles
- Deployed directly to web server/CDN

### /.github/
GitHub-specific configuration:
- Likely contains GitHub Actions workflows
- May include PR templates or issue templates

### /.planning/
Project planning and architecture documentation:
- `codebase/` - Generated codebase maps (ARCHITECTURE.md, STRUCTURE.md)

## Important Files

### Configuration Files

**gatsby-config.js** (58 lines)
- Site metadata (name, description, URL, image)
- Plugin configuration
- Analytics setup (Google Tag Manager with ID `G-1D4G812DSQ`)
- React Helmet, Emotion, Typography plugin configs
- Web app manifest settings

**gatsby-node.js** (283 lines)
- `sourceNodes`: Fetches from Kerckhoff API, creates GraphQL nodes
  - Creates `Issues` and `Issue` nodes from issue map
  - Creates `PrimeArticle` nodes for all articles
  - Handles case-sensitivity normalization (Coverimg → coverimg)
- `createPages`: Generates static pages
  - Creates issue landing pages
  - Creates article pages
  - Handles hardcoded special issues (registration, orientation, graduation)
- `onCreateWebpackConfig`: Configures webpack for build optimization

**package.json** (61 lines)
- Project metadata
- Build scripts:
  - `start`: `gatsby develop --open -p 1234`
  - `build`: `gatsby build`
  - `serve`: `gatsby serve`
  - `deploy`: Docker build and push
- Dependencies:
  - Core: gatsby@2.15.21, react@16.9.0, react-dom@16.9.0
  - Plugins: gatsby-plugin-gtag, gatsby-plugin-emotion, gatsby-plugin-typescript, etc.
  - Design: @dailybruin/lux@1.15.0 (Daily Bruin design system)
  - Media: react-images, react-photo-gallery, react-rectangle, react-id-swiper
  - Utilities: slugify, emotion, typography, normalize.css
- Note: Uses `NODE_OPTIONS=--openssl-legacy-provider` for Node.js compatibility

### Documentation Files

**README.md**
- Project overview
- Data flow diagram (ArchieML → Kerckhoff → GraphQL → HTML)
- Installation and usage instructions
- References to Kerckhoff and Lux dependencies

**documentation.md**
- Feature-level documentation
- Lists components and their roles
- High-level file descriptions

### Deployment Files

**Dockerfile**
- Container specification for production deployment

**nginx-boot.sh**
- Nginx initialization script for web server setup

**renovate.json**
- Automated dependency update configuration

## Naming Conventions

### File Naming

**Components**: PascalCase (.tsx)
- `ArticleCard.tsx` - Reusable component
- `CustomHeader.tsx` - Customized component variant
- `TitleGallery.tsx` - Feature component
- `pullImage.tsx` - Exception: lowercase for content-specific elements

**Pages**: lowercase (.tsx)
- `index.tsx` - Root page
- `about.tsx` - Feature page
- `all.tsx` - List/archive page

**Templates**: lowercase (.tsx)
- `article.tsx` - Dynamic template for articles
- `issue.tsx` - Dynamic template for issues

**Utilities**: lowercase (.js)
- `typography.js` - Configuration module

**Styles**: lowercase (.css)
- `styles.css` - Global styles

**Config**: kebab-case with meaningful prefixes
- `gatsby-config.js` - Gatsby configuration
- `gatsby-node.js` - Gatsby build hooks
- `.prettierrc` - Code formatter config
- `.editorconfig` - Editor standards

### Component Props Interface Naming

Convention: `{ComponentName}Props`
- `ArticleCardProps` - Props for ArticleCard component
- `HeadProps` - Props for CustomHead component

### GraphQL Node Types

Naming follows pattern: `{Domain}{Type}`
- `Issues` - Collection node
- `Issue` - Single issue node
- `PrimeArticle` - Article node

### Data Fields

From Kerckhoff API (ArchieML-derived):
- `headline` - Article title
- `author` - Author name
- `authorbio` - Author biography
- `authoremail` - Author contact email
- `authortwitter` - Author Twitter handle
- `coverimg` / `Coverimg` - Cover image URL
- `covercred` - Photo credit
- `coveralt` - Alt text for image
- `articleType` - Content type (article, graphic, etc.)
- `excerpt` - Article summary
- `content` - Array of content blocks with type and value
- `slug` - URL-friendly identifier
- `term` - Issue term/semester identifier

### CSS Class Names

Emotion CSS-in-JS pattern (inline styles via `css` template literal):
- No explicit class names in source (generated at runtime)
- Uses scoped styles to avoid conflicts

### Directory Organization

- **Logical grouping by function**: Components, pages, templates, utils
- **Nested folders for variants**: `TripleHeader/` contains related header components
- **Flat structure for utilities**: No nested util folders
- **Asset organization**: `images/favicons/` for favicon variants
