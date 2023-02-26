export const VIEW_MODE_TYPES = {
    default: 'default',
    search: 'search',
    dishInfo: 'dishInfo',
}

const initialState = {
    cart: {},
    viewMode: VIEW_MODE_TYPES.default,
    menuDishes: [],
    menuCategories: [],
}

const menuReducer = (state = initialState, action = {}) => {
    const newCart = { ...state.cart }
    const { dishId, viewMode } = action.payload || {}

    switch (action.type) {
        case 'ADD_DISH_TO_CART':
            if (newCart[dishId]) {
                newCart[dishId] += 1
            } else {
                newCart[dishId] = 1
            }

            return { ...state, cart: newCart }

        case 'REMOVE_DISH_FROM_CART':
            if (newCart[dishId] && newCart[dishId] > 0) {
                newCart[dishId] -= 1

                if (newCart[dishId] === 0) {
                    delete newCart[dishId]
                }
            }

            return { ...state, cart: newCart }

        case 'CHANGE_VIEW_MODE':
            return { ...state, viewMode }

        case 'INITIALIZE_MENU':
            return { ...state, menuDishes: action.payload.dishes, menuCategories: action.payload.categories }

        default:
            return state
    }
}

export default menuReducer
