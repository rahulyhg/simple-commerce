const HomeReducer = (state = {}, action) => {
    if (action.type === 'UPDATE_CATEGORIES'){
        return {
            ...state,
            categories: action.categories
        }
    }

    if(action.type === 'UPDATE_PRODUCTS'){
        return {
            ...state,
            products: action.products
        }
    }

    return state;
}

export default HomeReducer;