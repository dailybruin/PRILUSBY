# Concerns

## Technical Debt

### Outdated Dependencies
- **gatsby**: 2.15.21 (extremely outdated - current is v5+)
- **react**: 16.9.0 (from 2019 - should be v18+)
- **@types/react**: 16.9.2 (very outdated)
- **emotion**: 9.2.12 (old version of emotion library)
- **react-emotion**: 9.2.12 (deprecated in favor of emotion directly)
- **Node.js workaround**: Using `NODE_OPTIONS=--openssl-legacy-provider` to support old OpenSSL - indicates serious version incompatibilities

### String Manipulation Anti-patterns
- **Location**: Multiple files (article.tsx, index.tsx, issue.tsx, components)
- **Issue**: Heavy reliance on `split('.').join('')` to transform slugs
- **Lines affected**:
  - src/pages/index.tsx: `curArticle.slug.split('.').join('')`
  - src/templates/article.tsx: `.split('.').join('')`
  - src/components/TitleGallery.tsx: `story.slug.split('.').join('')`
  - src/components/ArticleCard.tsx: `this.props.slug.split('.').join('')`
  - src/components/TripleHeader/TripleHeader.tsx: `this.props.slug.split('.').join('')`
  - src/components/TripleHeader/TripleHeaderAlternative.tsx: slug manipulation
- **Problem**: Brittle slug handling without validation; hardcoded transformation logic should be extracted to utility function

### Substring-based Date/Term Parsing
- **Locations**: article.tsx (lines 76-77), issue.tsx, all.tsx
- **Code**: 
  ```javascript
  const season = term.substring(0, term.length - 2)
  const year = '20' + term.substring(term.length - 2, term.length)
  ```
- **Problems**:
  - Assumes fixed format (last 2 chars are year)
  - No validation of format
  - Fragile - fails silently with unexpected term formats
  - '20' prefix hardcoded - breaks in year 3000 (Y2K style issue)

### Hardcoded Article De-indexing Logic
- **Location**: src/templates/article.tsx (lines 69, 97) and article.tsx
- **Code**: 
  ```javascript
  {(data.primeArticle.headline === "The Fundamental Difference") && (data.primeArticle.author === "Genevieve Finn") && <meta name="robots" content="noindex, nofollow" />}
  ```
- **Problems**:
  - Hardcoded author/article name matching is not scalable
  - Duplicate code (appears twice)
  - Should be data-driven from CMS
  - No way to de-index articles without code changes
  - Could accidentally de-index wrong articles if names change

### Hardcoded Special Issues in gatsby-node.js
- **Location**: gatsby-node.js (lines 157-257)
- **Code**: Multiple hardcoded article slugs for 2019 registration, orientation, and grad issues:
  ```javascript
  const registrationissue2019 = [
    'prime.regissue.toptenprofessors',
    'prime.regissue.studyspace',
  ]
  ```
- **Problems**:
  - Brittle hardcoding of specific article slugs
  - Not scalable for future issues
  - Comment admits poor state: "// i have a final tomorrow sue me // (FIX BELOWWW)"
  - Duplicated GraphQL query logic for each special issue
  - Should be handled via data-driven configuration or CMS

### Hardcoded Year in gatsby-config.js
- **Location**: gatsby-config.js (line 8)
- **Code**: `const year = '2019'`
- **Problems**:
  - Hardcoded year is out of date
  - Used in URL construction
  - Should be dynamic or configurable
  - Makes the config less reusable

### Mixed Styling Approaches
- **Emotion CSS**: Using both `css` from emotion and `react-emotion`
- **Inline styles**: Using inline style objects (e.g., StyledCoverPhoto.tsx)
- **Problem**: Inconsistent styling patterns makes maintenance harder

## Security Concerns

