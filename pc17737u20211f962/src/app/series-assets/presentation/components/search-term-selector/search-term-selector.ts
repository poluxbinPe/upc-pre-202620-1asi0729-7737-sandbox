import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {TranslatePipe} from '@ngx-translate/core';
import {SearchTerm} from '../../../domain/model/search-term';

/**
 * Presentation component with toggle buttons to select a search term.
 *
 * @remarks
 * Receives the search terms and the selected one, and emits the search term chosen by the user.
 *
 * @author Student Name
 */
@Component({
  selector: 'app-search-term-selector',
  imports: [MatButtonToggleGroup, MatButtonToggle, TranslatePipe],
  templateUrl: './search-term-selector.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-term-selector.css'
})
export class SearchTermSelector {
  /** Input search terms available for selection. */
  searchTerms = input.required<SearchTerm[]>();
  /** Input search term currently selected. */
  selectedSearchTerm = input.required<SearchTerm>();
  /** Output event emitted when the user selects a search term. */
  searchTermSelected = output<SearchTerm>();

  /**
   * Emits the selected search term to parent components.
   *
   * @param searchTerm - Search term chosen by the user.
   */
  emitSearchTermSelectedEvent(searchTerm: SearchTerm): void {
    this.searchTermSelected.emit(searchTerm);
  }
}
