import React, { Component } from 'react';
import { Text, Image, View, InteractionManager, Share, ActionSheetIOS, Platform, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import SaveIcon from './SaveIcon';
import AndroidActionSheet from './AndroidActionSheet';
import { Spinner, Tag, Button, NavIcon } from './functionalComponents';
import { displayLogo } from '../img/brands';
import {
    COLOR_PRIMARY,
    COLOR_FONT_PRIMARY,
    COLOR_FONT_SECONDARY,
    COLOR_BORDER_SECONDARY,
    FONT_CHARACTER_REGULAR,
    FONT_CHARACTER_BOLD,
    FONT_NUMBER_BOLD
} from '../styles/common';

class GasStationInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isComponentReady: false,
            isModalVisible: false
        };
        this.renderRightButton = this.renderRightButton.bind(this);
        this.linkToNavigation = this.linkToNavigation.bind(this);
        this.onModalBackgroundPress = this.onModalBackgroundPress.bind(this);
        this.showAndroidActionSheet = this.showAndroidActionSheet.bind(this);
    }

    componentDidMount() {
        Actions.refresh({
            renderRightButton: this.renderRightButton,
            rightButtonStyle: { padding: 0 }
        });
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
        });
    }

    onModalBackgroundPress() {
        this.setState({
            isModalVisible: false
        });
    }

    linkToNavigation() {
        const { latitude, longitude } = this.props.gasStation.location;
        const options = [
            'Cancel',
            'T-Map',
            'Kakao Map',
            'Naver'
        ];
        const URL = `http://maps.apple.com/?ll=${longitude},${latitude}`;

        if (Platform.OS === 'ios') {
            this.showIOSActionSheet(options);
        } else {
            this.showAndroidActionSheet(latitude, longitude);
        }
    }

    showIOSActionSheet(options) {
        ActionSheetIOS.showActionSheetWithOptions({
                options: options,
                cancelButtonIndex: 0
            },
            (buttonIndex) => {
                console.log(buttonIndex);
            }
        );
    }
    showAndroidActionSheet(latitude, longitude) {
        Linking.openURL(`geo:${latitude},${longitude}`);
        //this.setState({ isModalVisible: true });
    }

    shareContent() {
        Share.share({
                message: '스마트오일 덕분에 이 주에 기름값을 XX원 절약할 수 있었어요!  얼마나 아낄 수 있는지 알아볼까요? ',
                title: '스마트오일',
                url: 'http://nsjtech.com'
            },
            {
                dialogTitle: '공유하기',
                tintColor: 'green'
            })
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    renderRightButton(props) {
        return (
            <View style={styles.navIconStyle}>
                <SaveIcon gasStation={props.gasStation} />
                <NavIcon iconName="share" color={COLOR_PRIMARY} onPress={this.shareContent} />
            </View>
        );
    }

    render() {
        const { containerStyle, divider, row, logoStyle, textMajorStyle, textMediumStyle, textMinorStyle } = styles;
        const { price, distance, store_name, brand } = this.props.gasStation;
        const { userGasType } = this.props;

        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
        return (
            <View style={containerStyle}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0)']}>
                    <Image
                        style={logoStyle}
                        source={displayLogo('large', brand)}
                    />
                </LinearGradient>
                <View style={row}>
                    <Text style={textMediumStyle}>{store_name}</Text>
                </View>
                <View style={row}>
                    <Icon name="map-marker" style={{ color: COLOR_FONT_SECONDARY }} />
                    <Text style={textMinorStyle}> {(Math.round(distance * 100) / 100).toFixed(2)} km | </Text>
                    <Text style={textMinorStyle}> 1 원</Text>
                </View>
                <View style={divider} />
                <View style={row}>
                    <Text style={textMajorStyle}> {price}원</Text>
                    <Tag text={userGasType} />
                </View>
                <View style={row}>
                    <Text style={[textMinorStyle, { color: COLOR_PRIMARY }]}>
                        지금 사면 약 15,000원(1.6L기준) 절약됩니다.
                    </Text>
                </View>
                <View style={{ marginTop: 25 }}>
                    <Button
                        title="주유소 찾아가기"
                        onPress={this.linkToNavigation}
                    />
                </View>
                <AndroidActionSheet
                    transparent
                    animationType="slide"
                    visible={this.state.isModalVisible}
                    onBackgroundPress={this.onModalBackgroundPress}
                />
            </View>
        );
    }
}


const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    divider: {
        margin: 15,
        borderWidth: 0.5,
        borderColor: COLOR_BORDER_SECONDARY
    },
    row: {
        paddingVertical: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logoStyle: {
        margin: 15,
        height: 100,
        width: 150,
        alignSelf: 'center'
    },
    textMajorStyle: {
        fontSize: 24,
        color: COLOR_FONT_PRIMARY,
        fontFamily: FONT_NUMBER_BOLD,
        paddingRight: 15
    },
    textMediumStyle: {
        fontSize: 16,
        color: COLOR_FONT_PRIMARY,
        fontFamily: FONT_CHARACTER_BOLD
    },
    textMinorStyle: {
        fontSize: 12,
        color: COLOR_FONT_SECONDARY,
        fontFamily: FONT_CHARACTER_REGULAR
    },
    navIconStyle: {
        flexDirection: 'row',
        flex: 1,
    }
};

const mapStateToProps = state => {
    return { userGasType: state.userState.userFavoriteGas };
};

export default connect(mapStateToProps)(GasStationInfo);
