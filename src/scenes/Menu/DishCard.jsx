import React, { useState } from 'react'
import PropTypes from 'prop-types'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import 'styles/Menu.scss'
import classNames from 'classnames'

export function DishCard({ title, img }) {
    const [counter, setCounter] = useState(0)

    return (
        <div className="dish-wrapper">
            <div className="dish">
                <img src={img} alt={title} />
                <h4>{title}</h4>
                <button className="change-count-btn" type="button">
                    <RemoveIcon onClick={() => { setCounter(counter > 0 ? counter - 1 : 0) }} />
                    <span className={classNames('count', { 'count-bold': counter > 0 })}>{counter}</span>
                    <AddIcon onClick={() => { setCounter(counter + 1) }} />
                </button>
            </div>
            {counter > 0 && <div className="bottom-border" />}
        </div>
    )
}

DishCard.propTypes = {
    title: PropTypes.string,
    img: PropTypes.any,
}
