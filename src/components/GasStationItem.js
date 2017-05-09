import React, { Component } from 'react';
import { Linking, Platform, Text, Image } from 'react-native';
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
        const { price, uni_id } = this.props.gasStation;
        const { logoStyle, iconStyle, textStyle } = styles;

        return (
            <ListSection onPress={this.onItemPress.bind(this)} >
                <Image
                    style={logoStyle}
                    source={require('../img/brand_logos/a.jpg')}
                />
                <Text style={textStyle} >
                    {price}
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
    logoStyle: {
        height: 40,
        width: 40,
        alignSelf: 'center'
    },
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
