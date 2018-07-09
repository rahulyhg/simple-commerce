import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import User from './Components/User/reducer';
import Categories from './Components/Pages/Categories/reducer';
import Brands from './Components/Pages/Brands/reducer';
// import your Module reducers here and combine them

const rootReducer = combineReducers({
    User,
    Categories,
    Brands,
    router: routerReducer
});

export default rootReducer;
