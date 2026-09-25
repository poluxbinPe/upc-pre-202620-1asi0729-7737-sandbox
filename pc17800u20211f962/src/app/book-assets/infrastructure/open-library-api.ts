import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Book} from '../domain/model/book.entity';
import {BookCategory} from '../domain/model/book-category';
import {BooksResponse} from './books-response';
import {BookAssembler} from './book-assembler';

/**
 * Infrastructure gateway to the Open Library search API.
 *
 * @remarks
 * Applies the Request/Response pattern with HttpClient and returns domain
 * entities by delegating resource mapping to the BookAssembler.
 *
 * @author Student Name
 */
@Service()
export class OpenLibraryApi {
  private baseUrl = environment.openLibraryApiBaseUrl;
  private searchEndpoint = environment.openLibrarySearchEndpointPath;
  private searchFields = environment.openLibrarySearchFields;
  private searchLimit = environment.openLibrarySearchLimit;
  private http = inject(HttpClient);
  private bookAssembler = inject(BookAssembler);

  /**
   * Fetches the books of a category and maps them into domain entities.
   *
   * @param category - Category whose books are requested.
   * @returns An observable with the list of Book entities.
   */
  getBooksByCategory(category: BookCategory): Observable<Book[]> {
    return this.http.get<BooksResponse>(`${this.baseUrl}${this.searchEndpoint}`, {
      params: {q: category.searchTerm, fields: this.searchFields, limit: this.searchLimit}
    }).pipe(
      map(response => this.bookAssembler.toEntitiesFromResponse(response))
    );
  }
}
