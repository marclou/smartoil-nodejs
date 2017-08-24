import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { changeUserIsFirstLaunch } from '../actions';
import { Spinner } from '../components/functionalComponents';

class Splash extends Component {

    componentDidMount() {
        this.checkLoggedInt();
    }

    checkLoggedInt() {
        AsyncStorage.getItem('isFirstLaunch').then((value) => {
            const routeName = JSON.parse(value) ? 'Initial' : 'Main';

            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [{ type: NavigationActions.NAVIGATE, routeName: routeName }],
                key: null
            });

            this.props.changeUserIsFirstLaunch(JSON.parse(value));
            this.props.navigation.dispatch(resetAction);
        });
    }

    render() {
        return (
                <Spinner />
            );
    }
}

export default connect(null, { changeUserIsFirstLaunch })(Splash);
