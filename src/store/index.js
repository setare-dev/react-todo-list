import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todoRedcer from './slices/toDoSlice'


import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducer = combineReducers({
    todos: todoRedcer

})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['todos'] // only navigation will be persisted

}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
})

const persistor = persistStore(store)

export { store, persistor };