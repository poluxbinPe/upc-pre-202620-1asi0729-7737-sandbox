import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {DatePipe, DecimalPipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {SeriesAssetsStore} from '../../../application/series-assets.store';

/**
 * Presentation component that displays the details of a series in a dialog.
 *
 * @remarks
 * Requests the series details to the SeriesAssetsStore, which retrieves them
 * from the TVmaze show endpoint, using the series identifier received as dialog data.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Component({
  selector: 'app-series-details',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatProgressSpinner,
    DatePipe,
    DecimalPipe,
    TranslatePipe
  ],
  templateUrl: './series-details.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './series-details.css'
})
export class SeriesDetails implements OnInit {
  /** Series identifier injected by the dialog service. */
  private seriesId: number = inject(MAT_DIALOG_DATA);
  /** Injected application store for the Series Assets bounded context. */
  protected store = inject(SeriesAssetsStore);

  /** Loads the series details when the dialog is opened. */
  ngOnInit(): void {
    this.store.loadSeriesDetails(this.seriesId);
  }
}
