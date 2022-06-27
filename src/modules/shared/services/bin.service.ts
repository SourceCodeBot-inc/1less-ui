import { Injectable } from '@angular/core';
import { firstValueFrom, share, switchMap } from 'rxjs';
import { StoreAccessService } from './store-access.service';

import {binSchema, binSchema as schema} from '../dao/bin.dao';
import {Bin} from '../models/bin';

import { ReplaySubject } from 'rxjs';
import { StoreApi } from 'crudodb';

const bins: Bin[] = [
  {
    id: '1'
  },
  {
    id: '2'
  }
];

@Injectable({
  providedIn: 'root'
})
export class BinService {

  private subject = new ReplaySubject<StoreApi<Bin>>(1);

  private api$ = this.storeService.instance$.pipe(
    switchMap((crudo) => crudo.applySchema<Bin>({
      schema
    })),
    share({resetOnComplete: false, connector: () => this.subject})
  );

  constructor(private storeService: StoreAccessService) { }

  public async getAllItems(): Promise<Bin[]> {
    return bins;
    /*
    const api = await firstValueFrom(this.api$);
    return api.getAll();*/
  }

  public async addOneItem(item: Bin): Promise<void> {
    const api = await firstValueFrom(this.api$);
    await api.create(item);
  }

}
