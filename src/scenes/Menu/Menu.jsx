import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import 'styles/Menu.scss'
import debounce from 'lodash.debounce'

import pizzaImg from 'styles/img/pizza.png'
import searchIcon from 'styles/icons/search.png'

import { DishCard } from './DishCard'

const SEARCH_MIN_LENGTH = 2
const SEARCH_DELAY_IN_MILLISECONDS = 300

export function Menu({ location }) {
    const { dishesObj } = location.state

    const [value, setValue] = useState({
        categories: [],
        dishes: [],
    })

    useEffect(() => {
        const categories = dishesObj.categories.map((cat => cat.name))
        const dishes = []

        dishesObj.categories.forEach((cat) => {
            cat.dishes.forEach((dish) => {
                const formattedDish = {
                    id: dish.id,
                    name: dish.name,
                    category: cat.name,
                    priceInRubles: dish.sizes[0].price || 0,
                    imgUrl: dish.sizes[0].imageUrl,
                }

                dishes.push(formattedDish)
            })
        })

        setValue({ categories, dishes })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [activeCategories, setActiveCategories] = useState([])
    const [cart, setCart] = useState({})
    const [isInSearchMode, setIsInSearchMode] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [dishesBySearchValue, setDishesBySearchValue] = useState([])

    const dishesByCategory = useMemo(() => {
        if (activeCategories.length > 0) {
            return value.dishes.filter(dish => activeCategories.includes(dish.category))
        }

        return value.dishes
    }, [activeCategories, value.dishes])

    const handleSearch = debounce(
        () => {
            if (searchValue.length > SEARCH_MIN_LENGTH) {
                setDishesBySearchValue(
                    value.dishes.filter(dish => dish.name.toLowerCase().includes(searchValue.toLowerCase())),
                )
            } else if (!searchValue) {
                setDishesBySearchValue([])
            }
        },
        SEARCH_DELAY_IN_MILLISECONDS,
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { handleSearch() }, [searchValue])

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
            totalPrice += value.dishes.find(dish => dish.id == id).priceInRubles * amount
        })

        return totalPrice
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    const handleExitSearch = () => {
        setIsInSearchMode(false)
        setSearchValue('')
        setDishesBySearchValue([])
    }

    if (isInSearchMode) {
        return (
            <div className="menu-wrapper">
                <button type="button" onClick={handleExitSearch}>Назад</button>
                <input type="text" placeholder="Поиск" onChange={(e) => { setSearchValue(e.target.value) }} />
                {dishesBySearchValue.length > 0 ? (
                    <div className="dishes">
                        {dishesBySearchValue.map(dish => (
                            <DishCard
                                key={dish.id}
                                id={dish.id}
                                name={dish.name}
                                img={pizzaImg}
                                cart={cart}
                                onAdd={addDishToCart}
                                onRemove={removeDishFromCart}
                            />
                        ))}
                    </div>
                ) : <p>Введите название блюда</p>}
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

    return (
        <div className="menu-wrapper">
            <div className="header">
                <h1>Меню</h1>
                <button onClick={() => { setIsInSearchMode(true) }} type="button">
                    <img src={searchIcon} alt="search" />
                </button>

            </div>
            <div className="categories">
                {value.categories.map(cat => (
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
                {dishesByCategory.map(dish => (
                    <DishCard
                        key={dish.id}
                        id={dish.id}
                        name={dish.name}
                        img={dish.imgUrl}
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

Menu.propTypes = {
    location: PropTypes.object,
}
