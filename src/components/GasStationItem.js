import React, { Component } from 'react';
import { Linking, Platform, Text } from 'react-native';
import { Icon } from 'native-base';

import { ListSection } from './functionalComponents';

class GasStationItem extends Component {
    onItemPress() {
        this.openDirections();
    }

    openDirections() {
        const { latitude, longitude } = this.props.gasStation.location;
        switch (Platform.OS) {
            case 'ios':
                return Linking.openURL(`http://maps.apple.com/maps?daddr=${latitude},${longitude}`);
            case 'android':
                return Linking.openURL(`http://maps.google.com/maps?daddr=${latitude},${longitude}`);
            default:
                return console.log('which plateform ?');
        }
    }

    render() {
        const { store_name, price_oil, uni_id } = this.props.gasStation;
        const { iconStyle, textStyle } = styles;

        return (
            <ListSection onPress={this.onItemPress.bind(this)} >
                <Text style={textStyle} >
                    {store_name}
                </Text>
                <Text style={textStyle} >
                    {price_oil}
                </Text>
                <Text style={textStyle} >
                    {uni_id}
                </Text>
                <Icon name='arrow-forward' style={iconStyle} />
            </ListSection>

        );
    }
}

const styles = {
    textStyle: {
        width: 70,
        alignSelf: 'center'
    },
    iconStyle: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'gray'
    }
};

export default GasStationItem;
