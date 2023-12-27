import { createReducer, on } from '@ngrx/store';
import { addRoom, updateRoom, deleteRoom, setRooms } from './room.actions';
import { AppState, initialState } from './room.state';

export const roomReducer = createReducer(
    initialState,
    on(setRooms, (state, { rooms }) => ({
        ...state,
        allRooms: rooms
    })
    ),
    on(addRoom, (state, { room }) => ({
        ...state,
        allRooms: [...state.allRooms, room]
    })),
    on(updateRoom, (state, { room }) => ({
        ...state,
        allRooms: state.allRooms.map(r => r.id === room.id ? room : r)
    })),
    on(deleteRoom, (state, { id }) => ({
        ...state,
        allRooms: state.allRooms.filter(r => r.id !== id)
    }))
);
