/* eslint no-underscore-dangle: "off" */

import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import apiCallMiddleware from 'middlewares/apiCallMiddleware'
import payloadMiddleware from 'middlewares/payloadMiddleware'
import { history } from 'utils'
import reducers from './reducers'


const routerReduxMiddleware = routerMiddleware(history)
const middleware = [
  thunk,
  routerReduxMiddleware,
  apiCallMiddleware,
  payloadMiddleware,
]

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }
}

const configureStore = () => {
  const store = createReduxStore(
    reducers,
    composeEnhancers(
      applyMiddleware(...middleware),
    ),
  )

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducers)
    })
  }

  if (process.env.NODE_ENV === 'development') {
    window.store = store
  }

  return store
}

export default configureStore
