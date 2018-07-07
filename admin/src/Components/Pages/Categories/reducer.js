const Categories = (state = [], action) => {
    if(action.type === 'FETCH_CATEGORIES'){
        if (typeof action.categories === 'undefined'){
            return state;
        }
        return action.categories;
    }

    if(action.type === 'ADD_CATEGORY'){
        return [
            ...state,
            action.category
        ];
    }

    if(action.type === 'UPDATE_CATEGORY'){
        let index = state.findIndex((item) => item.id === action.category.id);
        return [
            ...state.slice(0, index),
            action.category,
            ...state.slice(index+1)
        ];
    }

    return state;
}

export default Categories