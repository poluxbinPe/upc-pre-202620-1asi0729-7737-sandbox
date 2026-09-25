import {computed, inject, Service, signal} from '@angular/core';
import {Series} from '../domain/model/series.entity';
import {SearchTerm} from '../domain/model/search-term';
import {TvMazeApi} from '../infrastructure/tv-maze-api';

/**
 * Application service that manages the state of the Series Assets bounded context.
 *
 * @remarks
 * Applies the State Management pattern with Angular Signals: it owns the selected
 * search term, a cache of series per search term and the series whose details
 * are displayed, exposing read-only projections to presentation components.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Service()
export class SeriesAssetsStore {
  /** Gateway to the TVmaze API. */
  private tvMazeApi = inject(TvMazeApi);

  /** Internal signal with the currently selected search term. */
  private currentSearchTermSignal = signal<SearchTerm>(SearchTerm.Star);
  /** Internal signal with the series cache keyed by search term id. */
  private seriesSignal = signal<Record<string, Series[]>>({});
  /** Internal signal with the series whose details are displayed. */
  private selectedSeriesSignal = signal<Series | null>(null);

  /** Available search terms. */
  readonly searchTerms = SearchTerm.values();
  /** Read-only projection of the selected search term. */
  readonly currentSearchTerm = computed(() => this.currentSearchTermSignal());
  /** Reactive list of series for the selected search term. */
  readonly currentSearchTermSeries = computed(() => this.seriesSignal()[this.currentSearchTermSignal().id] ?? []);
  /** Read-only projection of the series whose details are displayed. */
  readonly selectedSeries = computed(() => this.selectedSeriesSignal());

  /**
   * Selects a search term and loads its series.
   *
   * @param searchTerm - Search term selected by the user.
   */
  selectSearchTerm(searchTerm: SearchTerm): void {
    this.currentSearchTermSignal.set(searchTerm);
    this.loadSeriesForCurrentSearchTerm();
  }

  /**
   * Loads the series of the selected search term when they are not already cached.
   */
  loadSeriesForCurrentSearchTerm(): void {
    const searchTerm = this.currentSearchTermSignal();
    if (!this.seriesSignal()[searchTerm.id]) {
      this.tvMazeApi.searchSeries(searchTerm).subscribe(series => {
        this.seriesSignal.set({...this.seriesSignal(), [searchTerm.id]: series});
      });
    }
  }

  /**
   * Loads the details of a series from the provider.
   *
   * @param seriesId - Identifier of the series whose details are requested.
   */
  loadSeriesDetails(seriesId: number): void {
    this.selectedSeriesSignal.set(null);
    this.tvMazeApi.getSeriesById(seriesId).subscribe(series => this.selectedSeriesSignal.set(series));
  }
}
