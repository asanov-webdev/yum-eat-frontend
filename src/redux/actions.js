export const addDishToCart = dishId => ({
    type: 'ADD_DISH_TO_CART',
    payload: { dishId },
})

export const removeDishFromCart = dishId => ({
    type: 'REMOVE_DISH_FROM_CART',
    payload: { dishId },
})

export const changeViewMode = viewMode => ({
    type: 'CHANGE_VIEW_MODE',
    payload: { viewMode },
})

export const initializeMenu = (dishes, categories) => ({
    type: 'INITIALIZE_MENU',
    payload: { dishes, categories },
})
