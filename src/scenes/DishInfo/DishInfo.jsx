import React from 'react'
import { useNavigate } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import 'styles/Menu.scss'
import { useSelector } from 'react-redux'

import { mockDishDescription } from 'scenes/Menu/mock'

export function DishInfo() {
    const navigate = useNavigate()

    const infoDish = useSelector(state => state.infoDish)
    const cart = useSelector(state => state.cart)

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
                <p className="text-bold">
                    Ингредиенты, калорийность, БЖУ
                </p>
            </div>
            {!isEmpty(cart) && (
                <div className="footer">
                    <button type="button" onClick={redirectToCart}>
                        <span>В корзину</span>
                    </button>
                </div>
            )}
        </div>
    )
}
