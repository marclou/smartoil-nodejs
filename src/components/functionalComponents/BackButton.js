import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BackButton = ({ color }) => {
    const { containerStyle, viewStyle, iconStyle } = styles;

    return (
        <TouchableOpacity style={containerStyle} onPress={console.log('find a way to pop the page :-)')}>
            <View style={viewStyle}>
                <Icon name='arrow-back' color={color} style={iconStyle} />
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        width: 100,
        height: 37,
        position: 'absolute',
        bottom: 0,
        left: 2,
        padding: 8,
        justifyContent: 'center'
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconStyle: {
        fontSize: 20,
        marginTop: 5,
    }
};

export { BackButton };
