import React from 'react'
import PropTypes from 'prop-types'

import 'styles/Menu.scss'

export function DishCard({ title, img }) {
    return (
        <div className="dish-wrapper">
            <div className="dish">
                <img src={img} alt={title} />
                <h4>{title}</h4>
            </div>
            <div className="bottom-border" />
        </div>
    )
}

DishCard.propTypes = {
    title: PropTypes.string,
    img: PropTypes.any,
}
