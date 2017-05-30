import React from 'react';
import { View, TouchableOpacity } from 'react-native';

const ListSection = ({ children, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} >
            <View style={styles.containerStyle}>
                {children}
            </View>
        </TouchableOpacity>
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

export { ListSection };
