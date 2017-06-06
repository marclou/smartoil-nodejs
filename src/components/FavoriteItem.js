import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { deleteFavorite } from '../actions/FavoriteStationAction';
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
                { text: 'OK', onPress: () => this.props.deleteFavorite(uid) },
            ],
            { cancelable: true }
        );
    }

    render() {
        const { uid } = this.props.gasStation;
        const { rowStyle } = styles;

        return (
            <ListSectionLongPress onPress={this.onPress.bind(this)} onLongPress={this.onLongPress.bind(this)} >
                <View style={rowStyle}>
                    <Text>
                        {uid}
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

export default connect(null, { deleteFavorite })(FavoriteItem);
