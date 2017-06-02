import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';

import SaveIcon from './SaveIcon';

class GasStationSelectedRow extends Component {
    render() {
        const { price, distance, uni_id } = this.props.gasStation;
        const { containerStyle, logoStyle, textContainer, textStyle } = styles;

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
                <View style={textContainer} >
                    <Text style={textStyle}>
                        {uni_id}
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
                <SaveIcon gasStation={this.props.gasStation} />
            </View>
        );
    }
}


const styles = {
    containerStyle: {
        flex: 1,
        height: 200,
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: 8,
        backgroundColor: '#EEE'
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
    }
};

export default GasStationSelectedRow;
