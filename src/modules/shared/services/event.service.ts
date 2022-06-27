import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom, ReplaySubject, share, switchMap } from 'rxjs';
import { StoreAccessService } from './store-access.service';
import {v4 as uuid} from 'uuid';
import {eventSchema as schema} from '../dao/event.dao';
import { Event } from '../models/event';
import { StoreApi } from 'crudodb';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private subject = new ReplaySubject<StoreApi<Event>>(1);

  private api$ = this.storeService.instance$.pipe(
    switchMap((crudoDb) => crudoDb.applySchema<Event>({
      schema
    })),
    share({
      resetOnRefCountZero: false,
      connector: () => this.subject
    })
  );

  constructor(
    private storeService: StoreAccessService
  ) { }

  public async sellDish(dishId: string, posId: string): Promise<void> {
    const api = await firstValueFrom(this.api$);
    await api.create(createSellEvent(dishId, posId));
  }

  public async returnDish(dishId: string, binId: string): Promise<void>{
    const api = await firstValueFrom(this.api$);
    await api.create(createReturnEvent(dishId, binId));
  }

  public async getEvents(): Promise<Event[]> {
    const api = await firstValueFrom(this.api$);
    return api.getAll();
  }

  public async getEventsForDish(dishId: string): Promise<Event[]> {
    const api = await firstValueFrom(this.api$);
    return api.getAll().then((events) => events.filter(({dishId: id}) => dishId === id));
  }

  public async getEventsForPos(posId: string): Promise<Event[]> {
    const api = await firstValueFrom(this.api$);
    return api.getAll().then((events) => events.filter(({posId: id}) => posId === id));
  }

  public async getEventsForBin(binId: string): Promise<Event[]> {
    const api = await firstValueFrom(this.api$);
    return api.getAll().then((events) => events.filter(({binId: id}) => binId === id));
  }

  public async cleanDish(dishId: string): Promise<void> {
    // TODO: whats happen if its cleaned?
  }

  /// TODO: get dish ids from events which current in the pos and which in the bin

}

function createSellEvent(dishId: string, posId: string): Event {
  return {
    id: uuid(),
    timestamp: +new Date(),
    dishId,
    posId
  };
}

function createReturnEvent(dishId: string, binId: string): Event {
  return {
    id: uuid(),
    timestamp: +new Date(),
    dishId,
    binId
  };
}
