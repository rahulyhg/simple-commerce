const CartReducer = (state = [], action) => {
    if(action.type === 'CART_ADD_PRODUCT'){
        return addProduct(state, action);
    }
    return state;
}

const addProduct = (state, action) => {
    let index = state.findIndex((item) => item.product.id === action.product.id);
    if (index === -1) {
        let item = {
            qty: 1,
            product: action.product
        };

        return [
            ...state,
            item
        ];
    }

    let item = state[index];
    item.qty++;
    return [
        ...state.slice(0, index),
        item,
        ...state.slice(index+1)
    ]
}

export default CartReducer;