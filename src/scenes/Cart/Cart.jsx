import React, { useMemo, useState } from 'react'
import classNames from 'classnames'
import { CircularProgress } from '@mui/material'
import 'styles/Cart.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import isEmpty from 'lodash/isEmpty'

import arrowLeftIcon from 'styles/icons/arrow_left.png'
import { DishCard } from 'scenes/Menu/DishCard'
import { cleanCart } from 'redux/actions'
import { useCartTotalPrice } from 'customHooks/useCartTotalPrice'

import { SEND_ORDER_ENDPOINT } from './constants'

export function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const dishes = useSelector(state => state.menuDishes)
    const restaurantId = useSelector(state => state.restaurantId)
    const tableId = useSelector(state => state.tableId)

    const cartTotalPrice = useCartTotalPrice()

    const [sendingData, setSendingData] = useState(false)

    const formattedData = useMemo(() => {
        const orders = []

        Object.entries(cart).forEach(([id, amount]) => {
            const formattedOrder = {
                dish_id: id,
                amount,
            }

            orders.push(formattedOrder)
        })

        return JSON.stringify({ orders })
    }, [cart])

    const sendData = async () => {
        setSendingData(true)

        try {
            const response = await fetch(`${SEND_ORDER_ENDPOINT}/${restaurantId}/${tableId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formattedData,
            })
            const data = await response.json()

            if (data.status_name === 'IN_PROGRESS' || data.status_name === 'SUCCESS') {
                navigate('/waiting')
            }
        } finally {
            setSendingData(false)
            dispatch(cleanCart())
        }
    }

    const cartDishes = useMemo(() => (isEmpty(cart) ? [] : dishes.filter(dish => dish.id in cart)), [cart, dishes])

    return (
        <div className="cart-wrapper">
            {sendingData && (
                <div className="loader-wrapper">
                    <CircularProgress />
                </div>
            )}
            <div className="header">
                <button type="button" onClick={() => navigate('/menu')}>
                    <img src={arrowLeftIcon} alt="back" />
                </button>
                <h1>Заказ</h1>
            </div>
            {cartDishes.length < 1 && <h1 className="empty-cart-line">Корзина пуста</h1>}
            <div className="dishes">
                {cartDishes.map(dish => (
                    <DishCard
                        key={dish.id}
                        dish={dish}
                        cart={cart}
                        inCart
                    />
                ))}
            </div>
            {cartTotalPrice > 0 && (
                <div className={classNames('footer', { 'footer-fixed': cartDishes.length < 7 })}>
                    <button type="button" onClick={sendData}>
                        <span>Заказать</span>
                        <span>{`${cartTotalPrice} руб.`}</span>
                    </button>
                </div>
            )}
        </div>
    )
}
