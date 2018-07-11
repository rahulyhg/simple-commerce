const CartReducer = (state = [], action) => {

    console.log(action.type);

    if (action.type === 'INCREMENT_PRODUCT'){
        let index = findProduct(state, action.product);
        if (index === -1) {
            return addProduct(state, action.product);
        }
        let item = state[index].qty;
        return updateProductQty(state, index, ++item);
    }

    if (action.type === 'DECREMENT_PRODUCT') {
        let index = findProduct(state, action.product);
        let item = state[index].qty;
        return updateProductQty(state, index, --item);
    }

    if(action.type === 'UPDATE_CART'){
        return state.filter((item) => item.qty > 0);
    }

    if (action.type === 'FLUSH_CART'){
        return [];
    }

    return state;
}

const findProduct = (state, product) => {
    return state.findIndex((item) => item.product.id === product.id);
}

const addProduct = (state, product) => {
    let item = {
        qty: 1,
        product: product
    };

    return [
        ...state,
        item
    ];
}

const updateProductQty = (state, index, qty) =>{
    let item = state[index];
    if (parseInt(qty) > -1){
        item.qty = qty
    }
    return [
        ...state.slice(0, index),
        item,
        ...state.slice(index + 1)
    ]
}

export default CartReducer;