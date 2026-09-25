import {computed, inject, Service, signal} from '@angular/core';
import {finalize} from 'rxjs';
import {Book} from '../domain/model/book.entity';
import {BookCategory} from '../domain/model/book-category';
import {OpenLibraryApi} from '../infrastructure/open-library-api';

/**
 * Application service that manages the state of the Book Assets bounded context.
 *
 * @remarks
 * Applies the State Management pattern with Angular Signals: it owns the selected
 * category and a cache of books per category, and exposes read-only projections
 * consumed by presentation components.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Service()
export class BookAssetsStore {
  /** Gateway to the Open Library API. */
  private openLibraryApi = inject(OpenLibraryApi);

  /** Internal signal with the currently selected category. */
  private currentCategorySignal = signal<BookCategory>(BookCategory.SoftwareEngineering);
  /** Internal signal with the books cache keyed by category id. */
  private booksSignal = signal<Record<string, Book[]>>({});
  /** Internal signal indicating whether a request is in progress. */
  private loadingSignal = signal(false);
  /** Internal signal indicating whether the last request failed. */
  private errorSignal = signal(false);

  /** Available categories. */
  readonly categories = BookCategory.values();
  /** Read-only projection of the selected category. */
  readonly currentCategory = this.currentCategorySignal.asReadonly();
  /** Reactive list of books for the selected category. */
  readonly currentCategoryBooks = computed(() => this.booksSignal()[this.currentCategorySignal().id] ?? []);
  /** Read-only projection of the loading state. */
  readonly loading = this.loadingSignal.asReadonly();
  /** Read-only projection of the error state. */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Selects a category and loads its books when they are not cached.
   *
   * @param category - Category selected by the user.
   */
  selectCategory(category: BookCategory): void {
    this.currentCategorySignal.set(category);
    this.loadBooksForCurrentCategory();
  }

  /**
   * Loads the books of the selected category when they are not already cached.
   */
  loadBooksForCurrentCategory(): void {
    const category = this.currentCategorySignal();
    if (this.booksSignal()[category.id]) return;

    this.loadingSignal.set(true);
    this.errorSignal.set(false);
    this.openLibraryApi.getBooksByCategory(category)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: books => this.booksSignal.update(current => ({...current, [category.id]: books})),
        error: () => this.errorSignal.set(true)
      });
  }
}
