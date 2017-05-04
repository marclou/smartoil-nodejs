import React from 'react';
import { Icon, Button, Text } from 'native-base';

const SearchButton = ({ onPress, icon, children }) => {
    const { buttonStyle } = styles;

    return (
        <Button
            rounded
            onPress={onPress}
            style={buttonStyle}
        >
            <Icon name={icon} />
            <Text> {children} </Text>
        </Button>
    );
};

const styles = {
    buttonStyle: {
        alignSelf: 'center'
    }
};

export { SearchButton };

