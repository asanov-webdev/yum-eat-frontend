import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import 'styles/Menu.scss'
import isEmpty from 'lodash/isEmpty'
import debounce from 'lodash.debounce'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import arrowLeftIcon from 'styles/icons/arrow_left.png'
import { DishCard } from 'scenes/Menu/DishCard'

const SEARCH_MIN_LENGTH = 2
const SEARCH_DELAY_IN_MILLISECONDS = 300

export function Search() {
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const dishes = useSelector(state => state.menuDishes)

    const [searchValue, setSearchValue] = useState('')
    const [dishesBySearchValue, setDishesBySearchValue] = useState([])

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

    const redirectToMenu = () => {
        navigate('/menu')
    }

    const redirectToCart = () => {
        navigate('/cart')
    }

    const handleExitSearch = () => {
        setSearchValue('')
        setDishesBySearchValue([])
        redirectToMenu()
    }

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
