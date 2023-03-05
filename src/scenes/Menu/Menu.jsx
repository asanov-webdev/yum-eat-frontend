import React, { useMemo, useState } from 'react'
import classNames from 'classnames'
import 'styles/Menu.scss'
import isEmpty from 'lodash/isEmpty'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import searchIcon from 'styles/icons/search.png'

import { DishCard } from './DishCard'

export function Menu() {
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const dishes = useSelector(state => state.menuDishes)
    const categories = useSelector(state => state.menuCategories)

    const [activeCategories, setActiveCategories] = useState([])

    const dishesByCategory = useMemo(() => {
        if (activeCategories.length > 0) {
            return dishes.filter(dish => activeCategories.includes(dish.category))
        }

        return dishes
    }, [activeCategories, dishes])

    const redirectToCart = () => {
        navigate('/cart')
    }

    const redirectToSearch = () => {
        navigate('/search')
    }

    return (
        <div className="menu-wrapper">
            <div className="header">
                <h1>Меню</h1>
                <button
                    onClick={() => { redirectToSearch() }}
                    type="button"
                >
                    <img src={searchIcon} alt="search" />
                </button>

            </div>
            <div className="categories">
                {categories.map(cat => (
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
            <div className={classNames(
                'dishes',
                {
                    'dishes-with-low-footer': dishesByCategory.length > 4 && !isEmpty(cart),
                    'dishes-with-footer': dishesByCategory.length > 4,
                },
            )}
            >
                {dishesByCategory.map(dish => (
                    <DishCard
                        key={dish.id}
                        dish={dish}
                        cart={cart}
                    />
                ))}
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
