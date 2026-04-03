# Architecture

## Pattern

**JAMstack with Static Site Generation (SSG)**

PRIME is a modern JAMstack publication platform built on **Gatsby**, a React-based static site generator. The architecture prioritizes:
- Pre-rendered static HTML pages for fast performance and SEO
- Client-side React interactivity for enhanced user experience
- External API integration for dynamic content management
- Server-side rendering during build time, client-side hydration at runtime

## Layers & Components

### 1. **Data Layer (External APIs)**
- **Kerckhoff API**: Primary data source providing ArchieML-formatted content
  - `https://kerckhoff.dailybruin.com/api/packages/prime/`
  - Serves article metadata, issue information, and structured data
  - Converts Google Drive-based ArchieML documents to JSON
- **Google Analytics (gtag)**: Analytics instrumentation via Google Tag Manager (`G-1D4G812DSQ`)
- **External Media**: Images hosted on Daily Bruin CDN (`assets.dailybruin.com`)

### 2. **Build & Transformation Layer**
- **gatsby-node.js**: Custom Gatsby API hooks that:
  - Fetch and normalize article/issue data from Kerckhoff during build
  - Create GraphQL nodes from API responses
  - Generate static pages for each article and issue
  - Handle special edge cases (registration issues, orientation issues, graduation issues)
- **GraphQL Layer**: Gatsby's GraphQL API exposes normalized data to components:
  - `Issues` node: Collection of all publication issues
  - `Issue` node: Individual issue with linked articles
  - `PrimeArticle` node: Article content with metadata, author info, formatted content

### 3. **Presentation Layer (React Components)**

#### Pages (src/pages/)
- `index.tsx`: Magazine homepage with article grids and featured stories
- `all.tsx`: Comprehensive article listing/archive
- `about.tsx`: About page with director information (client-side fetched data)
- `pastissues.tsx`: Archive of previous magazine issues

#### Templates (src/templates/)
- `article.tsx`: Dynamic template rendered for each article
  - Server-side rendering for initial page load
  - Handles article content in AML format with type-based rendering
  - Supports multiple content types: text, images, videos, pull quotes, images
- `issue.tsx`: Dynamic template for issue landing pages
  - Lists all articles in an issue
  - Displays issue cover photo and metadata

#### Components (src/components/)
- **Layout Components**:
  - `CustomHeader.tsx`: Site header/navigation
  - `Footer.tsx`, `FooterAuthorBio.tsx`: Footer sections
  - `CustomHead.tsx`: Head tag management with meta tags, social sharing, favicons
  
- **Article Display**:
  - `ArticleCard.tsx`: Reusable article preview card with image and headline
  - `ArticleGrid.tsx`: Grid container for article cards
  - `TitleGallery.tsx`: Gallery view for featured articles
  - `CoverGallery.tsx`: Image gallery component
  - `StyledCoverPhoto.tsx`: Cover image rendering with credits
  
- **Content Components**:
  - `pullQuote.tsx`: Pull quote formatting
  - `pullImage.tsx`: Image with captions within article
  - `GraphicNovel.tsx`: Sequential graphic/image display
  - `MobilePopup.tsx`: Mobile-specific interactive overlays
  
- **Layout Variants**:
  - `ThreeArticleCardRow.tsx`: 3-column article card layout
  - `TwoArticleCardRow.tsx`: 2-column article card layout
  - `TripleHeader/` (folder): Specialized header components
    - `TripleHeader.tsx`: Featured article header variant
    - `TripleHeaderAlternative.tsx`: Alternative header layout
    - `HeaderHighLight.tsx`: Highlighted header section
  
- **Special Components**:
  - `Magazine.tsx`: Full magazine/issue viewer (Issuu embedding)
  - `QuarterlyStories.tsx`: Quarterly issue spotlight
  
- **Styling**:
  - `styles.css`: Global component styles
  - Emotion CSS-in-JS for scoped component styling

