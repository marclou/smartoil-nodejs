import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    COLOR_FONT_SECONDARY,
    FONT_CHARACTER_REGULAR
} from '../styles/common';
import { deleteFavorite } from '../actions/FavoriteStationAction';
import { ListSectionLongPress } from './functionalComponents';
import { displayLogo } from '../img/brands';

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
        const { name, brand } = this.props.gasStation;
        const { containerStyle, section, logoStyle, textStyle, iconStyle } = styles;
        return (
            <ListSectionLongPress onPress={this.onPress.bind(this)} onLongPress={this.onLongPress.bind(this)} >
                <View style={containerStyle}>
                    <View style={section}>
                        <Image
                            style={logoStyle}
                            source={displayLogo('small', brand)}
                        />
                        <Text style={textStyle}>
                            {name}
                        </Text>
                    </View>
                    <Icon
                        name="chevron-right"
                        style={iconStyle}
                    />
                </View>
            </ListSectionLongPress>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 8,
        height: 70
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoStyle: {
        height: 40,
        width: 40
    },
    textStyle: {
        fontSize: 14,
        color: COLOR_FONT_SECONDARY,
        fontFamily: FONT_CHARACTER_REGULAR,
        paddingLeft: 20

    },
    iconStyle: {
        color: COLOR_FONT_SECONDARY
    },

};

export default connect(null, { deleteFavorite })(FavoriteItem);
