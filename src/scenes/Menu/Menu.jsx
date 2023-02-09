import React from 'react'

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
    return (
        <div className="menu-wrapper">
            <div className="header">
                <h1>Меню</h1>
                <img src={searchIcon} alt="search" />
            </div>
            <div className="categories">
                {mockCategories.map(cat => <div className="category">{cat}</div>)}
            </div>
            <div className="dishes">
                {mockDishes.map(dish => (
                    <DishCard title={dish} img={pizzaImg} />
                ))}
            </div>
        </div>
    )
}
