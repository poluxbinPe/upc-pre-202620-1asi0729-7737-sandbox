import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

/**
 * Presentation component that switches the active UI language.
 *
 * @remarks
 * Renders EN | ES toggle buttons and delegates the change to the TranslateService.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleGroup, MatButtonToggle, TranslatePipe],
  templateUrl: './language-switcher.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  /** Translation service managing the runtime language. */
  private translate = inject(TranslateService);

  /** Supported language codes available to users. */
  protected readonly languages = ['en', 'es'];
  /** Currently active language code. */
  protected readonly currentLanguage = this.translate.currentLang;

  /**
   * Changes the active application language.
   *
   * @param language - Locale code to activate.
   */
  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
