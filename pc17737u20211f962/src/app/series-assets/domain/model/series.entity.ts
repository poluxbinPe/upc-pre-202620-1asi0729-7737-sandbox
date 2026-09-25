import {Url} from '../../../shared/domain/model/url';

/**
 * Represents a TV series in the Series Assets bounded context.
 *
 * @remarks
 * Domain entity with TypeScript naming conventions, independent of the
 * attribute names and nested structure returned by the TVmaze API.
 *
 * @author Student Name
 */
export class Series {
  /** TVmaze series identifier. */
  id: number;
  /** Series name shown as the main card title. */
  name: string;
  /** Main language of the series. */
  language: string;
  /** Genres of the series. */
  genres: string[];
  /** Production status (for example, "Running" or "Ended"). */
  status: string;
  /** Average rating from 0 to 10, or null when the series is not rated. */
  averageRating: number | null;
  /** URL to the medium-sized series image. */
  imageUrl: Url;
  /** Plain-text summary of the series. */
  summary: string;
  /** Premiere date in ISO-8601 format, or an empty string when unknown. */
  premieredOn: string;
  /** Average episode runtime in minutes, or null when unknown. */
  runtimeInMinutes: number | null;
  /** Name of the network or web channel that broadcasts the series. */
  channelName: string;
  /** URL to the official series website. */
  officialSiteUrl: Url;

  /**
   * Creates an empty series placeholder.
   *
   * @remarks
   * Infrastructure assemblers populate the entity from resources.
   */
  constructor() {
    this.id = 0;
    this.name = '';
    this.language = '';
    this.genres = [];
    this.status = '';
    this.averageRating = null;
    this.imageUrl = new Url('');
    this.summary = '';
    this.premieredOn = '';
    this.runtimeInMinutes = null;
    this.channelName = '';
    this.officialSiteUrl = new Url('');
  }

  /**
   * Returns the genres as a comma-separated text.
   *
   * @returns The genres text, or an empty string when there are no genres.
   */
  get genresAsText(): string {
    return this.genres.join(', ');
  }

  /**
   * Indicates whether the series has an image.
   *
   * @returns True when an image URL is available.
   */
  get hasImage(): boolean {
    return !this.imageUrl.isEmpty();
  }

  /**
   * Returns the image URL as a string.
   *
   * @returns The image URL string.
   */
  get imageUrlAsString(): string {
    return this.imageUrl.toString();
  }

  /**
   * Indicates whether the series has an official website.
   *
   * @returns True when an official site URL is available.
   */
  get hasOfficialSite(): boolean {
    return !this.officialSiteUrl.isEmpty();
  }

  /**
   * Returns the official site URL as a string.
   *
   * @returns The official site URL string.
   */
  get officialSiteUrlAsString(): string {
    return this.officialSiteUrl.toString();
  }
}
