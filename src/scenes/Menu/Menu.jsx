import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import 'styles/Menu.scss'
import debounce from 'lodash.debounce'
import isEmpty from 'lodash/isEmpty'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import searchIcon from 'styles/icons/search.png'
import arrowLeftIcon from 'styles/icons/arrow_left.png'
import { changeViewMode } from 'redux/actions'
import { VIEW_MODE_TYPES } from 'redux/reducers'

import { DishCard } from './DishCard'

const SEARCH_MIN_LENGTH = 2
const SEARCH_DELAY_IN_MILLISECONDS = 300

export function Menu() {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const viewMode = useSelector(state => state.viewMode)
    const dishes = useSelector(state => state.menuDishes)
    const categories = useSelector(state => state.menuCategories)

    const [activeCategories, setActiveCategories] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [dishesBySearchValue, setDishesBySearchValue] = useState([])

    const dishesByCategory = useMemo(() => {
        if (activeCategories.length > 0) {
            return dishes.filter(dish => activeCategories.includes(dish.category))
        }

        return dishes
    }, [activeCategories, dishes])

    const handleSearch = debounce(
        () => {
            if (searchValue.length > SEARCH_MIN_LENGTH) {
                setDishesBySearchValue(
                    dishes.filter(dish => dish.name.toLowerCase().includes(searchValue.toLowerCase())),
                )
            } else if (!searchValue) {
                setDishesBySearchValue([])
            }
        },
        SEARCH_DELAY_IN_MILLISECONDS,
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { handleSearch() }, [searchValue])

    const handleExitSearch = () => {
        dispatch(changeViewMode(VIEW_MODE_TYPES.default))
        setSearchValue('')
        setDishesBySearchValue([])
    }

    const redirectToCart = () => {
        navigate('/cart')
    }

    if (viewMode === VIEW_MODE_TYPES.search) {
        return (
            <div className="menu-wrapper">
                <div className="search-wrapper">
                    <div className="input-line">
                        <button type="button" onClick={handleExitSearch}>
                            <img src={arrowLeftIcon} alt="back" />
                        </button>
                        <input
                            className={classNames('search-input', { filled: searchValue.length > 0 })}
                            type="text"
                            placeholder="Поиск"
                            value={searchValue}
                            onChange={(e) => { setSearchValue(e.target.value) }}
                        />
                    </div>
                    {dishesBySearchValue.length > 0 ? (
                        <div className="dishes">
                            {dishesBySearchValue.map(dish => (
                                <DishCard
                                    key={dish.id}
                                    dish={dish}
                                    cart={cart}
                                />
                            ))}
                        </div>
                    ) : <div className="filtered-dishes-placeholder"><p>Введите название блюда</p></div>}
                    {!isEmpty(cart) && (
                        <div className="footer">
                            <button type="button" onClick={redirectToCart}>
                                <span>В корзину</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="menu-wrapper">
            <div className="header">
                <h1>Меню</h1>
                <button onClick={() => { dispatch(changeViewMode(VIEW_MODE_TYPES.search)) }} type="button">
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
            <div className="dishes">
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
