import React, { Component } from 'react';
import { InteractionManager, View } from 'react-native';

import AddLocationList from './AddLocationList';
import { Spinner } from './functionalComponents';

class AreaList extends Component {
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
        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
        const { containerStyle } = styles;

        return (
            <View style={containerStyle}>
                <AddLocationList />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    }
};

export default AreaList;
