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
  tvMazeWebsiteUrl: 'https://tvmaze.com',
  tvMazeApiBaseUrl: 'https://api.tvmaze.com',
  tvMazeSearchShowsEndpointPath: '/search/shows',
  tvMazeShowsEndpointPath: '/shows',
  tvMazeSearchResultsLimit: 12,
  logoProviderApiBaseUrl: 'https://img.logo.dev/',
  logoProviderPublishableKey: 'pk_H1j_uA9GRFizL2ikMw4qwQ'
};
