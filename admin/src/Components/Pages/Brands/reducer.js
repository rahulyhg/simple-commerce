const Brands = (state = [], action) => {
    if(action.type === 'FETCH_BRANDS'){
        if (typeof action.brands === 'undefined'){
            return state;
        }
        return action.brands;
    }

    if(action.type === 'ADD_BRAND'){
        return [
            ...state,
            action.brand
        ];
    }

    if(action.type === 'UPDATE_BRAND'){
        let index = state.findIndex((item) => item.id === action.brand.id);
        return [
            ...state.slice(0, index),
            action.brand,
            ...state.slice(index+1)
        ];
    }

    if(action.type === 'REMOVE_BRAND'){
        let index = state.findIndex((item) => item.id === action.brand.id);
        return [
            ...state.slice(0, index),
            ...state.slice(index + 1)
        ];
    }

    return state;
}

export default Brands