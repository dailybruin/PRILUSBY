# Conventions

## Code Style

### Formatting
- **Prettier Configuration**: No semicolons, single quotes, trailing commas (ES5)
- **IndentConfig**: Spaces for indentation, UTF-8 charset, LF line endings
- **File Extensions**: TypeScript (.tsx, .ts) for components, JavaScript (.js) for utilities
- **Framework**: React 16.9.0 with TypeScript 2.1.9

### Import Patterns
- Wildcard imports for React: `import * as React from 'react'`
- Named imports for utilities: `import { graphql } from 'gatsby'`
- Default imports for components: `import CustomHeader from '../components/CustomHeader'`
- External library imports use named patterns: `import { css } from 'react-emotion'` or `import { css } from 'emotion'`

### Template Literals
- Template literals are heavily used for inline CSS with emotion/react-emotion
- Dynamic values interpolated directly: `` background-image: url(${this.props.imageSrc}); ``

## Naming Conventions

### Components
- **Exported Components**: PascalCase for class and functional components (e.g., `ArticleCard`, `CustomHeader`, `ThreeArticleCardRow`)
- **Internal Helper Components**: PascalCase (e.g., `CustomLink`, `Subheading`, `Italics`)
- **Files**: Match component name with .tsx extension (e.g., `ArticleCard.tsx`, `CustomHeader.tsx`)
- **Capitalization Issues**: Some components use camelCase for file names (e.g., `pullImage.tsx`, `pullQuote.tsx`) - inconsistent with PascalCase pattern

### Variables & Functions
- **Props Objects**: camelCase (e.g., `blackCardFontSize`, `imageHeightVW`, `imageHeightMobileVW`)
- **State Variables**: camelCase (e.g., `open`, `term`, `slug`)
- **Event Handlers**: camelCase with "handle" prefix (e.g., `handleClick`)
- **Constants**: camelCase for local constants (e.g., `mapURL`, `swiperParams`)
- **CSS Variables**: camelCase when passed as props (e.g., `pullQuoteStyle`, `rectangleStyle`)

### Interfaces & Types
- **Props Interfaces**: Suffix with `Props` (e.g., `ArticleCardProps`, `CustomHeaderProps`, `ThreeArticleCardRowProps`)
- **Data Interfaces**: Suffix with nothing specific or type name (e.g., `ImageProps`, `HeadProps`, `TAC` for article card)
- **Short Aliases**: `TAC` used for "ThreeArticleCard" object type

### GraphQL & Data
- **Query Variables**: Database field names in lowercase with snake_case where used in API (e.g., `coverimg`, `covercred`, `authorbio`)
- **URLs**: Full URLs in constants (e.g., `mapURL`, `url`)

## Component/Module Patterns

### Class Components
- **Pattern**: Extend `React.Component<PropsType, StateType>`
- **Lifecycle Methods**: `componentDidMount()`, `componentWillUnmount()` used for event listeners
- **Public Methods**: Explicitly marked with `public` keyword
- **State Management**: State initialized as class property, updated with `setState()`
- **Render Method**: Always returns JSX wrapped in React.Fragment or div

Example from MobilePopup:
```typescript
class MobilePopup extends React.Component<any, any> {
  public detailsRef: React.RefObject<HTMLInputElement> = React.createRef()
  public state = {
    open: false,
  }
  public componentDidMount() { /* ... */ }
  public render() { /* ... */ }
}
```

### Functional Components
- **Pattern**: Used for simpler, stateless components
- **Props**: Typed via interface or inline destructuring
- **Footer, CustomHead**: Functional components with typed props

Example:
```typescript
export default function Head(props: HeadProps) {
  // component logic
}
```

### Prop Validation
- **TypeScript Props Interface**: Every component has explicit interface for props
- **Optional Props**: Marked with `?` in interface
- **Default Props**: Implemented via `static defaultProps` on class components
- **Any Type**: Used in some places (e.g., `React.Component<any, any>` in MobilePopup)

