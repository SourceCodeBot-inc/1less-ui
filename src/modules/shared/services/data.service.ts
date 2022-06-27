import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemType } from '../models/item-type';
import { calculateEmissionsForType } from '../utils/calculators';
import { BinService } from './bin.service';
import { DishService } from './dish.service';
import { EventService } from './event.service';
import { PosService } from './pos.service';


const mapping: any = {
  [ItemType.Bowl]: 300,
  [ItemType.Cup]: 300,
  [ItemType.Spork]:500
};

interface Data {
  type: 'bar';
  x: unknown[];
  y: number[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private events: EventService,
    private dishes: DishService
  ) { }

  public async calculate(): Promise<Data[]> {
    const typesOfDishes = [ItemType.Bowl,ItemType.Cup, ItemType.Spork];

    const y : {type: string, singleUse: number, reuse: number}[] = typesOfDishes.map((type) => {
      const timesWeUsed = mapping[type];

      const {reuse, singleUse} =  calculateEmissionsForType(type, timesWeUsed);
      return {type, singleUse, reuse};
    });
    return y.map(({type: name,singleUse,reuse}) => {
      return {
        type: 'bar',
        x: ['singleUse', '1less'],
        y: [singleUse, reuse],
        name
      };
    });
  }

}
