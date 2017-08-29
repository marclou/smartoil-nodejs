import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { COLOR_PRIMARY } from '../../styles/common';

const Spinner = ({ size, color }) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator
                size={size || 'large'}
                color={color || COLOR_PRIMARY}
            />
        </View>
    );
};

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export { Spinner };
