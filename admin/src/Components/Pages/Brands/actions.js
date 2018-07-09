export const fetchBrands = (brands) => ({
    type: 'FETCH_BRANDS',
    brands
})

export const updateBrand = (brand) => ({
    type: 'UPDATE_BRAND',
    brand
})

export const addBrand = (brand) => ({
    type: 'ADD_BRAND',
    brand
})

export const removeBrand = (brand) => ({
    type: 'REMOVE_BRAND',
    brand
})