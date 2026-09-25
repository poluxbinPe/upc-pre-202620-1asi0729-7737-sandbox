# TV Series Explorer (pc17737u20211f962)

## Overview
TV Series Explorer is a web application for [TVmaze](https://www.tvmaze.com/) that lets users
explore TV series available in its public API, showing the series found for two search terms:
Star and Love.

## Features
- **Toolbar**: TVmaze logo (Logo.dev Logo API), application title and EN | ES language toggle.
- **Series Catalogue**: Search term toggle buttons (Star, Love) and series cards, with at most the first 12 results ordered by relevance.
- **Series Cards**: Image, name, language, genres, status, average rating and a "Series Details" action.
- **Series Details**: Dialog with additional information (premiere date, runtime, network or channel, summary and official site) retrieved from the TVmaze show endpoint.
- **Responsive Layout**: Three cards per row on wide screens, two on tablets and one on phones.
- **Multilingual Support**: English (default) and Spanish.
- **Accessibility**: Alternative text for images and ARIA attributes in views.

## Technologies
- Angular framework (v22).
- TypeScript language.
- Angular Material UI component library.
- Angular HttpClient.
- Angular Signals for state management.
- ngx-translate (`@ngx-translate/core`, `@ngx-translate/http-loader`).
- TVmaze API.
- Logo.dev Logo API.

## Architecture
The project follows a Domain-Driven Design approach with layered and component-based architecture:

```
src/app
├── shared                       # Generic elements
│   ├── domain/model             # Url value object
│   ├── infrastructure           # LogoDevApi
│   └── presentation/components  # Layout, LanguageSwitcher, Footer
└── series-assets                # Series Assets bounded context
    ├── domain/model             # Series entity, SearchTerm value object
    ├── application              # SeriesAssetsStore (Signals state management)
    ├── infrastructure           # TvMazeApi, SearchShowsResponse/ShowResponse resources, SeriesAssembler
    └── presentation/components  # SeriesCatalogue, SearchTermSelector, SeriesList, SeriesItem, SeriesDetails
```

Applied design patterns: Entity, Value Object, State Management (Store), Request/Response, Resource and Assembler.

## Documentation
- **Class Diagram**: [docs/class-diagram.puml](docs/class-diagram.puml).

## Environment Variables
Provider URLs, paths and keys are defined in `src/environments/environment.ts` (production)
and `src/environments/environment.development.ts` (development):
- `tvMazeApiBaseUrl`, `tvMazeSearchShowsEndpointPath`, `tvMazeShowsEndpointPath`, `tvMazeSearchResultsLimit`, `tvMazeWebsiteUrl`
- `logoProviderApiBaseUrl`, `logoProviderPublishableKey` (obtain a key at [Logo.dev](https://logo.dev/))

## Development server
Requires Node.js v22.22.3+ or v24.15.0+.

```bash
npm install
ng serve
```

Open `http://localhost:4200/` in your browser.

## Building

```bash
ng build
```

## Author
- **Student Name** (U20211F962)
