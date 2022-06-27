import { v4 as uuid } from 'uuid';
import { Bin } from '../models/bin';
import { Dish } from '../models/dish';
import { Event } from '../models/event';
import { Pos } from '../models/pos';

type DataSet = {
  events: Event[];
  dishes: Dish[];
  bins: Bin[];
  pos: Pos[]
}

export function generateNextData(): DataSet {
  const [id] = `${+new Date()}`;
  const events: Event[] = [
    {
      id: uuid(),
      timestamp: +new Date(),
      binId: id,
      dishId: id,
      posId: id
    }
  ];
  const dishes: Dish[] = [];
  const bins: Bin[] = [];
  const pos: Pos[] = [];

  return {
    events,
    dishes,
    bins,
    pos
  };
}
