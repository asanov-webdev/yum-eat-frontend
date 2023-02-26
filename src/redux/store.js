import { configureStore } from '@reduxjs/toolkit'

import menuReducer from './reducers'

const store = configureStore({ reducer: menuReducer })

export default store
