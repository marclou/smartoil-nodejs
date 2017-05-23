import React, { Component } from 'react';
import { View, InteractionManager, ScrollView } from 'react-native';

import { ListDivider, Spinner } from './functionalComponents';
import SquareButtonCollection from './SquareButtonCollection';
import RadioButtonsList from './RadioButtonsList';
import ShareList from './ShareList';
import LocationPreference from './LocationPreference';

class SettingsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
        });
    }

    render() {
        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
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
