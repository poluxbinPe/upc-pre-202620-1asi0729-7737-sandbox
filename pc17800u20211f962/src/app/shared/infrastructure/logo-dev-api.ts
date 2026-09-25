import {Service} from '@angular/core';
import {environment} from '../../../environments/environment';

/**
 * Infrastructure gateway for generating organization logo URLs using Logo.dev.
 *
 * @remarks
 * Builds logo image URLs from a website URL, using the provider base URL and
 * publishable key defined in environment variables.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Service()
export class LogoDevApi {
  /** Base URL for the logo provider API. */
  private baseUrl = environment.logoProviderApiBaseUrl;
  /** Publishable API key required by the logo provider. */
  private apiKey = environment.logoProviderPublishableKey;

  /**
   * Builds the logo URL for a website.
   *
   * @param url - A string value containing the website URL.
   * @returns The Logo.dev image URL for the website domain.
   */
  getUrlToLogo(url: string): string {
    return `${this.baseUrl}${new URL(url).hostname}?token=${this.apiKey}`;
  }
}
