import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DishService } from '@modules/shared/services/dish.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page-component.html',
  styleUrls: ['./home.page-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent  {

  constructor(
    private dishService: DishService
  ) { }

  public start(): void {
    this.dishService.init();
  }

}
