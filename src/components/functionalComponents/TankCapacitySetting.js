import React from 'react';
import { View } from 'react-native';

import { ListDivider } from '../functionalComponents';
import TankCapacityList from '../TankCapacityList';

const TankCapacitySetting = () => {
    return (
        <View>
            <ListDivider title="choose your tank capacity" />
            <TankCapacityList />
        </View>
    );
};

export { TankCapacitySetting };
