import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './room.state';

export const selectRoomsFeature = createFeatureSelector<AppState>('rooms');

export const selectAllRooms = createSelector(
    selectRoomsFeature,
    (state: AppState) => state.rooms
);

export const selectRoomById = (roomId: number) => createSelector(
    selectRoomsFeature,
    (state: AppState) => state.rooms.find(room => room.id === roomId)
);
