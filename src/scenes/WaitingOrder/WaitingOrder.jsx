import React from 'react'
import { useNavigate } from 'react-router'
import 'styles/WaitingOrder.scss'

import arrowLeftIcon from 'styles/icons/arrow_left.png'
import waitingImg from 'styles/img/waiting.png'

export function WaitingOrder() {
    const navigate = useNavigate()

    return (
        <div>
            <div className="header">
                <button type="button" onClick={() => navigate('/cart')}>
                    <img src={arrowLeftIcon} alt="back" />
                </button>
                <h1>Заказ</h1>
            </div>
            <h1>Ваш заказ готовится...</h1>
            <div className="img-wrapper">
                <img src={waitingImg} alt="waiting" />
            </div>
        </div>
    )
}
