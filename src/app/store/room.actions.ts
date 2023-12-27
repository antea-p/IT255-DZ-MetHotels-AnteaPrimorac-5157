import { createAction, props } from '@ngrx/store';
import { Room } from '../models/room.model';

export const setRooms = createAction(
    '[Room List] Set Rooms',
    props<{ rooms: Room[] }>()
);

export const addRoom = createAction(
    '[Room List] Add Room',
    props<{ room: Room }>()
);

export const updateRoom = createAction(
    '[Room List] Update Room',
    props<{ room: Room }>()
);

export const deleteRoom = createAction(
    '[Room List] Delete Room',
    props<{ id: number }>()
);
