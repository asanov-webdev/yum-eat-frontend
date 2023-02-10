import React, { useMemo, useState } from 'react'
import classNames from 'classnames'

import 'styles/Menu.scss'
import pizzaImg from 'styles/img/pizza.png'
import searchIcon from 'styles/icons/search.png'

import { DishCard } from './DishCard'

const mockCategories = ['Супы', 'Салаты', 'Пицца', 'Напитки']
const mockDishes = [
    { title: 'Название пиццы', category: 'Пицца', priceInRubles: 319 },
    { title: 'Название пиццы', category: 'Пицца', priceInRubles: 319 },
    { title: 'Название пиццы', category: 'Пицца', priceInRubles: 319 },
    { title: 'Название пиццы', category: 'Пицца', priceInRubles: 319 },
    { title: 'Название пиццы', category: 'Пицца', priceInRubles: 319 },
    { title: 'Название пиццы', category: 'Пицца', priceInRubles: 319 },
]

export function Menu() {
    const [activeCategories, setActiveCategories] = useState([])

    const currentDishes = useMemo(() => {
        if (activeCategories.length > 0) {
            return mockDishes.filter(dish => activeCategories.includes(dish.category))
        }

        return mockDishes
    }, [activeCategories])

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
                {currentDishes.map(dish => (
                    <DishCard title={dish.title} img={pizzaImg} />
                ))}
            </div>
        </div>
    )
}
