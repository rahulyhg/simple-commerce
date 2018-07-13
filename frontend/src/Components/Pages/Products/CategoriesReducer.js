export const CategoriesReducer = (state = [], action) => {
    if (action.type === 'UPDATE_CATEGORIES'){
        return action.categories;
    }

    return state;
}

export const BrandsReducer = (state = [], action) => {
    if (action.type === 'UPDATE_BRANDS') {
        return action.brands;
    }

    return state;
}