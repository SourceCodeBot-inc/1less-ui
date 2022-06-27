import { Injectable } from '@angular/core';
import { StoreApi } from 'crudodb';
import { firstValueFrom, ReplaySubject, share, startWith, Subject, switchMap } from 'rxjs';
import { Dish } from '../models/dish';
import { dishSchema as schema } from '../dao/dish.dao';
import { StoreAccessService } from './store-access.service';
import { ItemType } from '../models/item-type';
import {v4 as uuid} from 'uuid';

const items: Dish[] = [
  ...new Array(4).fill(1).map(() => ({
    id: uuid(),
    type: ItemType.Bowl
  })),
  ...new Array(4).fill(1).map(() => ({
    id: uuid(),
    type: ItemType.BowlLid
  })),
  ...new Array(4).fill(1).map(() => ({
    id: uuid(),
    type: ItemType.Cup
  })),
  ...new Array(4).fill(1).map(() => ({
    id: uuid(),
    type: ItemType.CupLid
  })),
  ...new Array(8).fill(1).map(() => ({
    id: uuid(),
    type: ItemType.Spork
  }))
];

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private subject = new ReplaySubject<StoreApi<Dish>>(1);

  private dishesSubject = new ReplaySubject<Dish[]>(1);

  private api$ = this.storeService.instance$.pipe(
    switchMap((crudoDb) => crudoDb.applySchema<Dish>({
      schema
    })),
    share({
      resetOnRefCountZero: false,
      connector: () => this.subject
    })
  );

  private refresh = new Subject<void>();

  public dishes$ = this.refresh.pipe(
    startWith(null!),
    switchMap(() => this.api$),
    switchMap((api) => api.getAll()),
    share({
      resetOnRefCountZero: true,
      connector: () => this.dishesSubject
    })
  );

  constructor(
    private storeService: StoreAccessService
  ) {}

  public async init(): Promise<void> {
    console.log('insert data');
    const api = await firstValueFrom(this.api$);
    await Promise.all(items.map((item) => api.create(item)));
    console.log('done', {items});
  }
}
