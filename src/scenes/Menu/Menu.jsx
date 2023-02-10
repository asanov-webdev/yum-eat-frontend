import React, { useState } from 'react'
import classNames from 'classnames'

import 'styles/Menu.scss'
import pizzaImg from 'styles/img/pizza.png'
import searchIcon from 'styles/icons/search.png'

import { DishCard } from './DishCard'

const mockCategories = ['Супы', 'Салаты', 'Пицца', 'Напитки']
const mockDishes = [
    'Название пиццы',
    'Название пиццы',
    'Название пиццы',
    'Название пиццы',
    'Название пиццы',
    'Название пиццы',
]

export function Menu() {
    const [activeCategories, setActiveCategories] = useState([])

    return (
        <div className="menu-wrapper">
            <div className="header">
                <h1>Меню</h1>
                <img src={searchIcon} alt="search" />
            </div>
            <div className="categories">
                {mockCategories.map(cat => (
                    <div
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
                {mockDishes.map(dish => (
                    <DishCard title={dish} img={pizzaImg} />
                ))}
            </div>
        </div>
    )
}
