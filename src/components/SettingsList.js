import React, { Component } from 'react';
import { View, InteractionManager, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Spinner, SettingsRow, LocationSettingsRow } from './functionalComponents';

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
        const { userFavoriteGas, userTankCapacity } = this.props.userSettings;

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <SettingsRow
                        title="Favorite gas type"
                        onPress={() => Actions.gasTypeSetting()}
                        value={userFavoriteGas}
                    />
                    <SettingsRow
                        title="Tank capacity"
                        onPress={() => Actions.tankCapacitySetting()}
                        value={`${userTankCapacity} L`}
                    />
                    <LocationSettingsRow
                        title="Access my position"
                    />
                    <SettingsRow
                        title="Share this app"
                    />
                    <SettingsRow
                        title="Policy & Privacy"
                    />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return { userSettings: state.userState };
};

export default connect(mapStateToProps)(SettingsList);
