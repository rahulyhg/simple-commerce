export const fetchCategories = (categories) => ({
    type: 'FETCH_CATEGORIES',
    categories
})

export const updateCategory = (category) => ({
    type: 'UPDATE_CATEGORY',
    category
})

export const addCategory = (category) => ({
    type: 'ADD_CATEGORY',
    category
})

export const removeCategory = (category) => ({
    type: 'REMOVE_CATEGORY',
    category
})