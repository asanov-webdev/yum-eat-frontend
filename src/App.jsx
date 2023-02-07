import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { Menu } from './scenes/Menu/Menu'
import './App.css'
import { WelcomePage } from './scenes/WelcomePage/WelcomePage'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/menu" component={Menu} />
                <Route path="/" component={WelcomePage} />
            </Switch>
        </Router>
    )
}

export default App
