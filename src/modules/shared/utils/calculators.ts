import { ItemType } from "../models/item-type";
import { Event } from "../models/event";
import { Dish } from "../models/dish";
import { Bin } from "../models/bin";

const emissionMapping = {
  [ItemType.Bowl]: {
    singleUse: 0.0095 * 3,
    reuse: 0.2214 * 3
  },
  [ItemType.BowlLid]: {
    singleUse: 0.0019 * 3,
    reuse: 0.0378 * 3
  },
  [ItemType.Cup]: {
    singleUse: 0.0057 * 3,
    reuse: 0.0681 * 3
  },
  [ItemType.CupLid]: {
    singleUse: 0.0002 * 3,
    reuse: 0.0189 * 3
  },
  [ItemType.Spork]: {
    singleUse: 0.0017 * 3,
    reuse: 0.028 * 3
  }
}


export function calculateEmissionsForType(type: ItemType, timesWeUsed: number): {singleUse:number, reuse:number} {
  const {reuse, singleUse} = emissionMapping[type];
  return {
    reuse: singleUse * timesWeUsed - reuse,
    singleUse: singleUse * timesWeUsed
  };
}

export function getEmissionsFor(item: ItemType, reusable = true): number {
  const key = reusable ? 'reuse' : 'singleUse';
  return emissionMapping[item][key];
}

interface EmissionMapEntry {
  type: ItemType;
  reuse: EmissionItem;
  singleUse: EmissionItem;
}

interface EmissionItem {
  today: number;
  overall: number;
}

const startingValue = {
  today: 0,
  overall: 0
};

const defaultValue: Record<ItemType, EmissionMapEntry> = {
  [ItemType.Bowl]: {type: ItemType.Bowl, reuse: startingValue, singleUse: startingValue},
  [ItemType.BowlLid]: {type: ItemType.BowlLid, reuse: startingValue, singleUse: startingValue},
  [ItemType.Cup]: {type: ItemType.Cup, reuse: startingValue, singleUse: startingValue},
  [ItemType.CupLid]: {type: ItemType.CupLid, reuse: startingValue, singleUse: startingValue},
  [ItemType.Spork]: {type: ItemType.Spork, reuse: startingValue, singleUse: startingValue}
};


export function savedEmissionPerBin(events: Event[], bins: Bin[], dishes: Dish[]): Record<string, EmissionMapEntry[]> {
  return bins.reduce((acc, bin) => ({
    ...acc,
    // [bin.id]: savedEmissionFn(events, bin.id, dishes)
  }), {});
}


export function savedEmissionOverallForDish(events: Event[], dish: Dish, cleaning: number): number {
  const {singleUse: co2Reg, reuse: co2OneLess} = emissionMapping[dish.type];
  const times = events.filter(({dishId, posId}) => dishId === dish.id && !!posId).length;
  return (co2Reg - cleaning) * times - co2OneLess;
}

export function savedEmissionInTimespanForDish(
  events: Event[],
  dish: Dish,
  cleaning: number,
  isInTimespan: (date: number) => boolean): number {
  return savedEmissionOverallForDish(
    events.filter(({timestamp}) => isInTimespan(timestamp)),
    dish,
    cleaning
  ) + emissionMapping[dish.type].reuse; // TODO: make it prettier
}

export function savedOnetimeUsageForPos(events: Event[], searchPosId: string): number {
  return events.filter(({posId}) => posId === searchPosId).length;
}

export function savedWeightForType(type: ItemType, weight: number, events: Event[], dishes: Dish[]): number {
  return events.reduce((acc, event) => {
    const dish = dishes.find(({id}) => id === event.dishId);
    if (dish && dish.type === type) {
      return acc + weight;
    }
    return acc;
  }, 0);
}
