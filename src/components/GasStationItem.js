import React, { Component } from 'react';
import { Linking, Platform, Text, Image, View } from 'react-native';
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
        const { price, distance } = this.props.gasStation;
        const { logoStyle, iconStyle, textContainer, textStyle } = styles;

        return (
            <ListSection onPress={this.onItemPress.bind(this)} >
                <Image
                    style={logoStyle}
                    source={require('../img/brand_logos/a.jpg')}
                />
                <View style={textContainer} >
                    <Text style={textStyle}>
                        {price}
                    </Text>
                    <Text>
                        ₩
                    </Text>
                </View>
                <View style={textContainer} >
                    <Text style={textStyle}>
                        {(Math.round(distance * 100) / 100).toFixed(2)}
                    </Text>
                    <Text>
                        km
                    </Text>
                </View>
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
    textContainer: {
        width: 80,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    textStyle: {
        width: 45,
        fontWeight: 'bold'
    },
    iconStyle: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'gray'
    }
};

export default GasStationItem;
