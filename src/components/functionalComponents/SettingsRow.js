import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

const SettingsRow = ({ title, onPress, value }) => {
    const { containerStyle, textStyle, valueStyle, iconStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} >
            <View style={containerStyle}>
                <Text style={textStyle}> {title} </Text>
                <Text style={valueStyle}> {value} </Text>
                <Icon name='arrow-forward' style={iconStyle} />
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        height: 45,
        borderBottomWidth: 1,
        borderColor: '#DDD',
        padding: 8,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textStyle: {
        flex: 1,
        alignSelf: 'center'
    },
    valueStyle: {
        flex: 1,
        color: 'gray',
        textAlign: 'right',
        paddingRight: 15,
        alignSelf: 'center'
    },
    iconStyle: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'gray'
    }
};

export { SettingsRow };
