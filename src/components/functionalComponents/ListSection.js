import React from 'react';
import { View, TouchableOpacity } from 'react-native';

const ListSection = ({ children, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.containerStyle} >
            <View style={styles.viewStyle}>
                {children}
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        backgroundColor: '#FFF'
    },
    viewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 9,
        borderBottomWidth: 1,
        borderColor: '#DDD',
        backgroundColor: '#FFF',
    }
};

export { ListSection };
