import {computed, inject, Service, signal} from '@angular/core';
import {finalize} from 'rxjs';
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
 * @author Student Name
 */
@Service()
export class SeriesAssetsStore {
  private tvMazeApi = inject(TvMazeApi);

  /** Internal signal with the currently selected search term. */
  private currentSearchTermSignal = signal<SearchTerm>(SearchTerm.Star);
  /** Internal signal with the series cache keyed by search term id. */
  private seriesSignal = signal<Record<string, Series[]>>({});
  /** Internal signal indicating whether a search request is in progress. */
  private loadingSignal = signal(false);
  /** Internal signal indicating whether the last search request failed. */
  private errorSignal = signal(false);
  /** Internal signal with the series whose details are displayed. */
  private selectedSeriesSignal = signal<Series | null>(null);
  /** Internal signal indicating whether a details request is in progress. */
  private detailsLoadingSignal = signal(false);
  /** Internal signal indicating whether the last details request failed. */
  private detailsErrorSignal = signal(false);

  /** Available search terms. */
  readonly searchTerms = SearchTerm.values();
  /** Read-only projection of the selected search term. */
  readonly currentSearchTerm = this.currentSearchTermSignal.asReadonly();
  /** Reactive list of series for the selected search term. */
  readonly currentSearchTermSeries = computed(() => this.seriesSignal()[this.currentSearchTermSignal().id] ?? []);
  /** Read-only projection of the search loading state. */
  readonly loading = this.loadingSignal.asReadonly();
  /** Read-only projection of the search error state. */
  readonly error = this.errorSignal.asReadonly();
  /** Read-only projection of the series whose details are displayed. */
  readonly selectedSeries = this.selectedSeriesSignal.asReadonly();
  /** Read-only projection of the details loading state. */
  readonly detailsLoading = this.detailsLoadingSignal.asReadonly();
  /** Read-only projection of the details error state. */
  readonly detailsError = this.detailsErrorSignal.asReadonly();

  /**
   * Selects a search term and loads its series when they are not cached.
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
    if (this.seriesSignal()[searchTerm.id]) return;

    this.loadingSignal.set(true);
    this.errorSignal.set(false);
    this.tvMazeApi.searchSeries(searchTerm)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: series => this.seriesSignal.update(current => ({...current, [searchTerm.id]: series})),
        error: () => this.errorSignal.set(true)
      });
  }

  /**
   * Loads the details of a series from the provider.
   *
   * @param seriesId - Identifier of the series whose details are requested.
   */
  loadSeriesDetails(seriesId: number): void {
    this.selectedSeriesSignal.set(null);
    this.detailsLoadingSignal.set(true);
    this.detailsErrorSignal.set(false);
    this.tvMazeApi.getSeriesById(seriesId)
      .pipe(finalize(() => this.detailsLoadingSignal.set(false)))
      .subscribe({
        next: series => this.selectedSeriesSignal.set(series),
        error: () => this.detailsErrorSignal.set(true)
      });
  }
}
