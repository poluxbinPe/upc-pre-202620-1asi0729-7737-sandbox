import {Service} from '@angular/core';
import {BookResource, BooksResponse} from './books-response';
import {Book} from '../domain/model/book.entity';
import {Url} from '../../shared/domain/model/url';
import {environment} from '../../../environments/environment';

/**
 * Maps book resources from the Open Library API into Book domain entities.
 *
 * @remarks
 * Applies the Assembler pattern: it is the only place that knows both the
 * provider naming (snake_case) and the domain naming (camelCase).
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Service()
export class BookAssembler {
  /** Base URL of the covers CDN. */
  private coversBaseUrl = environment.openLibraryCoversBaseUrl;
  /** Size suffix appended to the cover identifier. */
  private coverSizeSuffix = environment.openLibraryCoverSizeSuffix;
  /** Base URL of the Open Library website. */
  private websiteUrl = environment.openLibraryWebsiteUrl;

  /**
   * Converts a provider book resource into a Book entity.
   *
   * @param resource - Raw book object returned by the provider.
   * @returns The Book entity.
   */
  toEntityFromResource(resource: BookResource): Book {
    const book = new Book();
    book.id = resource.key;
    book.title = resource.title;
    book.authorNames = resource.author_name ?? [];
    book.firstPublishYear = resource.first_publish_year ?? null;
    book.editionCount = resource.edition_count ?? 0;
    book.coverUrl = new Url(resource.cover_i ? this.buildCoverUrl(resource.cover_i) : '');
    book.detailsUrl = new Url(`${this.websiteUrl}${resource.key}`);
    return book;
  }

  /**
   * Converts a search response payload into Book entities.
   *
   * @param response - Provider response with book resources.
   * @returns The list of Book entities.
   */
  toEntitiesFromResponse(response: BooksResponse): Book[] {
    return response.docs.map(resource => this.toEntityFromResource(resource));
  }

  /**
   * Builds the cover image URL for a cover identifier.
   *
   * @param coverId - Cover identifier returned by the provider.
   * @returns The cover image URL.
   */
  private buildCoverUrl(coverId: number): string {
    return `${this.coversBaseUrl}/${coverId}${this.coverSizeSuffix}`;
  }
}
