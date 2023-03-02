import React, { useMemo, useState } from 'react'
import { CircularProgress } from '@mui/material'
import 'styles/Cart.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import isEmpty from 'lodash/isEmpty'

import arrowLeftIcon from 'styles/icons/arrow_left.png'
import { DishCard } from 'scenes/Menu/DishCard'

import { SEND_ORDER_ENDPOINT } from './constants'

export function Cart() {
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const dishes = useSelector(state => state.menuDishes)

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

    const cartTotalPrice = useMemo(() => {
        let totalPrice = 0

        Object.entries(cart).forEach(([id, amount]) => {
            // eslint-disable-next-line eqeqeq
            totalPrice += dishes.find(dish => dish.id == id).priceInRubles * amount
        })

        return totalPrice
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    const sendData = async () => {
        setSendingData(true)

        try {
            const response = await fetch(SEND_ORDER_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formattedData,
            })
            const data = await response.json()

            if (data.status_name === 'IN_PROGRESS') {
                navigate('/waiting')
            }
        } finally {
            setSendingData(false)
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
                <div className="footer">
                    <button type="button" onClick={sendData}>
                        <span>Заказать</span>
                        <span>{`${cartTotalPrice} руб.`}</span>
                    </button>
                </div>
            )}
        </div>
    )
}
