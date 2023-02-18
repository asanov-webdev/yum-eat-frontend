import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

import 'styles/WelcomePage.scss'
import { DISHES_ENDPOINT, WELCOME_PAGE_WAITING_TIME_IN_SECONDS } from './constants'

export function WelcomePage() {
    const [dishesObj, setDishesObj] = useState()
    const [waitingTimePassed, setWaitingTimePassed] = useState(false)

    const timeStart = new Date()

    const getApiData = async () => {
        const response = await fetch(DISHES_ENDPOINT).then(response => response.json())

        setDishesObj(response)
    }

    useEffect(() => {
        getApiData()
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

    if (dishesObj && waitingTimePassed) {
        return (
            <Redirect to={{
                pathname: '/menu',
                state: { dishesObj },
            }}
            />
        )
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
