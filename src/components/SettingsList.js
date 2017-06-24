import React, { Component } from 'react';
import { View, InteractionManager, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Spinner, SettingsRow, LocationSettingsRow } from './functionalComponents';
import { COLOR_BACKGROUND_TERCIARY } from '../styles/common';

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
        const { userFavoriteGas, userTankCapacity, userFavoriteArea } = this.props.userSettings;
        const { containerStyle } = styles;

        return (
            <View style={containerStyle}>
                <ScrollView>
                    <SettingsRow
                        title="기름종류"
                        onPress={() => Actions.gasTypeSetting()}
                        value={userFavoriteGas}
                    />
                    <SettingsRow
                        title="리터량"
                        onPress={() => Actions.tankCapacitySetting()}
                        value={`${userTankCapacity} L`}
                    />
                    <SettingsRow
                        title="내 지역"
                        onPress={() => Actions.favoriteArea()}
                        value={userFavoriteArea}
                    />
                    <LocationSettingsRow
                        title="위치 정보 제공 동의"
                    />
                    <SettingsRow
                        title="정책"
                    />
                    <SettingsRow
                        title="정책"
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND_TERCIARY
    }
};

const mapStateToProps = state => {
    return { userSettings: state.userState };
};

export default connect(mapStateToProps)(SettingsList);
