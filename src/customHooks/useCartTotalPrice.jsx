import { useSelector } from 'react-redux'

export const useCartTotalPrice = () => {
    const cart = useSelector(state => state.cart)
    const dishes = useSelector(state => state.menuDishes)

    let totalPrice = 0

    Object.entries(cart).forEach(([id, amount]) => {
        // eslint-disable-next-line eqeqeq
        totalPrice += dishes.find(dish => dish.id == id).priceInRubles * amount
    })

    return totalPrice
}
