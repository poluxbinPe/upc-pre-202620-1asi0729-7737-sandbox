import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {TranslatePipe} from '@ngx-translate/core';
import {BookCategory} from '../../../domain/model/book-category';

/**
 * Presentation component with toggle buttons to select a book category.
 *
 * @remarks
 * Receives the categories and the selected one, and emits the category chosen by the user.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Component({
  selector: 'app-book-category-selector',
  imports: [MatButtonToggleGroup, MatButtonToggle, TranslatePipe],
  templateUrl: './book-category-selector.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './book-category-selector.css'
})
export class BookCategorySelector {
  /** Input categories available for selection. */
  categories = input.required<BookCategory[]>();
  /** Input category currently selected. */
  selectedCategory = input.required<BookCategory>();
  /** Output event emitted when the user selects a category. */
  categorySelected = output<BookCategory>();

  /**
   * Emits the selected category to parent components.
   *
   * @param category - Category chosen by the user.
   */
  emitCategorySelectedEvent(category: BookCategory): void {
    this.categorySelected.emit(category);
  }
}
