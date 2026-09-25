/**
 * Value object representing a search term of the series catalogue.
 *
 * @remarks
 * Defines the closed set of search terms supported by the Series Assets bounded
 * context and the query value sent to the provider for each one.
 *
 * @author Student Name
 */
export class SearchTerm {
  /** "Star" search term. */
  static readonly Star = new SearchTerm('star', 'star');
  /** "Love" search term. */
  static readonly Love = new SearchTerm('love', 'love');

  /**
   * Creates a search term. Instances are only created through the static members.
   *
   * @param id - Stable search term identifier, also used as i18n key suffix.
   * @param query - Value sent in the provider query parameter.
   */
  private constructor(readonly id: string, readonly query: string) {
  }

  /**
   * Returns all supported search terms.
   *
   * @returns The list of supported search terms.
   */
  static values(): SearchTerm[] {
    return [SearchTerm.Star, SearchTerm.Love];
  }
}
