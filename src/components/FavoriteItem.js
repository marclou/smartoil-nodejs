import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

import realm from '../Realm';
import { ListSectionLongPress } from './functionalComponents';

class FavoriteItem extends Component {
    onPress() {
        Actions.result();
    }
    onLongPress() {
        const { uid } = this.props.gasStation;

        Alert.alert(
            'Delete',
            'Are you sure you want to delete this from your favorites',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => this.deleteFavorite(uid) },
            ],
            { cancelable: true }
        );
    }

    deleteFavorite(uid) {
        const stationList = realm.objects('GasStationsList');
        const toBeDeleted = stationList[0].gasStations.filtered('uid = $0', uid);
        realm.write(() => {
            realm.delete(toBeDeleted);
        });
    }

    render() {
        const { name } = this.props.gasStation;
        const { rowStyle } = styles;

        return (
            <ListSectionLongPress onPress={this.onPress.bind(this)} onLongPress={this.onLongPress.bind(this)} >
                <View style={rowStyle}>
                    <Text>
                        {name}
                    </Text>
                </View>
            </ListSectionLongPress>
        );
    }
}

const styles = {
    rowStyle: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 8
    }
};

export default FavoriteItem;
