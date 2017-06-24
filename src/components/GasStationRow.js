import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    COLOR_FONT_PRIMARY,
    COLOR_FONT_SECONDARY
} from '../styles/common';
import { displayLogo } from '../img/brands';

class GasStationRow extends Component {
    render() {
        const { price, distance, store_name, brand } = this.props.gasStation;
        const { containerStyle, logoStyle, textContainer, textStyle, majorTextStyle, section, subSection, iconStyle } = styles;

        return (
            <View style={containerStyle}>
                <View style={section}>
                    <Image
                        style={logoStyle}
                        source={displayLogo('small', brand)}
                    />
                    <View style={[subSection, { paddingLeft: 20 }]}>
                        <Text style={textStyle}>
                            {store_name}
                        </Text>
                        <View style={textContainer} >
                            <Text style={majorTextStyle}>
                                {price} 원
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={section}>
                    <View style={[subSection, { alignItems: 'flex-end', paddingRight: 20 }]}>
                        <View style={textContainer} >
                            <Text style={textStyle}>
                                {(Math.round(distance * 100) / 100).toFixed(2)} km
                            </Text>
                        </View>
                        <View style={textContainer} >
                            <Text style={textStyle}>
                                1 분
                            </Text>
                        </View>
                    </View>
                    <Icon
                        name="chevron-right"
                        style={iconStyle}
                    />
                </View>
            </View>
        );
    }
}


const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 8,
        height: 85
    },
    section: {
        flexDirection: 'row',
        padding: 5,
        maxWidth: 220
    },
    subSection: {
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    iconStyle: {
        alignSelf: 'center',
        color: COLOR_FONT_SECONDARY
    },
    logoStyle: {
        height: 40,
        width: 40,
        alignSelf: 'center'
    },
    textContainer: {
        flexDirection: 'row'
    },
    majorTextStyle: {
        fontSize: 16,
        color: COLOR_FONT_PRIMARY,
        fontWeight: '700'
    },
    textStyle: {
        fontSize: 14,
        color: COLOR_FONT_SECONDARY
    }
};

export default GasStationRow;
