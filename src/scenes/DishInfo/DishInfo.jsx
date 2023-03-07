import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'styles/Menu.scss'
import { useSelector } from 'react-redux'

import { mockDishDescription } from 'scenes/Menu/mock'
import { useCartTotalPrice } from 'customHooks/useCartTotalPrice'

export function DishInfo() {
    const navigate = useNavigate()

    const infoDish = useSelector(state => state.infoDish)

    const cartTotalPrice = useCartTotalPrice()

    const redirectToCart = () => {
        navigate('/cart')
    }

    return (
        <div className="menu-wrapper info-mode">
            <div className="header">
                <h1>Меню</h1>
            </div>
            <div className="info-wrapper">
                <h2>{infoDish.name}</h2>
                <img src={infoDish.imgUrl} alt="img" />
                <p>{infoDish.description || mockDishDescription}</p>
            </div>
            <div className="footer">
                <button type="button" onClick={redirectToCart}>
                    <span>В корзину</span>
                    <span>{`${cartTotalPrice} руб.`}</span>
                </button>
            </div>
        </div>
    )
}
