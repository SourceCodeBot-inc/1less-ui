import { Pipe, PipeTransform } from '@angular/core';
import { ItemType } from '@modules/shared/models/item-type';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  public transform(value: ItemType): string {
    switch (value) {
      case ItemType.Bowl:
      case ItemType.BowlLid:
        return 'rice_bowl';
      case ItemType.Cup:
      case ItemType.CupLid:
        return 'coffee';
      case ItemType.Spork:
        return 'restaurant';
    }
  }

}
