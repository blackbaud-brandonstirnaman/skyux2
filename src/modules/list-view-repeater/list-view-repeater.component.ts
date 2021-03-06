import {
  Component, Input, ContentChild, forwardRef, ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';
import { ListViewComponent } from '../list/list-view.component';
import { ListState, ListStateDispatcher } from '../list/state';
import { ListItemModel } from '../list/state/items/item.model';
import { RepeaterState, RepeaterStateDispatcher, RepeaterStateModel } from './state';
import { ListViewRepeaterSetExpandedAction } from './state/expanded/actions';
import { ListViewRepeaterSetEditingAction } from './state/editing/actions';
import { SkyListViewRepeaterLeftComponent } from './list-view-repeater-left.component';
import { SkyListViewRepeaterRightComponent } from './list-view-repeater-right.component';
import { SkyListViewRepeaterTitleComponent } from './list-view-repeater-title.component';
import {
  SkyListViewRepeaterDescriptionComponent
} from './list-view-repeater-description.component';
import { SkyListViewRepeaterContentComponent } from './list-view-repeater-content.component';
import { SkyListViewRepeaterEditorComponent } from './list-view-repeater-editor.component';

@Component({
  selector: 'sky-list-view-repeater',
  templateUrl: './list-view-repeater.component.html',
  styleUrls: ['./list-view-repeater.component.scss'],
  providers: [
    /* tslint:disable */
    { provide: ListViewComponent, useExisting: forwardRef(() => SkyListViewRepeaterComponent)},
    /* tslint:enable */
    RepeaterState,
    RepeaterStateDispatcher,
    RepeaterStateModel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewRepeaterComponent extends ListViewComponent {
  @Input() set name(value: string) { this.viewName = value; }
  /* tslint:disable */
  @Input('search') searchFunction: (data: any, searchText: string) => boolean;
  /* tslint:enable */
  @ContentChild(SkyListViewRepeaterLeftComponent)
  private leftComponent: SkyListViewRepeaterLeftComponent;
  @ContentChild(SkyListViewRepeaterRightComponent)
  private rightComponent: SkyListViewRepeaterRightComponent;
  @ContentChild(SkyListViewRepeaterTitleComponent)
  private titleComponent: SkyListViewRepeaterTitleComponent;
  @ContentChild(SkyListViewRepeaterDescriptionComponent)
  private descriptionComponent: SkyListViewRepeaterDescriptionComponent;
  @ContentChild(SkyListViewRepeaterContentComponent)
  private contentComponent: SkyListViewRepeaterContentComponent;
  @ContentChild(SkyListViewRepeaterEditorComponent)
  private editorComponent: SkyListViewRepeaterEditorComponent;

  constructor(
    state: ListState,
    private dispatcher: ListStateDispatcher,
    private repeaterState: RepeaterState,
    private repeaterDispatcher: RepeaterStateDispatcher,
  ) {
    super(state, 'Repeater View');
  }

  public onViewActive() {
    if (this.searchFunction !== undefined) {
      this.dispatcher.searchSetFunctions([this.searchFunction]);
    }
  }

  public toggleContent(item: ListItemModel) {
    this.repeaterState.map(s => s.expanded)
      .take(1)
      .subscribe(expanded => {
        this.repeaterDispatcher.next(
          new ListViewRepeaterSetExpandedAction(item.id, !expanded[item.id])
        );
      });
  }

  public beginEditing(item: ListItemModel) {
    this.repeaterState.map(s => s.editing)
      .take(1)
      .subscribe(editing => {
        this.repeaterDispatcher.next(new ListViewRepeaterSetEditingAction(item.id, true));
      });
  }

  public stopEditing(item: ListItemModel) {
    this.repeaterState.map(s => s.editing)
      .take(1)
      .subscribe(editing => {
        this.repeaterDispatcher.next(new ListViewRepeaterSetEditingAction(item.id, false));
      });
  }

  public showReadOnly(item: ListItemModel) {
    return Observable.of(true);
  }

  public showEditor(item: ListItemModel) {
    return Observable.of(false);
  }

  public showContent(item: ListItemModel) {
    return this.repeaterState.map(s => s.expanded[item.id]);
  }

  get items() {
    return this.state.map(s => s.displayedItems.items);
  }

  get leftTemplate() {
    return this.leftComponent !== undefined ? this.leftComponent.template : undefined;
  }

  get rightTemplate() {
    return this.rightComponent !== undefined ? this.rightComponent.template : undefined;
  }

  get titleTemplate() {
    return this.titleComponent !== undefined ? this.titleComponent.template : undefined;
  }

  get descriptionTemplate() {
    return this.descriptionComponent !== undefined ? this.descriptionComponent.template : undefined;
  }

  get contentTemplate() {
    return this.contentComponent !== undefined ? this.contentComponent.template : undefined;
  }

  get editorTemplate() {
    return this.editorComponent !== undefined ? this.editorComponent.template : undefined;
  }
}
