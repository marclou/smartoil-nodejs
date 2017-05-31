import React, { Component } from 'react';
import { InteractionManager, View } from 'react-native';

import { Spinner } from './functionalComponents';
import GasStationList from './GasStationList';

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
        });
    }

    render() {
        const { containerStyle } = styles;

        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
        return (
            <View style={containerStyle} >
                <GasStationList />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    }
};

export default Result;
