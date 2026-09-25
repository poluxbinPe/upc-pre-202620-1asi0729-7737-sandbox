import {ShowResource} from './show-response';

/**
 * Raw response contract for the TVmaze show search endpoint (`/search/shows`).
 *
 * @remarks
 * The endpoint returns an array of search results ordered by relevance.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
export type SearchShowsResponse = ShowSearchResultResource[];

/**
 * Raw search result resource returned by the TVmaze show search endpoint.
 *
 * @remarks
 * Wraps the show resource together with its relevance score.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
export interface ShowSearchResultResource {
  /** Relevance score of the result. */
  score: number;
  /** Show information. */
  show: ShowResource;
}