### Styling Patterns
- **Emotion CSS-in-JS**: Primary styling approach using `emotion` and `react-emotion`
- **Template Literals**: CSS as template strings with `css`` function
- **Inline Styles**: Conditional inline styles using ternary operators (e.g., MobilePopup)
- **Media Queries**: Inline media queries within template literals
- **Class Names**: Applied via `className={css``...``}` or class name strings

Styling example:
```typescript
className={css`
  position: relative;
  height: ${this.props.imageHeightVW}vw;
  @media screen and (max-width: 940px) {
    height: ${this.props.imageHeightMobileVW}vw;
  }
`}
```

### Responsive Design
- **Mobile Breakpoint**: 940px is primary breakpoint used throughout
- **Secondary Breakpoints**: 768px, 808px, 700px, 650px used for specific components
- **Pattern**: Separate components or CSS media queries for desktop/mobile display

## Error Handling

### Logging
- **console.log()**: Extensive use throughout for debugging
  - Found in page components (index.tsx): multiple `console.log()` calls
  - Found in template (article.tsx): `{console.log(data)}`
  - Found in StyledCoverPhoto: `{console.log(this.props.quarter)}`
- **console.warn()**: Used for missing data: `console.warn(\`No matching node found for slug: ${element.slug}\`)`

### Fallback Patterns
- **Undefined Checks**: Multiple places check for undefined before rendering
  - Example: `if (ele === undefined)` in index.tsx with default values
- **Server-Side Rendering**: Checks for `typeof document === 'undefined'` to avoid SSR issues
  - Pattern: Returns null or empty fragments during SSR

### No Try-Catch
- No explicit try-catch blocks found
- Relies on GraphQL error handling and fetch response checking
- Soft failure approach with default objects when data is missing

### Comment-Based TODOs
- Found in gatsby-node.js: `// i have a final tomorrow sue me (FIX BELOWWW)`
- Indicates technical debt and deferred cleanup

## State Management Patterns

### Component State
- **Class Component State**: Set via `public state = { key: value }`
- **State Updates**: `this.setState({ open: !this.state.open })`
- **Ref-Based State**: Using `React.createRef()` for DOM references (MobilePopup)

### Props Drilling
- Data passed through props from pages to components
- Example: index.tsx fetches data and passes to TitleGallery, ThreeArticleCardRow, TwoArticleCardRow

### Gatsby GraphQL Data
- **Page Queries**: Defined with `export const query = graphql\`...\``
- **Page Context**: Used in templates, passed via `pageContext` object
- **Data Props**: Received as `data` prop in page/template components

### External Data Sources
- **Kerckhoff API**: Primary data source for articles and issues
- **fetch() Calls**: Used in gatsby-node.js to pull data during build time
- **No State Management Library**: No Redux, Mobx, or Context API usage

## Common Code Patterns

### Gatsby Page Patterns
- **Page Component**: Default export from pages/ folder
- **GraphQL Query**: Defined as `export const query`
- **Data Passing**: Props include `data` object with query results

Example from index.tsx:
```typescript
export const query = graphql`
  query {
    issues { /* ... */ }
    allPrimeArticle { /* ... */ }
  }
`

const IndexPage = ({ data }) => {
  // use data.issues.issues
  // use data.allPrimeArticle.edges
}
```

### Conditional Rendering
- **Ternary Operators**: Used heavily for conditionals in JSX
- **&&Operators**: Used for optional rendering
- **Type Checks**: `typeof document === 'undefined'` for SSR detection

Example from StyledCoverPhoto:
```typescript
{this.props.photographers &&
  this.props.quarter !== "spring 2024" &&
  ' // ART BY ' + toSentence(this.props.photographers).toUpperCase()
}
```

### Array Mapping
- **map() + return JSX**: Standard pattern for lists
- **Key Props**: Some uses lack keys or use index as key (anti-pattern)

Example:
```typescript
{this.props.stories.map(story => (
  <Link to={`/${story.slug.split('.').join('')}`}>
    {/* JSX */}
  </Link>
))}
```

### String Manipulation
- **slugify()**: Used for creating URL-friendly slugs
- **split().join()**: Used to remove dots from slugs: `slug.split('.').join('')`
- **charAt(0).toUpperCase() + slice()**: Used for string capitalization

### External Library Integration
- **@dailybruin/lux**: Used for Article, Video, toSentence utilities
- **react-id-swiper**: Used for carousel/gallery components
- **react-emotion**: CSS-in-JS solution
- **@fortawesome**: Icon library for hamburger/close menus
- **react-helmet**: Head management
- **react-social-icons**: Social media icons

### Custom Utilities
- **typography.js**: Typography configuration via Typography library
- **Custom Components**: Pull quotes, pull images, headers with highlights

### Uncommented Code
- Some intentionally commented code sections (e.g., Google Analytics in gatsby-config.js)
- Suggests experimental or disabled features
- Inline code comments are sparse

### Hardcoded Values
- **Issue Terms**: `const curIssue = 'summer25'` in CustomHeader
- **Article Slugs**: Hardcoded arrays for registration/orientation/grad issues
- **Domain Checks**: Special handling for specific article titles (Genevieve Finn article)
- **Metadata**: Static URLs and image paths

### Data Transformation Patterns
Index page pattern for transforming GraphQL data:
```typescript
// 1. Extract featured slugs from issues
const featuredSlugs = data.issues.issues.map(issue => ({
  slug: issue.articles[0],
  quarter: formatTerm(issue.term)
}))

// 2. Combine with article data
const featuredArticles1 = featuredSlugs.map(element => {
  for (const edge of data.allPrimeArticle.edges) {
    if (edge.node.slug === element.slug) {
      return { ...element, ...edge.node }
    }
  }
})

// 3. Transform shape for component consumption
const featuredArticles2 = featuredArticles1.map(ele => ({
  title: ele.headline,
  authors: [ele.author],
  // ...
}))
```

### Mobile Popup Pattern
Details element with state management for mobile navigation:
```typescript
<details ref={this.detailsRef}>
  <summary>/* toggle icon */</summary>
  <nav>/* navigation links */</nav>
</details>
```
Uses document.addEventListener for click-outside detection.
