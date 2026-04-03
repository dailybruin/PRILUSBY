# Testing

## Framework & Tools

### No Testing Framework Installed
- **Jest**: Not in package.json
- **Vitest**: Not in package.json
- **Mocha/Chai**: Not in package.json
- **React Testing Library**: Not in package.json
- **Cypress/Playwright**: Not in package.json
- **Unit Tests**: Zero .test.ts, .test.tsx, .spec.ts, .spec.tsx files found
- **Integration Tests**: No test directories (__tests__, tests/, test/) exist

### Development Dependencies
```json
{
  "prettier": "1.18.2"
}
```

Only Prettier is included as a dev dependency for code formatting. No testing tools are configured.

### Build & Quality Tools
- **Gatsby**: 2.15.21 (static site generator with built-in build validation)
- **TypeScript**: 2.1.9 (type checking at compile time)
- **EditorConfig**: Enforces consistent formatting
- **Prettier**: Code style enforcement via git workflow

## Test Structure

### No Structured Tests
- No test suite organization
- No test file naming conventions applied (since no tests exist)
- No test directory structure established
- No test configuration files (jest.config.js, vitest.config.ts, etc.)

### Build-Time Validation
The project relies on Gatsby's build process for validation:
- GraphQL query validation during `gatsby build`
- TypeScript compilation errors caught during build
- Component rendering errors caught during site generation

### Manual Testing Approach
Project appears to use manual testing:
- Local development via `gatsby develop`
- Visual inspection in browser
- Manual QA before deployment

## Test Locations

### Absence of Test Files
```
No tests found in:
- src/__tests__/
- src/components/__tests__/
- src/pages/__tests__/
- src/templates/__tests__/
- tests/
- __tests__/
```

### Source Files Without Tests
- ArticleCard.tsx - no test
- CustomHeader.tsx - no test
- Footer.tsx - no test
- MobilePopup.tsx - no test
- TitleGallery.tsx - no test
- ArticleGrid.tsx - no test
- All page components - no tests
- All template components - no tests
- gatsby-node.js - no tests for data sourcing
- gatsby-config.js - no tests

## Mocking Approach

### No Mocking Infrastructure
- No mock library configured (Jest mocks, Sinon, etc.)
- No fixture files for test data
- No mock server setup (MSW, Mirage, etc.)

### Data Sourcing Approach (Not Mocking)
The codebase uses real API calls:
- **gatsby-node.js**: Fetches real data from Kerckhoff API during build
- **Kerckhoff API Endpoints**:
  - `https://kerckhoff.dailybruin.com/api/packages/prime/prime.map.articles.to.issues/`
  - `https://kerckhoff.dailybruin.com/api/packages/prime?all=True`
- **No Fallback/Mock Data**: Production code depends on live API responses

### Handling Missing Data
Defensive programming instead of mocks:
```typescript
// From index.tsx - handles undefined with defaults
const featuredArticles2 = featuredArticles1.map(ele => {
  if (ele === undefined) {
    return {
      title: "DEFAUT_HEADLINE",
      authors: "DEFAULT_AUTHOR",
      description: "DEFAULT_EXCERPT",
      quarter: "DEFAULT_QUARTER",
      imageURL: "https://...",
      slug: "DEFAULT.SLUG",
    }
  }
  return { /* actual data */ }
})
```

### Component Props Testing
No isolated component testing; props validation via:
- **TypeScript Interfaces**: Compile-time type checking
- **Manual Verification**: Props manually validated during development
- **Browser Testing**: Visual verification during local development

## Coverage & Quality Notes

### Quality Assurance Strategy
1. **Type Safety**: TypeScript enforces prop types and function signatures
2. **Build Validation**: Gatsby build catches GraphQL and rendering errors
3. **Manual Testing**: Local development (`gatsby develop`) provides visual feedback
4. **Code Formatting**: Prettier ensures consistent code style
5. **Editor Standards**: EditorConfig enforces file consistency

### Known Quality Issues

#### Console Logging in Production Code
- Extensive `console.log()` calls left in production components:
  - `index.tsx`: Lines 78, 81, 95, 130, 137
  - `article.tsx`: Line 101
  - `StyledCoverPhoto.tsx`: Line 163
- Should be removed or moved to debug mode only

#### Hardcoded Values
- Current issue hardcoded: `const curIssue = 'summer25'` in CustomHeader
- Causes manual updates needed for new quarters
- Article-specific rules hardcoded: `if (data.primeArticle.headline === "The Fundamental Difference")`

#### No Error Boundaries
- No React Error Boundary components
- Component crashes could break entire page
- No fallback UI for render errors

#### Inconsistent Naming
- File naming inconsistency: `pullImage.tsx`, `pullQuote.tsx` (camelCase) vs other PascalCase
- Type union: Some uses `any` type (MobilePopup) reducing type safety

#### Incomplete Type Coverage
```typescript
// From MobilePopup - loose typing
class MobilePopup extends React.Component<any, any> { /* ... */ }

// From FooterAuthorBio - incorrect capitalization of String
interface FooterAuthorBioProps {
  name: String,  // Should be lowercase 'string'
  email: String,
  handle: String,
  bio: String,
}
```

#### Missing JSX Keys
Array mapping sometimes lacks proper keys:
```typescript
{cards.map((card, i) => (
  <div key={i}>  {/* Anti-pattern: index as key */}
    <ArticleCard key={i} /* ... */ />
  </div>
))}
```

#### Defensive Programming Gaps
- Some undefined checks present, but not comprehensive
- No null coalescing fallbacks in some data transformations
- GraphQL queries assume API always returns complete data

### Performance Considerations
- **No Code Splitting**: All components imported in pages/templates
- **No Lazy Loading**: No React.lazy() or dynamic imports
- **No Image Optimization**: Direct image URLs without next/image-like optimization
- **Swiper Performance**: Heavy carousel use may impact mobile performance

### Accessibility Notes
- Limited ARIA labels
- Icon fonts used without alt text fallbacks (FontAwesome icons)
- Color contrast not explicitly verified
- No semantic HTML in some areas (e.g., divs used for navigation in MobilePopup)

### SEO Implementation
- **Meta Tags**: Comprehensive via react-helmet (CustomHead)
- **Open Graph**: Implemented for social sharing
- **Twitter Cards**: Configured
- **Canonical URLs**: Set for each page
- **Special Handling**: Noindex rule for specific article by author name
- **Structured Data**: No JSON-LD schemas found

### Documentation Gaps
- Minimal inline code comments
- No JSDoc documentation on functions
- No component prop documentation beyond TypeScript interfaces
- No README for component libraries or patterns
- gatsby-node.js comments sparse (e.g., "i have a final tomorrow sue me")

### Build & Deployment Quality
- **Travis CI**: Configured (.travis.yml present)
- **Docker**: Simple Dockerfile for containerization
- **No Staging Tests**: No pre-deployment test suite
- **Manual Verification**: Deployment appears manual without automated tests

### Recommendations for Testing Implementation
1. **Add Jest + React Testing Library**: For component unit tests
2. **Add E2E Testing**: Cypress for critical user flows
3. **Remove console.logs**: Or use debug library with NODE_ENV checks
4. **Add Error Boundaries**: For robust error handling
5. **Mock Kerckhoff API**: For reliable test environment
6. **Add Visual Regression**: For design system consistency
7. **Add Accessibility Testing**: jest-axe for a11y validation
8. **Remove code from production**: Hardcoded current issue, article-specific rules
