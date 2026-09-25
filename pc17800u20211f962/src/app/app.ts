import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Layout} from './shared/presentation/components/layout/layout';

/**
 * Root component hosting the shared layout shell.
 *
 * @remarks
 * Entry point of the component tree.
 *
 * @author Deiby Juan Vargas Manchinelli
 */
@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css'
})
export class App {
}
