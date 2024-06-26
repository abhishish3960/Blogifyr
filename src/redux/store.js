// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState
});

// Save the state to localStorage whenever it changes
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
