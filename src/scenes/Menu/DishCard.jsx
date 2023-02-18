import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import 'styles/Menu.scss'
import classNames from 'classnames'

export function DishCard({ id, name, img, cart, onAdd, onRemove }) {
    const amount = useMemo(() => {
        if (cart[id]) {
            return cart[id]
        }

        return 0
    }, [id, cart])

    return (
        <div className="dish-wrapper">
            <div className="dish">
                <img src={img} alt={name} />
                <h4>{name}</h4>
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
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.any,
    cart: PropTypes.object,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
}
