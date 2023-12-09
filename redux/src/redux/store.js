import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { userReducer } from './user/reducer';
import { notesReducer } from './notes/reducer';
const rootReducer = combineReducers(
    {
        user: userReducer,
        notes: notesReducer
    }
)
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))
export default store
export const persistor = persistStore(store)