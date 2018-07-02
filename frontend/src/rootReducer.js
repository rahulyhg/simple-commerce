import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import HomeReducer from './Components/Pages/Home/HomeReducer';

// import your Module reducers here and combine them

const rootReducer = combineReducers({
    HomeReducer,
    router: routerReducer
});

export default rootReducer;
