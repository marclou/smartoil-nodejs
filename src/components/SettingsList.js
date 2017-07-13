import React, { Component } from 'react';
import { View, InteractionManager, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import AndroidActionSheet from './AndroidActionSheet';
import { Spinner, SettingsRow, LocationSettingsRow, Button } from './functionalComponents';
import { COLOR_BACKGROUND_TERCIARY } from '../styles/common';

class SettingsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false,
            isModalVisible: false
        };
        this.onModalBackgroundPress = this.onModalBackgroundPress.bind(this);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
        });
    }

    onModalBackgroundPress() {
        this.setState({
            isModalVisible: false
        });
    }

    query() {
        axios.get('https://gosmartoil.com/opinetGasStationInfoVoes').then(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
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
                        value={`${userTankCapacity}L`}
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
                    <Button title='request' onPress={() => this.query()} />
                    {/*<Button title='test' onPress={() => this.setState({ isModalVisible: true })} />*/}
                    <AndroidActionSheet
                        transparent
                        animationType="slide"
                        visible={this.state.isModalVisible}
                        onBackgroundPress={this.onModalBackgroundPress}
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
