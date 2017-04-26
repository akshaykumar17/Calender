import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
// import { routerMiddleware } from 'react-router-redux';
import rootSaga from './sagas';
import { fromJS } from 'immutable';


export default function configureStore(initialState = {}) {

    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [
        sagaMiddleware
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
    ];

    // If Redux DevTools Extension is installed use it
    // otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
            typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
    /* eslint-enable */

    const store = createStore(
        reducer,
        fromJS(initialState),
        composeEnhancers(...enhancers)
    );

    sagaMiddleware.run(rootSaga)

    return store

}