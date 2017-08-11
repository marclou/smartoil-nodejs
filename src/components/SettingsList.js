import React, { Component } from 'react';
import { View, InteractionManager, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Spinner, SettingsRow, LocationSettingsRow } from './functionalComponents';
import { COLOR_BACKGROUND_TERCIARY } from '../styles/common';
import Styles from '../styles/NavigationStyle';

class SettingsList extends Component {
    static navigationOptions = {
        tabBarLabel: '설정',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='cog' style={[Styles.tabBarIcon, { color: tintColor }]} />
        ),
        headerTitle: '설정',
        headerStyle: Styles.headerBackgroundPrimary,
        headerTitleStyle: [Styles.headerTitlePrimary, { alignSelf: 'center' }],
    };

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
        const { navigate } = this.props.navigation;
        const { containerStyle } = styles;

        return (
            <View style={containerStyle}>
                <ScrollView>
                    <SettingsRow
                        title="기름종류"
                        onPress={() => navigate('GasSetting')}
                        value={userFavoriteGas.value}
                    />
                    <SettingsRow
                        title="리터량"
                        onPress={() => navigate('TankSetting')}
                        value={`${userTankCapacity}L`}
                    />
                    <SettingsRow
                        title="내 지역"
                        onPress={() => navigate('LocationSetting')}
                        value={userFavoriteArea}
                    />
                    <LocationSettingsRow
                        title="위치 정보 제공 동의"
                    />
                    <SettingsRow
                        title="정책"
                        onPress={() => navigate('Privacy')}
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
