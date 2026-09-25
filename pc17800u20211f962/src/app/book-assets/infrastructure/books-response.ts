/**
 * Raw response contract for the Open Library search endpoint.
 *
 * @remarks
 * Keeps the provider naming (snake_case) so it matches the JSON payload exactly.
 *
 * @author Student Name
 */
export interface BooksResponse {
  /** Total number of books found by the provider. */
  numFound: number;
  /** Index of the first returned book. */
  start: number;
  /** Collection of raw book resources included in the response. */
  docs: BookResource[];
}

/**
 * Raw book resource returned by the Open Library search endpoint.
 *
 * @remarks
 * Optional attributes may be missing in the provider payload.
 *
 * @author Student Name
 */
export interface BookResource {
  /** Work key (for example, "/works/OL123W"). */
  key: string;
  /** Book title. */
  title: string;
  /** Optional author names. */
  author_name?: string[];
  /** Optional year of first publication. */
  first_publish_year?: number;
  /** Optional number of editions. */
  edition_count?: number;
  /** Optional cover identifier for the covers CDN. */
  cover_i?: number;
}
