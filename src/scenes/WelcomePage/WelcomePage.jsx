import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import 'styles/WelcomePage.scss'
import { useDispatch } from 'react-redux'

import { initializeMenu } from 'redux/actions'

import { DISHES_ENDPOINT, WELCOME_PAGE_WAITING_TIME_IN_SECONDS } from './constants'

export function WelcomePage() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [waitingTimePassed, setWaitingTimePassed] = useState(false)
    const [dataIsLoaded, setDataIsLoaded] = useState(false)

    const timeStart = new Date()

    // Получение данных по блюдам и категориям с сервера
    const getApiData = async () => {
        const response = await fetch(`${DISHES_ENDPOINT}/6/307124b5-b66b-4414-968d-7fa07f9d41d5`)
        const data = await response.json()

        const categories = data.categories.map((cat => cat.name))
        const dishes = []

        data.categories.forEach((cat) => {
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

        dispatch(initializeMenu(dishes, categories))

        setDataIsLoaded(true)
    }

    useEffect(() => {
        getApiData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date()

            const diffInSeconds = Math.abs(currentTime.getTime() - timeStart.getTime()) / 1000

            if (diffInSeconds > WELCOME_PAGE_WAITING_TIME_IN_SECONDS) {
                setWaitingTimePassed(true)
            }
        }, 1000)

        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (dataIsLoaded && waitingTimePassed) {
        navigate('/menu')
        // pathname: '/menu',
        // state: { dishesObj },
    }

    return (
        <div className="welcome-wrapper">
            <div className="info-block">
                <h1 className="app-title app-title-primary">Yum-eat</h1>
                <h2 className="app-title app-title-secondary">Food location</h2>
                <p className="table-info">Ваш столик №17</p>
                <div className="loader-wrapper">
                    <CircularProgress />
                </div>
            </div>
        </div>
    )
}