### Unvalidated GraphQL Query Strings
- **Location**: gatsby-node.js (lines 102-143 and elsewhere)
- **Issue**: GraphQL queries are constructed with string interpolation using `${issue.term}` and `${articleslug}`
- **Code**:
  ```javascript
  graphql(`{
    issue(term: {eq: "${issue.term}"}) {
  ...
  `).then(_)
  ```
- **Problem**: While these are build-time and less vulnerable, they should use GraphQL variables instead of string interpolation
- **Risk**: GraphQL injection if data structure ever changes unexpectedly

### Fetch Calls Without Timeout
- **Location**: src/pages/about.tsx (lines 40, 182)
- **Code**: 
  ```javascript
  fetch("https://kerckhoff.dailybruin.com/api/packages/prime/prime.about")
    .then(res => res.json())
    .catch(error => console.error('Error fetching data:', error));
  ```
- **Problems**:
  - No timeout specified (can hang indefinitely)
  - No retry logic
  - Error handling only logs to console (doesn't gracefully degrade UI)
  - No error state displayed to user

### Missing Response Validation
- **Location**: src/pages/about.tsx and implicit in gatsby-node.js
- **Issue**: Assumes API responses have expected structure without validation
- **Example**: `setData(res.data['article.aml'] as AboutData)` - uses type assertion without runtime validation
- **Problem**: If API changes or returns error, app will crash

### Type Assertions Without Validation
- **Location**: src/pages/about.tsx (lines 42, 184)
- **Code**: `as AboutData` and `as any`
- **Problem**: `as any` bypasses TypeScript's type safety entirely
- **Examples**: src/components/CustomHead.tsx (image: any), src/components/MobilePopup.tsx (class MobilePopup extends React.Component<any, any>), src/components/GraphicNovel.tsx (content: any[])

### Unsafe Type Coercion
- **Location**: src/pages/about.tsx
- **Code**: `typeof document === 'undefined'` and `typeof window == 'undefined'`
- **Problem**: String comparison (`==` not `===`) and checking typeof for undefined is inconsistent

### Email Exposure
- **Location**: src/pages/about.tsx and components
- **Issue**: Author emails are displayed on page (line 158)
- **Problem**: Could lead to email harvesting/spam
- **Note**: This may be intentional for contact, but should be protected with spam prevention

## Performance Issues

### Blocking Node.js OpenSSL Provider Flag
- **Location**: package.json scripts
- **Issue**: All build and start commands use `NODE_OPTIONS=--openssl-legacy-provider`
- **Problem**: 
  - This flag has performance overhead
  - Indicates need for immediate dependency updates
  - Should be removed by modernizing dependencies

### Duplicate Fetch Calls for About Page
- **Location**: src/pages/about.tsx
- **Issue**: Same API call made twice (lines 40 and 182)
- **Code**: Two separate `useEffect` hooks fetch the same data
- **Problems**:
  - Redundant network requests
  - Race conditions possible
  - Data fetched once per component mount

### Missing useMemo/useCallback Optimization
- **Location**: src/pages/index.tsx
- **Issue**: Complex data transformations in render without memoization
- **Code**: 
  ```javascript
  const featuredArticles1 = featuredSlugs.map(...)
  const featuredArticles2 = featuredArticles1.map(...)
  ```
- **Problem**: Recalculates on every render even if data hasn't changed

### console.log Statements in Production
- **Location**: Multiple files
  - src/pages/index.tsx: Lines 78, 81, 95, 130, 137, 138
  - src/pages/about.tsx: Line 47
  - src/templates/article.tsx: Line 101
  - src/components/StyledCoverPhoto.tsx: Line 163
- **Problem**: Console output impacts performance and reveals internal data structure to users

### Inefficient Array Searches
- **Location**: src/pages/index.tsx (lines 82-92)
- **Code**: 
  ```javascript
  for (const edge of data.allPrimeArticle.edges) {
    if (edge.node.slug === element.slug) {
      return {...}
    }
  }
  ```
- **Problem**: O(n) search for every featured article - should use Map or index

### Missing Image Optimization
- **Location**: src/components/StyledCoverPhoto.tsx and other components
- **Issue**: Uses `background-image: url()` without optimization
- **Problem**: Large images not optimized for web; no lazy loading; no responsive images

## Fragile Areas

### Hardcoded URL Slugs in Templates
- **Location**: article.tsx (lines 62-64, 90-92)
- **Issue**: `https://prime.dailybruin.com/${slug.split('.').join('')}` manually constructed
- **Problem**: If slug format changes, meta tags will break

### Register/Orientation/Grad Issue Hardcoding
- **Location**: gatsby-node.js (lines 157-257)
- **Problem**: Adding new special issues requires code changes
- **Risk**: Human error when registering new issues; duplicated code

### Magic String Checks
- **Location**: src/templates/article.tsx (lines 110, 113)
- **Code**: 
  ```javascript
  if (articleType === 'graphic')
  if (articleType === 'article')
  ```
- **Problem**: 
  - No validation of articleType enum
  - Silent failures if unexpected type received
  - Hard to find all type references

### Season/Year Extraction
- **Location**: Multiple files (article.tsx, issue.tsx, all.tsx)
- **Problem**: Substring-based parsing assumes fixed format, no validation

### About Page Data Dependency
- **Location**: src/pages/about.tsx
- **Problem**: 
  - Entire page depends on single API call
  - No fallback if API fails
  - Duplicate fetch logic
  - Data not validated before use

## Known Bugs / TODOs

### Explicit Comment: Hardcoded Issue List Needs Fixing
- **Location**: gatsby-node.js (line 155)
- **Code**: `// i have a final tomorrow sue me // (FIX BELOWWW)`
- **Status**: This TODO has been in codebase for a long time
- **Impact**: Indicates unmaintained code for special issue handling

### Duplicate De-indexing Code
- **Location**: src/templates/article.tsx (lines 69 and 97)
- **Issue**: Same de-indexing logic duplicated for SSR and CSR
- **Fix needed**: Extract to separate function or component

### Empty FIXES.MD File
- **Location**: ./FIXES.MD (empty file in git)
- **Issue**: Appears to be placeholder or work-in-progress
- **Status**: 0 lines (completely empty)

### Unimplemented Default Handling
- **Location**: src/pages/index.tsx (lines 96-104)
- **Issue**: When article not found, returns default values including "DEFAUT_HEADLINE" (typo)
- **Code**: 
  ```javascript
  title: "DEFAUT_HEADLINE",  // Typo: should be DEFAULT
  authors: "DEFAULT_AUTHOR",
  description: "DEFAULT_EXCERPT",
  ```
- **Problem**: 
  - Typo shows poor quality
  - Silently shows defaults instead of failing/warning
  - Users see broken content

## Missing Infrastructure

### No TypeScript Strict Mode
- **Issue**: Multiple `any` types and `as any` casts throughout codebase
- **Examples**:
  - src/components/CustomHead.tsx: `image: any`
  - src/components/MobilePopup.tsx: `React.Component<any, any>`
  - src/components/GraphicNovel.tsx: `content: any[]`
  - src/components/QuarterlyStories.tsx: `stories: any[]`
- **Need**: Enable `strict: true` in tsconfig.json

### No Environment Configuration
- **Issue**: API URLs hardcoded
- **Locations**: 
  - src/pages/about.tsx: `https://kerckhoff.dailybruin.com/api/packages/prime/prime.about`
  - gatsby-node.js: `https://kerckhoff.dailybruin.com/api/packages/prime/...`
- **Missing**: .env files, environment variable support, different configs for dev/prod

### No Tests
- **Issue**: Zero test files in repository
- **Risk**: Changes could break existing functionality undetected
- **Missing**: Unit tests, integration tests, E2E tests

### No Error Boundaries
- **Issue**: Components don't have error boundaries
- **Risk**: Single component error crashes entire application
- **Missing**: Error boundary components for graceful degradation

### No Loading States
- **Location**: src/pages/about.tsx (line 189)
- **Issue**: Only returns `<div>Loading...</div>`
- **Problem**: 
  - Unstyled loading message
  - No skeleton screens
  - Inconsistent with page styling

### No Logging/Monitoring
- **Issue**: Only console.log statements; no structured logging
- **Missing**: 
  - Error tracking (Sentry, etc.)
  - Performance monitoring
  - Usage analytics (only Google Analytics configured)

### No Documented Architecture
- **Location**: documentation.md
- **Issue**: Documentation file only lists components, no actual documentation
- **Missing**:
  - Architecture overview
  - Data flow diagrams
  - Component API documentation
  - Setup/deployment instructions

### Missing Build Optimization Configuration
- **Issue**: No webpack/Gatsby optimization configuration visible
- **Missing**:
  - Code splitting strategy
  - Image optimization plugins
  - Caching headers configuration
  - Production build optimization

### No CI/CD Configuration
- **Location**: .travis.yml exists but is minimal
- **Issue**: Only .travis.yml file with minimal configuration
- **Missing**:
  - Automated testing in CI/CD
  - Linting enforcement
  - Type checking in CI
  - Performance budgets

### No Linting Configuration
- **Issue**: Only prettier for code formatting
- **Missing**:
  - ESLint configuration
  - Type checking enforcement
  - Code quality rules

### Incomplete Prettierrc
- **Location**: .prettierrc (74 bytes)
- **Issue**: Minimal prettier configuration
- **Missing**: Consistent formatting rules for team

### Deprecated React Patterns
- **Issue**: Class components used where functional components would be better
- **Examples**:
  - src/components/StyledCoverPhoto.tsx: Class component
  - src/components/MobilePopup.tsx: Class component with manual event listener cleanup
- **Better approach**: Use functional components with hooks

### Missing PropTypes or TypeScript Coverage
- **Issue**: Limited type safety
- **Examples**:
  - `props` in components not fully typed
  - Many interface definitions incomplete
  - Dynamic prop access without validation

### No Accessibility Testing
- **Issue**: No a11y testing tools configured
- **Missing**:
  - ARIA labels
  - Keyboard navigation
  - Screen reader testing

### Docker Configuration Incomplete
- **Location**: Dockerfile (3 lines)
- **Issue**: Dockerfile only copies built assets, no build step
- **Missing**:
  - Multi-stage build
  - Nginx configuration
  - Health checks
  - Security configurations

### Analytics Configuration Issues
- **Location**: gatsby-config.js
- **Issue**: Google Analytics plugin commented out (lines 41-48), replaced with gtag
- **Problem**: 
  - Inconsistent analytics approach
  - No config for development vs production tracking
  - Tracking ID hardcoded: 'G-1D4G812DSQ'

## Data Quality Issues

### Inconsistent Slug Handling
- **Problem**: Slugs use dot notation (e.g., 'prime.article.name') but are transformed by removing dots
- **Impact**: 
  - Database queries use different slug format than URLs
  - Potential for slug collisions

### Missing Article Warnings Not Actionable
- **Location**: src/pages/index.tsx (lines 91, 137)
- **Code**: `console.warn()` and `console.log("ERROR:")` 
- **Problem**: Errors only logged to console; users see broken/incomplete pages

### Inconsistent Naming Conventions
- **Examples**:
  - `authortwitter` vs camelCase
  - `coverimg` vs `coverimg` (inconsistency with Coverimg)
  - Mixed casing in CMS field names

## Recommendations Priority Order

### Critical (Fix ASAP)
1. Update Node.js and dependencies (remove --openssl-legacy-provider workaround)
2. Implement response validation and error handling for fetch calls
3. Extract hardcoded special issue logic to data-driven configuration
4. Add error boundaries and proper error states

### High (Fix Soon)
5. Enable TypeScript strict mode and remove `any` types
6. Extract slug transformation to utility functions with validation
7. Implement .env-based configuration for API URLs
8. Add proper loading states instead of placeholder divs
9. Remove console.log statements from production code
10. Implement duplicate fetch call fix in about.tsx

### Medium (Fix Next Quarter)
11. Add comprehensive test coverage
12. Implement structured logging
13. Fix date/term parsing with proper validation
14. Complete documentation with architecture diagrams
15. Add ESLint and code quality tools to CI/CD

### Low (Technical Improvements)
16. Migrate class components to functional components with hooks
17. Add image optimization
18. Implement caching strategies
19. Add accessibility testing and improvements
