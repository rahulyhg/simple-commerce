import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

import rootReducer from './rootReducer';

export const history = createHistory();

const appRouterMiddleware = routerMiddleware(history);

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() , applyMiddleware(appRouterMiddleware));

export default store;
