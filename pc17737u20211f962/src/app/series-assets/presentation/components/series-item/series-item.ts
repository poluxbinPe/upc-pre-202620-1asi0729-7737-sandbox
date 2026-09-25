import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
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
import {MatDialog} from '@angular/material/dialog';
import {DecimalPipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {Series} from '../../../domain/model/series.entity';
import {SeriesDetails} from '../series-details/series-details';

/**
 * Presentation component that renders one series as a card.
 *
 * @remarks
 * Shows the image, name, language, genres, status and average rating, and a
 * "Series Details" action that opens a dialog with additional information.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Component({
  selector: 'app-series-item',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIcon,
    DecimalPipe,
    TranslatePipe
  ],
  templateUrl: './series-item.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './series-item.css'
})
export class SeriesItem {
  /** Angular Material dialog service used to show the series details. */
  private dialog = inject(MatDialog);

  /** Input series to display. */
  series = input.required<Series>();

  /**
   * Opens the dialog with the details of the series.
   */
  showSeriesDetails(): void {
    this.dialog.open(SeriesDetails, {
      data: this.series().id,
      width: '640px',
      maxWidth: '95vw'
    });
  }
}
