import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {TranslatePipe} from '@ngx-translate/core';
import {LogoDevApi} from '../../../infrastructure/logo-dev-api';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {Footer} from '../footer/footer';
import {SeriesCatalogue} from '../../../../series-assets/presentation/components/series-catalogue/series-catalogue';
import {environment} from '../../../../../environments/environment';

/**
 * Main shell component with the toolbar, the main view and the footer.
 *
 * @remarks
 * Shows the TVmaze logo and title on the left side of the toolbar and
 * the language switcher on the right side.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Component({
  selector: 'app-layout',
  imports: [MatToolbar, TranslatePipe, LanguageSwitcher, Footer, SeriesCatalogue],
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './layout.css'
})
export class Layout {
  /** Logo provider gateway used to resolve the toolbar logo. */
  private logoApi = inject(LogoDevApi);

  /** TVmaze logo URL resolved through the Logo.dev API. */
  protected readonly logoUrl = this.logoApi.getUrlToLogo(environment.tvMazeWebsiteUrl);
}