### 4. **Configuration Layer**
- **gatsby-config.js**: Gatsby site metadata, plugins, and analytics setup
  - Google Tag Manager integration
  - React Helmet for SEO management
  - Typography plugin with Google Fonts
  - Emotion CSS-in-JS support
  - Web manifest for PWA
  
- **gatsby-plugin-gtag**: Google Analytics tracking
- **gatsby-plugin-emotion**: CSS-in-JS styling support
- **gatsby-plugin-typography**: Typography system configuration

### 5. **Utilities Layer** (src/utils/)
- `typography.js`: Typography system setup with Google Fonts (Barlow, EB Garamond, Source Serif Pro)

## Data Flow

```
Kerckhoff API (ArchieML)
        ↓
gatsby-node.js sourceNodes hook
        ↓
GraphQL Node creation (Issues, Issue, PrimeArticle)
        ↓
gatsby createPages hook
        ↓
Dynamic page generation for:
  - /[issueterm] (issue landing pages)
  - /[article-slug] (individual articles)
  - /about (fetches from API at runtime)
        ↓
React Components render with GraphQL data
        ↓
Static HTML + React hydration at runtime
        ↓
Browser displays fully interactive site
```

### Data Normalization Flow:
1. **Raw Data**: ArchieML from Google Docs
2. **API Transform**: Kerckhoff API converts to JSON
3. **Gatsby Build**: gatsby-node normalizes and creates GraphQL schema
4. **Component Level**: React components query GraphQL and render
5. **Styling**: Emotion applies scoped CSS during render

## Entry Points

### Build-Time Entry Points:
1. **gatsby-node.js `sourceNodes`**: Fetches and normalizes all data into GraphQL
2. **gatsby-node.js `createPages`**: Generates static pages for each article/issue

### Runtime Entry Points:
1. **src/pages/index.tsx**: Homepage with featured and all articles
2. **src/templates/article.tsx**: Individual article pages (dynamic)
3. **src/templates/issue.tsx**: Issue landing pages (dynamic)
4. **src/pages/about.tsx**: About page (client-side data fetching)
5. **src/pages/all.tsx**: Article archive
6. **src/pages/pastissues.tsx**: Issue archive

### Client-Side:
- React hydration on `index.tsx` and all page templates
- Event handlers on components (ArticleCard navigation, MobilePopup toggles)

## Key Abstractions

### 1. **Custom Link Component** (ArticleCard)
Abstracts internal Gatsby links vs. external links:
- Articles and graphics use internal routes: `/{slug}`
- Other types use external links (custom URLs)

### 2. **CustomHead Meta Component**
Centralized SEO and social sharing:
- Manages all meta tags (og:, twitter:, canonical)
- Handles favicons and theme colors
- Single source of truth for page head configuration

### 3. **Data Normalization in gatsby-node.js**
Handles API quirks:
- Lowercase normalization of "Coverimg" field (case-sensitivity fix)
- Content array transformation (stringify non-string values)
- Special issue handling (registration, orientation, graduation)

### 4. **Template Rendering Pattern**
Separates server-side (SSR) and client-side rendering:
- `if (typeof document === 'undefined')` check for SSR safety
- Components gracefully handle build-time vs. runtime environments

### 5. **Component Composition**
- Layout components (header, footer) wrap page content
- Content components are independently styling-agnostic
- Row layout components (TwoArticleCardRow, ThreeArticleCardRow) handle responsive grids

### 6. **GraphQL Query Abstraction**
- Each template/page declares data requirements as GraphQL queries
- Gatsby handles passing queried data as props during rendering
- Supports static queries and dynamic page context queries

### 7. **TripleHeader Variant System**
Multiple header presentation options for design flexibility:
- Standard TripleHeader for issue covers
- TripleHeaderAlternative for layout variation
- HeaderHighLight for emphasized text blocks

### 8. **Content Type Router** (article.tsx)
Routes rendered components based on content.type:
- Maps content type strings to React components
- Supports: text, images, videos, pull quotes, graphics
- Extensible pattern for new content types
