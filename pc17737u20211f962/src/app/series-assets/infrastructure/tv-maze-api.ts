import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Series} from '../domain/model/series.entity';
import {SearchTerm} from '../domain/model/search-term';
import {SearchShowsResponse} from './search-shows-response';
import {ShowResponse} from './show-response';
import {SeriesAssembler} from './series-assembler';

/**
 * Infrastructure gateway to the TVmaze API.
 *
 * @remarks
 * Applies the Request/Response pattern with HttpClient and returns domain
 * entities by delegating resource mapping to the SeriesAssembler.
 *
 * @author Student Name
 */
@Service()
export class TvMazeApi {
  private baseUrl = environment.tvMazeApiBaseUrl;
  private searchShowsEndpoint = environment.tvMazeSearchShowsEndpointPath;
  private showsEndpoint = environment.tvMazeShowsEndpointPath;
  private searchResultsLimit = environment.tvMazeSearchResultsLimit;
  private http = inject(HttpClient);
  private seriesAssembler = inject(SeriesAssembler);

  /**
   * Searches series by a search term, keeping at most the configured number of results.
   *
   * @param searchTerm - Term used in the query parameter.
   * @returns An observable with the list of Series entities ordered by relevance.
   */
  searchSeries(searchTerm: SearchTerm): Observable<Series[]> {
    return this.http.get<SearchShowsResponse>(`${this.baseUrl}${this.searchShowsEndpoint}`, {
      params: {q: searchTerm.query}
    }).pipe(
      map(response => this.seriesAssembler.toEntitiesFromResponse(response.slice(0, this.searchResultsLimit)))
    );
  }

  /**
   * Fetches the details of a series by its identifier.
   *
   * @param seriesId - TVmaze series identifier.
   * @returns An observable with the Series entity.
   */
  getSeriesById(seriesId: number): Observable<Series> {
    return this.http.get<ShowResponse>(`${this.baseUrl}${this.showsEndpoint}/${seriesId}`).pipe(
      map(response => this.seriesAssembler.toEntityFromResource(response))
    );
  }
}
