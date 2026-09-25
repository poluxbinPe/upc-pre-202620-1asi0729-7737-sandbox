/**
 * Value object representing a book category of the catalogue.
 *
 * @remarks
 * Defines the closed set of categories supported by the Book Assets bounded context
 * and the search term used to retrieve the books of each category.
 *
 * @author Student Name
 */
export class BookCategory {
  /** Software Engineering category. */
  static readonly SoftwareEngineering = new BookCategory('software-engineering', 'software engineering');
  /** Artificial Intelligence category. */
  static readonly ArtificialIntelligence = new BookCategory('artificial-intelligence', 'artificial intelligence');

  /**
   * Creates a book category. Instances are only created through the static members.
   *
   * @param id - Stable category identifier, also used as i18n key suffix.
   * @param searchTerm - Term used to search books of this category.
   */
  private constructor(readonly id: string, readonly searchTerm: string) {
  }

  /**
   * Returns all supported categories.
   *
   * @returns The list of supported book categories.
   */
  static values(): BookCategory[] {
    return [BookCategory.SoftwareEngineering, BookCategory.ArtificialIntelligence];
  }

  /**
   * Finds a category by its identifier.
   *
   * @param id - Category identifier.
   * @returns The matching category, or undefined when it does not exist.
   */
  static fromId(id: string): BookCategory | undefined {
    return BookCategory.values().find(category => category.id === id);
  }
}
