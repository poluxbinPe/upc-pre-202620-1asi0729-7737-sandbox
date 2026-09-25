import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {Book} from '../../../domain/model/book.entity';

/**
 * Presentation component that renders one book as a card.
 *
 * @remarks
 * Shows the cover, title, authors, first publish year and edition count, and
 * a "Book Details" action that opens the official page in a new tab.
 *
 * @author Student Name
 */
@Component({
  selector: 'app-book-item',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIcon,
    TranslatePipe
  ],
  templateUrl: './book-item.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './book-item.css'
})
export class BookItem {
  /** Input book to display. */
  book = input.required<Book>();
}
