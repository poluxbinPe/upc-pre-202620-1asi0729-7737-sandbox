import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Book} from '../../../domain/model/book.entity';
import {BookItem} from '../book-item/book-item';

/**
 * Presentation component that renders a responsive grid of book cards.
 *
 * @remarks
 * Displays three cards per row on wide screens and fewer on smaller screens.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Component({
  selector: 'app-book-list',
  imports: [BookItem],
  templateUrl: './book-list.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './book-list.css'
})
export class BookList {
  /** Input collection of books to display. */
  books = input.required<Book[]>();
}
