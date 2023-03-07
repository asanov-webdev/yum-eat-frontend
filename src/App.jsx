import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'

import { Cart } from 'scenes/Cart/Cart'
import { Menu } from 'scenes/Menu/Menu'
import { WelcomePage } from 'scenes/WelcomePage/WelcomePage'
import { WaitingOrder } from 'scenes/WaitingOrder/WaitingOrder'
import { DishInfo } from 'scenes/DishInfo/DishInfo'
import { Search } from 'scenes/Search/Search'
import store from 'redux/store'

function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route path="/:restaurantId/:tableId" element={<WelcomePage />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/info" element={<DishInfo />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/waiting" element={<WaitingOrder />} />
                </Routes>
            </HashRouter>
        </Provider>
    )
}

export default App
