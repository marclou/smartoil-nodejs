import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import { Icon } from 'native-base';

class GasStationRow extends Component {
    render() {
        const { price, distance } = this.props.gasStation;
        const { containerStyle, logoStyle, iconStyle, textContainer, textStyle } = styles;

        return (
            <View style={containerStyle}>
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
                <Icon name='heart' style={iconStyle} />
            </View>
        );
    }
}


const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 8
    },
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

export default GasStationRow;
