import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import HomeReducer from './Components/Pages/Home/HomeReducer';
import CartReducer from './Components/Pages/Cart/reducer';

// import your Module reducers here and combine them

const rootReducer = combineReducers({
    HomeReducer,
    CartReducer,
    router: routerReducer
});

export default rootReducer;
