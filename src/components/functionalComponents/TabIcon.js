import React from 'react';
import { Text, View, Platform } from 'react-native';
import { Icon } from 'native-base';

const TabIcon = ({ iconName, title, selected }) => {
    const { containerStyle, textStyle } = styles;

    return (
        <View style={containerStyle}>
            <Icon
                name={iconName}
                style={colorStylePlatform(selected)}
                active={selected}
            />
            <Text style={textStyle && colorStylePlatform(selected)}>
                {title}
            </Text>
        </View>
    );
};

const colorStylePlatform = (selected) => {
    const { colorStyle, colorSelectedStyle } = styles;

  if (Platform.OS === 'android') {
      return selected ? colorSelectedStyle : colorStyle;
  }
  return colorStyle;
};

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center'
    },
    colorStyle: {
        color: '#301c2a'
    },
    colorSelectedStyle: {
        color: 'red'
    },
    textStyle: {
        fontSize: 12
    }
};

export { TabIcon };
