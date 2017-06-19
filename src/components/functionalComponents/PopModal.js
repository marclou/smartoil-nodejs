import React from 'react';
import { View } from 'react-native';

import GasStationSelectedRow from '../GasStationSelectedRow';
import { Header } from './Header';

const PopModal = (props) => {
    const { containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Header title='Gas Station' gasStation={props.gasStation} />
            <GasStationSelectedRow gasStation={props.gasStation} />
        </View>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
    }

};

export { PopModal };
