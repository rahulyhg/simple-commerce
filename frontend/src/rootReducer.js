import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import CartReducer from './Components/Pages/Cart/reducer';
import User from "./Components/Pages/User/reducer";

// import your Module reducers here and combine them

const rootReducer = combineReducers({
    CartReducer,
    User,
    router: routerReducer
});

export default rootReducer;
