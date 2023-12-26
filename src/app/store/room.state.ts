import { Room } from '../models/room.model';

export interface AppState {
    rooms: Room[];
}

export const initialState: AppState = {
    rooms: []
};
