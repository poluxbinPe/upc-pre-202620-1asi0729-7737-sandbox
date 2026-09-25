/**
 * Raw response contract for the TVmaze show endpoint (`/shows/{id}`).
 *
 * @remarks
 * The endpoint returns a single show resource.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
export type ShowResponse = ShowResource;

/**
 * Raw show resource returned by the TVmaze API.
 *
 * @remarks
 * Keeps the provider naming and nested structure so it matches the JSON payload.
 * Nullable attributes may be missing information in the provider payload.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
export interface ShowResource {
  /** Show identifier. */
  id: number;
  /** Show name. */
  name: string;
  /** Main language of the show. */
  language: string | null;
  /** Genres of the show. */
  genres: string[];
  /** Production status. */
  status: string;
  /** Episode runtime in minutes. */
  runtime: number | null;
  /** Average episode runtime in minutes. */
  averageRuntime: number | null;
  /** Premiere date in ISO-8601 format. */
  premiered: string | null;
  /** Official website of the show. */
  officialSite: string | null;
  /** Rating information. */
  rating: RatingResource;
  /** Broadcasting network, when the show is aired on TV. */
  network: ChannelResource | null;
  /** Web channel, when the show is streamed online. */
  webChannel: ChannelResource | null;
  /** Show images. */
  image: ImageResource | null;
  /** HTML summary of the show. */
  summary: string | null;
}

/**
 * Raw rating resource nested in a show resource.
 *
 * @remarks
 * The average is null when the show has no ratings.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
export interface RatingResource {
  /** Average rating from 0 to 10. */
  average: number | null;
}

/**
 * Raw network or web channel resource nested in a show resource.
 *
 * @remarks
 * Only the attributes used by the application are declared.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
export interface ChannelResource {
  /** Channel identifier. */
  id: number;
  /** Channel name. */
  name: string;
}

/**
 * Raw image resource nested in a show resource.
 *
 * @remarks
 * Contains the image URLs in the sizes provided by TVmaze.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
export interface ImageResource {
  /** Medium-sized image URL. */
  medium: string;
  /** Original-sized image URL. */
  original: string;
}
