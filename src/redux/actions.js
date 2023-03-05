export const addDishToCart = dishId => ({
    type: 'ADD_DISH_TO_CART',
    payload: { dishId },
})

export const removeDishFromCart = dishId => ({
    type: 'REMOVE_DISH_FROM_CART',
    payload: { dishId },
})

export const removeAllDishEntriesFromCart = dishId => ({
    type: 'REMOVE_ALL_DISH_ENTRIES_FROM_CART',
    payload: { dishId },
})

export const cleanCart = () => ({
    type: 'CLEAN_CART',
})

export const initializeMenu = (dishes, categories) => ({
    type: 'INITIALIZE_MENU',
    payload: { dishes, categories },
})

export const setInfoDish = dish => ({
    type: 'SET_INFO_DISH',
    payload: { dish },
})
