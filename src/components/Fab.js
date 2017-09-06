import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Alert, Linking, Platform } from 'react-native';

import { Blur } from './functionalComponents';
import {
    COLOR_FONT_SECONDARY,
    COLOR_FONT_QUINARY,
    FONT_CHARACTER_REGULAR
} from '../styles/common';
import { getUserPosition, changeUserAllowLocation } from '../actions';

class Fab extends Component {
    displayAlert(alertTitle, alertMessage, buttons) {
        Alert.alert(
            alertTitle,
            alertMessage,
            buttons,
            { cancelable: false }
        );
    }

    reloadLocation() {
        const { navigate } = this.props.navigation;

        this.props.getUserPosition()
            .then(() => navigate('Result', { isFromAreaList: false }))
            .catch((positionError) => {
                switch (positionError.code) {
                    case 0:
                        return this.displayAlert(
                            '경고',
                            '요청이 실패하였습니다만 이유를 알 수 없습니다. 다시 시도해 주세요.',
                            [
                                { text: '확인' }
                            ]
                        );
                    case 1:
                        return this.displayAlert(
                            '경고',
                            '데이터에 접근하려면 GPS를 켜주세요.',
                            [
                                { text: '확인', onPress: () => Linking.openURL('app-settings:1') },
                                { text: '취소', style: 'cancel' }
                            ]
                        );
                    case 2:
                        return this.displayAlert(
                            '경고',
                            '네트워크가 안정적이지 않은 것 같습니다. 조금 있다가 다시 시도해 주세요.',
                            [
                                { text: '확인' }
                            ]
                        );
                    case 3:
                        return this.displayAlert(
                            '경고',
                            '반응 시간 초과. SmartOil이 귀하의 위치에 접근할수 있도록 허용하는지 확인해 주세요.',
                            [
                                { text: '확인' }
                            ]
                        );
                    default:
                        return this.displayAlert(
                            '경고',
                            '알려지지 않은 문제가 발생하였습니다.',
                            [
                                { text: '확인' }
                            ]
                        );
                }
            });
    }

    searchByLocation() {
        const { userAllowLocation, userLocation, errorLocation } = this.props.userState;
        const { navigate } = this.props.navigation;

        if (!userAllowLocation) {
            return this.displayAlert(
                '경고',
                '설정 탭에서 사용자 위치를 액세스 할 수 있도록 해주세요.',
                [
                    { text: '확인',
                        onPress: () => {
                            this.props.changeUserAllowLocation(userAllowLocation);
                            this.reloadLocation();
                        }
                    },
                    { text: '취소', style: 'cancel' }
                ]
            );
        }
        if (errorLocation) {
            this.reloadLocation();
        }
        if (userAllowLocation && userLocation.latitude !== null && userLocation.longitude !== null) {
            return navigate('Result', { isFromAreaList: false });
        }
    }

    render() {
        const { actionButtonIconStyle, actionButtonItemIconStyle, textStyle, textContainerStyle } = styles;
        const { navigate } = this.props.navigation;

        return (
            <ActionButton
                buttonColor={COLOR_FONT_QUINARY}
                icon={<Icon name='search' style={actionButtonIconStyle} />}
                offsetY={85}
                degrees={0}
                backdrop={<Blur />}
                outRangeScale={1.3}
                useNativeFeedback={false}
                hideShadow={Platform.OS !== 'ios'}
            >
                <ActionButton.Item
                    title='내 위치로 검색'
                    onPress={this.searchByLocation.bind(this)}
                    textContainerStyle={textContainerStyle}
                    textStyle={textStyle}
                    spaceBetween={10}
                    hideShadow={true}
                    useNativeFeedback={false}
                >
                    <Icon
                        name='map-marker'
                        style={actionButtonItemIconStyle}
                    />
                </ActionButton.Item>
                <ActionButton.Item
                    title='지역으로 검색'
                    onPress={() => navigate('AreaList')}
                    textContainerStyle={textContainerStyle}
                    textStyle={textStyle}
                    spaceBetween={10}
                    hideShadow={true}
                    useNativeFeedback={false}

                >
                    <Icon
                        name='map-o'
                        style={actionButtonItemIconStyle}
                    />
                </ActionButton.Item>
            </ActionButton>
        );
    }
}

const styles = {
    actionButtonIconStyle: {
        fontSize: 16,
        color: COLOR_FONT_SECONDARY
    },
    actionButtonItemIconStyle: {
        fontSize: 16,
        color: COLOR_FONT_SECONDARY
    },
    textStyle: {
        flex: 1,
        color: COLOR_FONT_QUINARY,
        fontSize: 16,
        fontFamily: FONT_CHARACTER_REGULAR,
        letterSpacing: 0
    },
    textContainerStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        height: undefined,
        shadowOpacity: 0,
        shadowOffset: { height: 0, width: 0 }
    },
    shadowStyle: {
        shadowOffset: { height: 5, width: 5 },
        shadowOpacity: 0.5,

    }

};

const mapStateToProps = state => {
    return { userState: state.userState };
};

export default connect(mapStateToProps, { getUserPosition, changeUserAllowLocation })(Fab);
