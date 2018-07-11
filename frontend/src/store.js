import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { middleware as flashMiddleware } from 'redux-flash'

import rootReducer from './rootReducer';

export const history = createHistory();

const appRouterMiddleware = routerMiddleware(history);

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(appRouterMiddleware, flashMiddleware()))
export const persistor = persistStore(store);

export default store;
