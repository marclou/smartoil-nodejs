import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'native-base';

import realm from '../Realm';

class SaveIcon extends Component {
    constructor(props) {
        super(props);
        const stationList = realm.objects('GasStationsList');
        const toBeFiltered = stationList[0].gasStations.filtered('uid = $0', props.gasStation.uni_id);
        this.state = {
            selected: false,
            payload: props.gasStation
        };
        if (toBeFiltered.length !== 0) {
            this.state = {
                selected: true
            };
        }
    }

    saveData() {
        this.stationsList = realm.objects('GasStationsList');

        if (this.stationsList.length < 1) {
            realm.write(() => {
                realm.create('GasStationsList', { name: 'Gas Stations List', creationDate: new Date() });
            });
        }
        const { uni_id, location, store_name, address, brand } = this.props.gasStation;

        if (!this.state.selected) {
            realm.write(() => {
                this.stationsList[0].gasStations.push({
                    uid: uni_id,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    name: store_name,
                    address: address,
                    brand: brand
                });
            });
        } else {
            const toBeDeleted = this.stationsList[0].gasStations.filtered('uid = $0', uni_id);

            realm.write(() => {
                realm.delete(toBeDeleted);
            });
        }
        this.setState({
            selected: !this.state.selected
        });
    }


    pressIcon() {
        this.saveData();
    }

    render() {
        const { containerStyle, iconStyle } = styles;

        return (
            <TouchableWithoutFeedback onPress={this.pressIcon.bind(this)}>
                <View style={containerStyle} >
                    <Icon name={this.state.selected ? 'ios-heart' : 'ios-heart-outline'} style={iconStyle} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    containerStyle: {
        alignSelf: 'center'
    },
    iconStyle: {
        fontSize: 25,
        color: 'red'
    }
};

export default SaveIcon;
