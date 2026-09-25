/**
 * Production environment configuration.
 *
 * @remarks
 * Centralizes provider URLs, paths and keys to avoid hard coding them in source files.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
export const environment = {
  production: true,
  openLibraryWebsiteUrl: 'https://openlibrary.org',
  openLibraryApiBaseUrl: 'https://openlibrary.org',
  openLibrarySearchEndpointPath: '/search.json',
  openLibrarySearchFields: 'key,title,author_name,first_publish_year,edition_count,cover_i',
  openLibrarySearchLimit: 12,
  openLibraryCoversBaseUrl: 'https://covers.openlibrary.org/b/id',
  openLibraryCoverSizeSuffix: '-L.jpg',
  logoProviderApiBaseUrl: 'https://img.logo.dev/',
  logoProviderPublishableKey: 'pk_H1j_uA9GRFizL2ikMw4qwQ'
};
