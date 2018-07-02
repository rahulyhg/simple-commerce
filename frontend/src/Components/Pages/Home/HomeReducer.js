const HomeReducer = (state = {}, action) => {
    if (action.type == 'UPDATE_CATEGORIES'){
        return {
            ...state,
            categories: action.categories
        }
    }

    return state;
}

export default HomeReducer;