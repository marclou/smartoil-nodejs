import React, { Component } from 'react';
import { View, Text, Image, Alert } from 'react-native';
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
        const { navigate } = this.props;
        const { uid } = this.props.gasStation;

        navigate('StationDetail', { stationUid: uid, realTimeVariables: null });
    }
    onLongPress() {
        const { uid } = this.props.gasStation;

        Alert.alert(
            '삭제',
            '이 주유소를 단골 목록에서 삭제하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                { text: '확인', onPress: () => this.props.deleteFavorite(uid) },
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
                        <Text style={textStyle} numberOfLines={1}>
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
