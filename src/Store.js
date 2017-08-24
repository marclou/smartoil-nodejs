import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { composeWithDevTools } from 'remote-redux-devtools';
import createLogger from 'redux-logger';
import _ from 'lodash';

import reducers from './reducers';
import * as LocalStorage from './LocalStorage';

/**
 * Allow the store to same some of his reducers to local storage
 * @param store
 * @param frequency
 */
const subscribeToLocalStorage = (store, frequency) => {
    // We use throttle from lodash library to minimize the call to the saveState() function.
    store.subscribe(_.throttle(() => {
        LocalStorage.saveState({ state: store.getState() });
    }, frequency));
};

const retrieveInitialState = () => {
    return LocalStorage.loadState();
};

export const configureStore = () => {
    const middlewares = [thunk, promise];
    //const INITIAL_STATE = retrieveInitialState();

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger);
    }
    const store = createStore(
        reducers,
        composeWithDevTools(applyMiddleware(...middlewares))
    );

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('./reducers/index').default;

            store.replaceReducer(nextRootReducer);
        });
    }

    //subscribeToLocalStorage(store, 1000);
    return store;
};
