import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { ListDivider } from './functionalComponents';

import SquareButtonCollection from './SquareButtonCollection';
import RadioButtonsList from './RadioButtonsList';
import ShareList from './ShareList';
import LocationPreference from './LocationPreference';

class SettingsList extends Component {
    render() {
        return (
            <View>
                <ScrollView>
                    <ListDivider title='favorite locations' />
                    <SquareButtonCollection />
                    <ListDivider title='favorite gas type' />
                    <RadioButtonsList />
                    <ListDivider title='access my position' />
                    <LocationPreference />
                    <ListDivider title='share this wonderful app' />
                    <ShareList />
                </ScrollView>
            </View>
        );
    }
}

export default SettingsList;
