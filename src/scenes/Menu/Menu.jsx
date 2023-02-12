import React, { useMemo, useState } from 'react'
import classNames from 'classnames'

import 'styles/Menu.scss'
import pizzaImg from 'styles/img/pizza.png'
import searchIcon from 'styles/icons/search.png'

import { DishCard } from './DishCard'
import { mockCategories, mockDishes } from './mock'

export function Menu() {
    const [activeCategories, setActiveCategories] = useState([])
    const [cart, setCart] = useState({})

    const currentDishes = useMemo(() => {
        if (activeCategories.length > 0) {
            return mockDishes.filter(dish => activeCategories.includes(dish.category))
        }

        return mockDishes
    }, [activeCategories])

    const addDishToCart = (dishId) => {
        const newCart = { ...cart }

        if (newCart[dishId]) {
            newCart[dishId] += 1
        } else {
            newCart[dishId] = 1
        }

        setCart(newCart)
    }

    const removeDishFromCart = (dishId) => {
        const newCart = { ...cart }

        if (newCart[dishId] && newCart[dishId] > 0) {
            newCart[dishId] -= 1
            setCart(newCart)
        }
    }

    const cartTotalPrice = useMemo(() => {
        let totalPrice = 0

        Object.entries(cart).forEach(([id, amount]) => {
            // eslint-disable-next-line eqeqeq
            totalPrice += mockDishes.find(dish => dish.id == id).priceInRubles * amount
        })

        return totalPrice
    }, [cart])

    return (
        <div className="menu-wrapper">
            <div className="header">
                <h1>Меню</h1>
                <img src={searchIcon} alt="search" />
            </div>
            <div className="categories">
                {mockCategories.map(cat => (
                    <div
                        key={cat}
                        className={classNames('category', { 'category-active': activeCategories.includes(cat) })}
                        onClick={() => {
                            if (activeCategories.includes(cat)) {
                                setActiveCategories(activeCategories.filter(c => c !== cat))
                            } else {
                                setActiveCategories([...activeCategories, cat])
                            }
                        }}
                    >
                        {cat}
                    </div>
                ))}
            </div>
            <div className="dishes">
                {currentDishes.map(dish => (
                    <DishCard
                        key={dish.id}
                        id={dish.id}
                        title={dish.title}
                        img={pizzaImg}
                        cart={cart}
                        onAdd={addDishToCart}
                        onRemove={removeDishFromCart}
                    />
                ))}
            </div>
            {cartTotalPrice > 0 && (
                <div className="footer">
                    <button type="button">
                        <span>Корзина</span>
                        <span>{`${cartTotalPrice} руб.`}</span>
                    </button>
                </div>
            )}
        </div>
    )
}
