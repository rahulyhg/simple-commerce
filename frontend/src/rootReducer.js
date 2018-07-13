import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as flashReducer } from 'redux-flash'
import CartReducer from './Components/Pages/Cart/reducer';
import User from "./Components/Pages/User/reducer";
import { CategoriesReducer, BrandsReducer } from "./Components/Pages/Products/CategoriesReducer";

// import your Module reducers here and combine them

const rootReducer = combineReducers({
    CartReducer,
    User,
    Categories: CategoriesReducer,
    Brands: BrandsReducer,
    flash: flashReducer,
    router: routerReducer
});

export default rootReducer;
