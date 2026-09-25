import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Shared presentation component rendering the application footer.
 *
 * @remarks
 * Shows the copyright notice and the developer information.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './footer.css'
})
export class Footer {
  /** Developer information shown in the footer (student code, first name and last name). */
  protected readonly developer = 'U20211F962 Deiby Juan Vargas Manchinelli';
}
