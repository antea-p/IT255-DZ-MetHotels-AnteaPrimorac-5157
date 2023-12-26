import { createReducer, on } from '@ngrx/store';
import { addRoom, updateRoom, deleteRoom } from './room.actions';
import { AppState, initialState } from './room.state';

export const roomReducer = createReducer(
    initialState,
    on(addRoom, (state, { room }) => ({
        ...state,
        rooms: [...state.rooms, room]
    })),
    on(updateRoom, (state, { room }) => ({
        ...state,
        rooms: state.rooms.map(r => r.id === room.id ? room : r)
    })),
    on(deleteRoom, (state, { id }) => ({
        ...state,
        rooms: state.rooms.filter(r => r.id !== id)
    }))
);
