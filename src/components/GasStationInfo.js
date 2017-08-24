import React, { Component } from 'react';
import { Text, Image, View, InteractionManager, ActionSheetIOS, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import SaveIcon from './SaveIcon';
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
            isComponentReady: false
        };
        this.linkToNavigation = this.linkToNavigation.bind(this);
        this.showAndroidActionSheet = this.showAndroidActionSheet.bind(this);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
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
        const URL = `http://maps.apple.com/?ll=${latitude},${longitude}`;

        if (Platform.OS === 'ios') {
            this.showIOSActionSheet(options, URL);
        } else {
            this.showAndroidActionSheet(latitude, longitude);
        }
    }

    showIOSActionSheet(options, url) {
        ActionSheetIOS.showActionSheetWithOptions({
                options: options,
                cancelButtonIndex: 0
            },
            (buttonIndex) => {
                Linking.openURL(url);
            }
        );
    }
    showAndroidActionSheet(latitude, longitude) {
        Linking.openURL(`geo:${latitude},${longitude}`);
    }

    render() {
        const { containerStyle, divider, row, logoStyle, textMajorStyle, textMediumStyle, textMinorStyle } = styles;
        const { priceInfo, name, brand } = this.props.gasStation;
        const { priceDiff, realTimeVariables, userGasType } = this.props;

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
                    <Text style={textMediumStyle}>{name}</Text>
                </View>
                {(realTimeVariables !== undefined) &&
                    <View style={row}>
                        <Icon name="map-marker" style={{ color: COLOR_FONT_SECONDARY }} />
                        <Text style={textMinorStyle}>
                            &nbsp; {(Math.round(realTimeVariables.totalDistance) / 1000).toFixed(2)} km |
                        </Text>
                        <Text style={textMinorStyle}>
                            &nbsp; {Math.round(realTimeVariables.totalTime / 60).toFixed(0)} 분
                        </Text>
                    </View>}
                <View style={divider} />
                <View style={row}>
                    <Text style={textMajorStyle}> {priceInfo.price}원</Text>
                    <Tag text={userGasType.value} />
                </View>
                {(priceDiff !== 0 && typeof priceDiff !== 'undefined') &&
                <View style={row}>
                    <Text style={[textMinorStyle, { color: COLOR_PRIMARY }]}>
                        지금 사면 약 &nbsp;
                        {<Text style={{ fontFamily: FONT_CHARACTER_BOLD }}>
                            {priceDiff.toLocaleString('en')}
                        </Text>}
                        원(1.6L기준) 절약됩니다.
                    </Text>
                </View>}
                <View style={{ marginTop: 25 }}>
                    <Button
                        title="주유소 찾아가기"
                        onPress={this.linkToNavigation}
                    />
                </View>
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
