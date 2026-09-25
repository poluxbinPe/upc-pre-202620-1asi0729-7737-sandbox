import {Url} from '../../../shared/domain/model/url';

/**
 * Represents a book in the Book Assets bounded context.
 *
 * @remarks
 * Domain entity with TypeScript naming conventions, independent of the
 * snake_case attributes returned by the Open Library API.
 *
 * @author Student Name
 */
export class Book {
  /** Open Library work identifier (for example, "/works/OL123W"). */
  id: string;
  /** Book title shown as the main card title. */
  title: string;
  /** Names of the book authors. */
  authorNames: string[];
  /** Year of first publication, or null when unknown. */
  firstPublishYear: number | null;
  /** Number of editions registered in Open Library. */
  editionCount: number;
  /** URL to the book cover image. */
  coverUrl: Url;
  /** URL to the official book page in Open Library. */
  detailsUrl: Url;

  /**
   * Creates an empty book placeholder.
   *
   * @remarks
   * Infrastructure assemblers populate the entity from resources.
   */
  constructor() {
    this.id = '';
    this.title = '';
    this.authorNames = [];
    this.firstPublishYear = null;
    this.editionCount = 0;
    this.coverUrl = new Url('');
    this.detailsUrl = new Url('');
  }

  /**
   * Returns the author names as a comma-separated text.
   *
   * @returns The authors text, or an empty string when there are no authors.
   */
  get authorNamesAsText(): string {
    return this.authorNames.join(', ');
  }

  /**
   * Indicates whether the book has a cover image.
   *
   * @returns True when a cover URL is available.
   */
  get hasCover(): boolean {
    return !this.coverUrl.isEmpty();
  }

  /**
   * Returns the cover URL as a string.
   *
   * @returns The cover URL string.
   */
  get coverUrlAsString(): string {
    return this.coverUrl.toString();
  }

  /**
   * Returns the details URL as a string.
   *
   * @returns The details URL string.
   */
  get detailsUrlAsString(): string {
    return this.detailsUrl.toString();
  }
}
