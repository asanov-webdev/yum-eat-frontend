import React from 'react'
import 'styles/WelcomePage.scss'

export function WelcomePage() {
    return (
        <div className="wrapper">
            <div className="info-block">
                <h1 className="app-title app-title-primary">Yum-eat</h1>
                <h2 className="app-title app-title-secondary">Food location</h2>
                <p className="table-info">Ваш столик №17</p>
            </div>
        </div>
    )
}
