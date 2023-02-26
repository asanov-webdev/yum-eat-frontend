import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Cart } from 'scenes/Cart/Cart'
import { Menu } from 'scenes/Menu/Menu'
import { WelcomePage } from 'scenes/WelcomePage/WelcomePage'
import store from 'redux/store'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/" element={<WelcomePage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App
