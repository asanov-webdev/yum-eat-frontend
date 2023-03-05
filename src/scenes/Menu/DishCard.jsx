import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import deleteIcon from 'styles/icons/delete.png'
import noImg from 'styles/img/no_img.png'
import 'styles/Menu.scss'
import { addDishToCart, removeAllDishEntriesFromCart, removeDishFromCart, setInfoDish } from 'redux/actions'

export function DishCard({ dish, cart, inCart }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id, name, priceInRubles, imgUrl } = dish

    const amount = useMemo(() => {
        if (cart[id]) {
            return cart[id]
        }

        return 0
    }, [id, cart])

    const redirectToDishInfo = () => {
        navigate('/info')
    }

    if (inCart) {
        return (
            <div className="dish-wrapper">
                <div className="dish">
                    <img src={imgUrl || noImg} alt={name} />
                    <div className="top-bottom-wrapper">
                        <div className="card-top">
                            <h4>{name}</h4>
                            <button type="button" onClick={() => { dispatch(removeAllDishEntriesFromCart(id)) }} className="delete-btn">
                                <img src={deleteIcon} alt="delete" />
                            </button>
                        </div>
                        <div className="card-bottom">
                            <button className="change-amount-btn" type="button">
                                <RemoveIcon onClick={() => { dispatch(removeDishFromCart(id)) }} />
                                <span className={classNames('amount', { 'amount-bold': amount > 0 })}>{amount}</span>
                                <AddIcon onClick={() => { dispatch(addDishToCart(id)) }} />
                            </button>
                            <h4 className="price">
                                {priceInRubles * amount}
                                {' '}
                                руб.
                            </h4>
                        </div>
                    </div>

                </div>
                {amount > 0 && <div className="bottom-border" />}
            </div>
        )
    }

    return (
        <div className="dish-wrapper">
            <div className="dish">
                <div
                    className="click-wrapper"
                    onClick={() => {
                        dispatch(setInfoDish(dish))
                        redirectToDishInfo()
                    }}
                >
                    <img src={imgUrl || noImg} alt={name} />
                    <h4>{name}</h4>
                    <h4>
                        {priceInRubles}
                        {' '}
                        руб.
                    </h4>
                </div>
                <button className="change-amount-btn" type="button">
                    <RemoveIcon onClick={() => { dispatch(removeDishFromCart(id)) }} />
                    <span className={classNames('amount', { 'amount-bold': amount > 0 })}>{amount}</span>
                    <AddIcon onClick={() => { dispatch(addDishToCart(id)) }} />
                </button>
            </div>
            {amount > 0 && <div className="bottom-border" />}
        </div>
    )
}

DishCard.propTypes = {
    dish: PropTypes.object,
    cart: PropTypes.object,
    inCart: PropTypes.bool,
}
