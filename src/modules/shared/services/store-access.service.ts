import { Injectable } from '@angular/core';
import { CrudoDb } from 'crudodb';
import { ReplaySubject } from 'rxjs';
import { from, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreAccessService {

  private subject = new ReplaySubject<CrudoDb>(1);

  public instance$ = from(CrudoDb.setup()).pipe(
    share({
      resetOnComplete: false,
      connector: () => this.subject
    })
  );

}
