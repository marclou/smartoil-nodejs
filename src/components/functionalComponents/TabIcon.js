import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'native-base';

const TabIcon = ({ iconName, title, selected }) => {
    const { containerStyle, iconStyle, textStyle } = styles;

    return (
        <View style={containerStyle}>
            <Icon
                name={iconName}
                style={iconStyle}
                active={selected}
            />
            <Text style={textStyle}>
                {title}
            </Text>
        </View>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center'
    },
    iconStyle: {
        color: '#301c2a'
    },
    textStyle: {
        fontSize: 12,
        color: '#301c2a'
    }
};

export { TabIcon };
