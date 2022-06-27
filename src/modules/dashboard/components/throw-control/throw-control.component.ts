import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { dishTrackBy } from '@modules/dashboard/helpers/utils';
import { DishService } from '@modules/shared/services/dish.service';
import { EventService } from '@modules/shared/services/event.service';
import { from, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-throw-control',
  templateUrl: './throw-control.component.html',
  styleUrls: ['./throw-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThrowControlComponent {

  public dishTrackBy = dishTrackBy;

  public dishes$ = from(this.events.getEvents()).pipe(
    map((events) => {
      const output = events.filter(({posId, binId}) => !!posId && !binId);
      console.log({input: events, output});
      return output;
    }),
    switchMap((events)=>this.dishs.dishes$.pipe(
      map((dishes) => {
        const ids = events.filter(({binId}) => !binId).map(({dishId}) => dishId);
        return dishes.filter(({id}) => ids.includes(id));
      })
    ))
  );

  constructor(
    private events: EventService,
    private dishs: DishService
  ) { }

  public throwTo(dishId: string, binId: string): void {
    this.events.returnDish(dishId, binId);
  }

  public recycling(dishId: string): void {
    const id = window.prompt('bin 1 or 2?');
    if (!id) {
      return;
    }
    this.events.returnDish(dishId, id);
  }

}
