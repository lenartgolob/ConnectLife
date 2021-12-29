import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import kitchenReducer from './reducers';

const rootReducer = combineReducers({ kitchenReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));