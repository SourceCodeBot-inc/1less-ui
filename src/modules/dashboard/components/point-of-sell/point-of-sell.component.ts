import { ChangeDetectionStrategy, Component, Input, OnInit, TrackByFunction } from '@angular/core';
import { dishTrackBy } from '@modules/dashboard/helpers/utils';
import { Dish } from '@modules/shared/models/dish';
import { DishService } from '@modules/shared/services/dish.service';
import { EventService } from '@modules/shared/services/event.service';

@Component({
  selector: 'app-point-of-sell',
  templateUrl: './point-of-sell.component.html',
  styleUrls: ['./point-of-sell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PointOfSellComponent  {

  @Input()
  public id?: string;

  @Input()
  public label = 'Some PoS';

  public dishes$ = this.dishService.dishes$;

  public dishTrackBy = dishTrackBy;

  constructor(
    private eventService: EventService,
    private dishService: DishService
  ) { }

  public sellDish(id: string): void {
    if (!this.id) {
      throw new Error('I have no id, so I can not sell anything!');
    }
    this.eventService.sellDish(id, this.id);
  }
}
