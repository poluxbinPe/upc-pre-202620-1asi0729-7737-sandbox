# Open Library Explorer (pc17800u20211f962)

## Overview
Open Library Explorer is a web application that promotes digital access to the
[Open Library](https://openlibrary.org/) catalogue, showing books classified in two
categories: Software Engineering and Artificial Intelligence.

## Features
- **Toolbar**: Open Library logo (Logo.dev Logo API), application title and EN | ES language toggle.
- **Book Catalogue**: Category toggle buttons (Software Engineering, Artificial Intelligence) and book cards.
- **Book Cards**: Cover image, title, authors, first publish year, edition count and a "Book Details" action that opens the official Open Library page in a new tab.
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
- Open Library Search API and Covers CDN.
- Logo.dev Logo API.

## Architecture
The project follows a Domain-Driven Design approach with layered and component-based architecture:

```
src/app
├── shared                       # Generic elements
│   ├── domain/model             # Url value object
│   ├── infrastructure           # LogoDevApi
│   └── presentation/components  # Layout, LanguageSwitcher, Footer
└── book-assets                  # Book Assets bounded context
    ├── domain/model             # Book entity, BookCategory value object
    ├── application              # BookAssetsStore (Signals state management)
    ├── infrastructure           # OpenLibraryApi, BooksResponse/BookResource, BookAssembler
    └── presentation/components  # BookCatalogue, BookCategorySelector, BookList, BookItem
```

Applied design patterns: Entity, Value Object, State Management (Store), Request/Response, Resource and Assembler.

## Documentation
- **Class Diagram**: [docs/class-diagram.puml](docs/class-diagram.puml).

## Environment Variables
Provider URLs, paths and keys are defined in `src/environments/environment.ts` (production)
and `src/environments/environment.development.ts` (development):
- `openLibraryApiBaseUrl`, `openLibrarySearchEndpointPath`, `openLibrarySearchFields`, `openLibrarySearchLimit`
- `openLibraryCoversBaseUrl`, `openLibraryCoverSizeSuffix`, `openLibraryWebsiteUrl`
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
- **Deiby Juan Vargas Manchinelli** (U20211F962)
