import {Service} from '@angular/core';
import {ShowResource} from './show-response';
import {SearchShowsResponse} from './search-shows-response';
import {Series} from '../domain/model/series.entity';
import {Url} from '../../shared/domain/model/url';

/**
 * Maps show resources from the TVmaze API into Series domain entities.
 *
 * @remarks
 * Applies the Assembler pattern: it is the only place that knows both the
 * provider structure (nested `show`, `rating.average`, `image.medium`) and the
 * domain naming.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Service()
export class SeriesAssembler {

  /**
   * Converts a provider show resource into a Series entity.
   *
   * @param resource - Raw show object returned by the provider.
   * @returns The Series entity.
   */
  toEntityFromResource(resource: ShowResource): Series {
    let series = new Series();
    series.id = resource.id;
    series.name = resource.name;
    series.language = resource.language || '';
    series.genres = resource.genres || [];
    series.status = resource.status || '';
    series.averageRating = resource.rating.average;
    series.imageUrl = new Url(resource.image?.medium || '');
    series.summary = resource.summary || '';
    series.premieredOn = resource.premiered || '';
    series.runtimeInMinutes = resource.averageRuntime || resource.runtime;
    series.channelName = resource.network?.name || resource.webChannel?.name || '';
    series.officialSiteUrl = new Url(resource.officialSite || '');
    return series;
  }

  /**
   * Converts a search response payload into Series entities.
   *
   * @param response - Provider response with search result resources.
   * @returns The list of Series entities.
   */
  toEntitiesFromResponse(response: SearchShowsResponse): Series[] {
    return response.map(result => this.toEntityFromResource(result.show));
  }
}
