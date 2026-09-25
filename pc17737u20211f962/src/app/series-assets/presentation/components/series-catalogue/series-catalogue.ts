import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {SeriesAssetsStore} from '../../../application/series-assets.store';
import {SearchTerm} from '../../../domain/model/search-term';
import {SearchTermSelector} from '../search-term-selector/search-term-selector';
import {SeriesList} from '../series-list/series-list';

/**
 * Presentation component for the Series Catalogue view.
 *
 * @remarks
 * Container component that connects the SeriesAssetsStore with the search
 * term selector and the series list.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Component({
  selector: 'app-series-catalogue',
  imports: [SearchTermSelector, SeriesList, TranslatePipe],
  templateUrl: './series-catalogue.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './series-catalogue.css'
})
export class SeriesCatalogue implements OnInit {
  /** Injected application store for the Series Assets bounded context. */
  protected store = inject(SeriesAssetsStore);
  /** Reactive list of series for the selected search term. */
  protected readonly seriesList = this.store.currentSearchTermSeries;

  /** Loads the series of the default search term when the view is mounted. */
  ngOnInit(): void {
    this.store.loadSeriesForCurrentSearchTerm();
  }

  /**
   * Updates the selected search term.
   *
   * @param searchTerm - Search term selected by the user.
   */
  onSearchTermSelected(searchTerm: SearchTerm): void {
    this.store.selectSearchTerm(searchTerm);
  }
}
