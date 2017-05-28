import React from 'react';
import { View } from 'react-native';

import { ListDivider } from '../functionalComponents';
import RadioButtonList from '../RadioButtonsList';

const GasTypeSetting = () => {
    return (
        <View>
            <ListDivider title="choose your favorite gas type" />
            <RadioButtonList />
        </View>
    );
};

export { GasTypeSetting };
