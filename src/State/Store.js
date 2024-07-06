// import { configureStore } from '@reduxjs/toolkit';
// import reducer from './Reducer';

// const store = configureStore({
//   reducer: {
//     quiz: reducer
//   }
// });

// export default store;


// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import reducer from './Reducer';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';

// // persistConfig: Configuration object for redux-persist.
// // key: Key under which the persisted state will be stored.
// // version: Version of the persisted state.
// // storage: Specifies the storage engine to use local storage.

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// };

// const rootReducer = combineReducers({
//   quiz: reducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });



// export default store;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import Reducer from './Reducer'; 
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};


const rootReducer = combineReducers({
  quiz: persistReducer(persistConfig, Reducer),
});

const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export default store;
