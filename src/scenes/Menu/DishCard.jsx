import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import classNames from 'classnames'

import noImg from 'styles/img/no_img.png'
import 'styles/Menu.scss'
import { addDishToCart, changeViewMode, removeDishFromCart } from 'redux/actions'
import { VIEW_MODE_TYPES } from 'redux/reducers'

export function DishCard({ dish, cart }) {
    const dispatch = useDispatch()

    const { id, name, priceInRubles, imgUrl } = dish

    const amount = useMemo(() => {
        if (cart[id]) {
            return cart[id]
        }

        return 0
    }, [id, cart])

    return (
        <div className="dish-wrapper">
            <div className="dish">
                <div className="click-wrapper" onClick={() => { dispatch(changeViewMode(VIEW_MODE_TYPES.dishInfo)) }}>
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
}
