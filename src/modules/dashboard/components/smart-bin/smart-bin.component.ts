import { AfterContentInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { dishTrackBy } from '@modules/dashboard/helpers/utils';
import { DishService } from '@modules/shared/services/dish.service';
import { EventService } from '@modules/shared/services/event.service';
import { combineLatest, filter, map, startWith, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-smart-bin',
  templateUrl: './smart-bin.component.html',
  styleUrls: ['./smart-bin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartBinComponent implements OnChanges {

  public dishTrackBy = dishTrackBy;

  @Input()
  public id?: string;

  @Input()
  public label = 'some smart bin';

  private refresh = new Subject<void>();

  public filling$ = this.refresh.pipe(
    startWith(null!),
    tap(() => console.log('id', this.id)),
    filter(() => !!this.id),
    switchMap(() =>
      combineLatest({events: this.events.getEventsForBin(this.id!), dishes: this.dishes.dishes$})
    ),
    map(({dishes, events}) => {
      const ids = events.map(({dishId, binId}) => binId ? dishId : undefined).filter((id) => !!id);
      console.log({ids, dishes, events});
      return dishes.filter(({id}) => ids.includes(id));
    })
  );

  constructor(
    private events: EventService,
    private dishes: DishService
  ) { }


  public ngOnChanges(changes: SimpleChanges): void {
    const {id} = changes;
    if (id && id.currentValue !== id.previousValue) {
      this.refresh.next();
    }
  }

  public cleanIt(dishId: string): void {
    if (!this.id) {
      throw new Error('can not register a dish because i am not registered right');
    }
    this.events.cleanDish(dishId);
  }

}
