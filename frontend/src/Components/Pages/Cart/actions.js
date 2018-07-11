export const incrementProduct = (product) => ({
    type: 'INCREMENT_PRODUCT',
    product
});

export const decrementProduct = (product) => ({
    type: 'DECREMENT_PRODUCT',
    product
});

export const updateCart = () => ({
    type: 'UPDATE_CART'
});

export const flushCart = () => ({
    type: 'FLUSH_CART'
});