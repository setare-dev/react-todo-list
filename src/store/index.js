import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import todoRedcer from './slices/toDoSlice'


import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducer = combineReducers({
    todos: todoRedcer

})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['todos']

}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/PERSIST"],
        },
    }),
})

const persistor = persistStore(store)

export { store, persistor };