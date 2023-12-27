import { Room } from '../models/room.model';

export interface AppState {
    allRooms: Room[];
}

export const initialState: AppState = {
    allRooms: []
};
