import { applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger'
import covid from './covid.reducer'

const rootReducer = combineReducers({
    covid,
}, () => applyMiddleware(logger));

export default rootReducer;