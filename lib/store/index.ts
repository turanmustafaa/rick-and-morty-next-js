import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './characterSlice';
import locationReducer from './locationSlice';
import episodeReducer from './episodeSlice';
import selectedReducer from './selectedSlice';

const store = configureStore({
  reducer: {
    character: characterReducer,
    location: locationReducer,
    episode: episodeReducer,
    selected: selectedReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
