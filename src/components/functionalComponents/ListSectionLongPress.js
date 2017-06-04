import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

const ListSectionLongPress = ({ children, onPress, onLongPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress} >
            <View style={styles.containerStyle}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        borderColor: '#DDD',
        backgroundColor: '#FFF',
        justifyContent: 'space-around',
        flexDirection: 'row',
        position: 'relative'
    }
};

export { ListSectionLongPress };
