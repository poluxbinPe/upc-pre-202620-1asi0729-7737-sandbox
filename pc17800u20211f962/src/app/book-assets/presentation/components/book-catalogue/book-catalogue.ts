import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TranslatePipe} from '@ngx-translate/core';
import {BookAssetsStore} from '../../../application/book-assets.store';
import {BookCategory} from '../../../domain/model/book-category';
import {BookCategorySelector} from '../book-category-selector/book-category-selector';
import {BookList} from '../book-list/book-list';

/**
 * Presentation component for the Book Catalogue view.
 *
 * @remarks
 * Container component that connects the BookAssetsStore with the category
 * selector and the book list.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Component({
  selector: 'app-book-catalogue',
  imports: [BookCategorySelector, BookList, MatProgressSpinner, TranslatePipe],
  templateUrl: './book-catalogue.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './book-catalogue.css'
})
export class BookCatalogue implements OnInit {
  /** Injected application store for the Book Assets bounded context. */
  protected store = inject(BookAssetsStore);

  /** Loads the books of the default category when the view is mounted. */
  ngOnInit(): void {
    this.store.loadBooksForCurrentCategory();
  }

  /**
   * Updates the selected category.
   *
   * @param category - Category selected by the user.
   */
  onCategorySelected(category: BookCategory): void {
    this.store.selectCategory(category);
  }
}
