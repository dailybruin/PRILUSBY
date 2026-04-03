# Stack

## Languages & Runtime
- **JavaScript/TypeScript**: Primary language for both client and server logic
- **Node.js**: Runtime environment for build process and development
- **HTML/CSS**: Web markup and styling (generated via Gatsby)

## Frameworks & Libraries
- **Gatsby 2.15.21**: Static site generator and framework for building React-based websites
- **React 16.9.0**: UI library for component-based frontend development
- **React DOM 16.9.0**: React package for rendering to the DOM
- **React Helmet 5.2.1**: Library for managing document head metadata (title, meta tags)
- **React Emotion 9.2.12**: CSS-in-JS solution for styling React components
- **Emotion 9.2.12**: Core emotion library for component styling
- **Emotion Server 9.2.12**: Server-side rendering support for emotion styles
- **Typography.js 0.16.19**: Typography configuration and styling library
- **React Typography 0.16.19**: React wrapper for typography.js
- **Normalize.css 8.0.1**: CSS reset library

## Key Dependencies (with versions from package.json)
- `@babel/core`: 7.14.6 - JavaScript compiler for transpiling modern JS
- `@babel/plugin-transform-spread`: ^7.12.1 - Babel plugin for spread operator transformation
- `@dailybruin/gatsby-source-kerckhoff`: 1.1.1 - Custom Gatsby plugin for fetching content from Kerckhoff CMS
- `@dailybruin/lux`: 1.15.0 - Daily Bruin's React-based design system library
- `@fortawesome/fontawesome-svg-core`: ^1.2.20 - Font Awesome icon library (core)
- `@fortawesome/react-fontawesome`: ^0.1.4 - React wrapper for Font Awesome icons
- `@types/react`: 16.9.2 - TypeScript type definitions for React
- `gatsby-plugin-emotion`: 2.0.7 - Gatsby plugin for emotion CSS-in-JS
- `gatsby-plugin-google-analytics`: 2.1.17 - Google Analytics plugin for Gatsby (deprecated, not used)
- `gatsby-plugin-gtag`: ^1.0.13 - Google Analytics 4 (gtag) plugin for Gatsby
- `gatsby-plugin-manifest`: 2.2.18 - Gatsby plugin for web app manifest
- `gatsby-plugin-react-helmet`: 3.1.8 - Gatsby plugin for react-helmet integration
- `gatsby-plugin-typescript`: 2.1.9 - Gatsby plugin for TypeScript support
- `gatsby-plugin-typography`: 2.3.8 - Gatsby plugin for typography.js
- `node-fetch`: ^2.6.1 - Fetch API implementation for Node.js
- `crypto`: ^1.0.1 - Cryptography utilities
- `react-id-swiper`: ^1.6.9 - React wrapper for Swiper carousel library
- `react-images`: ^0.5.19 - Image gallery component
- `react-photo-gallery`: 6.3.4 - Photo gallery component
- `react-rectangle`: ^1.3.3 - Rectangle drawing component for React
- `react-social-icons`: ^4.1.0 - Social media icon components
- `slugify`: 1.3.5 - URL slug generator
- `sharp`: ^0.33.5 - Image processing library

## Configuration Files
- **gatsby-config.js**: Gatsby site configuration, plugin setup, and site metadata
- **gatsby-node.js**: Gatsby Node APIs for dynamic page creation and data sourcing
- **.prettierrc**: Code formatting configuration (semi: false, singleQuote: true, trailingComma: es5)
- **.editorconfig**: Editor configuration for consistent coding standards across editors
- **.travis.yml**: CI/CD configuration for automated builds on Travis CI
- **renovate.json**: Dependency update automation configuration
- **Dockerfile**: Docker container configuration for deployment (Gatsby-based image)
- **.yarnrc**: Yarn package manager configuration (yarn v1.22.22)
- **.yarnrc.yml**: Yarn v2+ configuration (yarn v4.4.1, node-modules linker)

## Build & Tooling
- **Yarn**: Package manager for dependency management (primary, with Yarn classic 1.22.22 and Yarn modern 4.4.1)
- **Gatsby CLI**: Command-line interface for Gatsby development
- **Node OpenSSL Legacy Provider**: Required Node option for building with legacy OpenSSL (--openssl-legacy-provider)
- **Docker**: Containerization for deployment (based on gatsbyjs/gatsby:latest)
- **Nginx**: Web server for production deployment (configured via nginx-boot.sh script)
- **Prettier**: Code formatter for consistent code styling
- **GraphQL**: Query language for data fetching from Gatsby's data layer
- **Webpack**: Module bundler used internally by Gatsby
- **Babel**: JavaScript compiler for transpiling and polyfilling

## Build Scripts
- `yarn start`: Develop mode with hot reload on port 1234
- `yarn build`: Production build generating static files in public/ directory
- `yarn serve`: Serve production build locally
- `yarn build:prefix-paths`: Build with path prefixing for subdirectory deployment
- `yarn deploy`: Docker build and push to dailybruin/prilusby:latest registry
