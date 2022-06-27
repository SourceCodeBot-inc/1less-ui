import { TrackByFunction } from "@angular/core";
import { Dish } from "@modules/shared/models/dish";

export const dishTrackBy: TrackByFunction<Dish> = (_, dish) => dish.id;
