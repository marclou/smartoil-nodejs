import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { configureStore } from './Store';
import RouterComponent from './Router';

class App extends Component {
    render() {
        const store = configureStore();

        return (
            <Provider store={store}>
                <RouterComponent />
            </Provider>
        );
    }
}

export default App;
