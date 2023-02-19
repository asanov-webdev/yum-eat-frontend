import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import classNames from 'classnames'

import noImg from 'styles/img/no_img.png'
import 'styles/Menu.scss'

export function DishCard({ dish, cart, onAdd, onRemove, onDishClick }) {
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
                <div className="click-wrapper" onClick={() => { onDishClick(dish) }}>
                    <img src={imgUrl || noImg} alt={name} />
                    <h4>{name}</h4>
                    <h4>
                        {priceInRubles}
                        {' '}
                        руб.
                    </h4>
                </div>
                <button className="change-amount-btn" type="button">
                    <RemoveIcon onClick={() => { onRemove(id) }} />
                    <span className={classNames('amount', { 'amount-bold': amount > 0 })}>{amount}</span>
                    <AddIcon onClick={() => { onAdd(id) }} />
                </button>
            </div>
            {amount > 0 && <div className="bottom-border" />}
        </div>
    )
}

DishCard.propTypes = {
    dish: PropTypes.object,
    cart: PropTypes.object,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onDishClick: PropTypes.func,
}
