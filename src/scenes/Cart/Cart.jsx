import React, { useMemo, useState } from 'react'
import { CircularProgress } from '@mui/material'
import 'styles/Cart.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import arrowLeftIcon from 'styles/icons/arrow_left.png'

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

        await fetch(SEND_ORDER_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formattedData,
        }).finally(() => {
            setSendingData(false)
        })
    }

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
            <div className="footer">
                <button type="button" onClick={sendData}>
                    <span>Заказать</span>
                    <span>{`${cartTotalPrice} руб.`}</span>
                </button>
            </div>
        </div>
    )
}
