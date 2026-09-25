import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Series} from '../../../domain/model/series.entity';
import {SeriesItem} from '../series-item/series-item';

/**
 * Presentation component that renders a responsive grid of series cards.
 *
 * @remarks
 * Displays three cards per row on wide screens and fewer on smaller screens.
 *
 * @author Student Name
 */
@Component({
  selector: 'app-series-list',
  imports: [SeriesItem],
  templateUrl: './series-list.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './series-list.css'
})
export class SeriesList {
  /** Input collection of series to display. */
  seriesList = input.required<Series[]>();
}
