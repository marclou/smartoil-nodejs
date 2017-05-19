import React, { Component } from 'react';
import { View, ScrollView, Switch } from 'react-native';
import { ListDivider } from './functionalComponents';

import SquareButtonCollection from './SquareButtonCollection';
import RadioButtonsList from './RadioButtonsList';
import ShareList from './ShareList';

class SettingsList extends Component {
    render() {
        return (
            <View>
                <ScrollView>
                    <ListDivider title='favorite locations' />
                    <SquareButtonCollection />
                    <ListDivider title='favorite gas type' />
                    <RadioButtonsList />
                    <ListDivider title='Allow access to my position' />
                    <View>
                        <Switch />
                    </View>
                    <ListDivider title='Share this wonderfull app' />
                    <ShareList />
                </ScrollView>
            </View>
        );
    }
}

export default SettingsList;
