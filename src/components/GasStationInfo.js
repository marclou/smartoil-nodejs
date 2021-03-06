import React, { Component } from 'react';
import { Alert, Text, Image, View, ActionSheetIOS, Linking, Platform, AlertIOS } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import { Spinner, Tag, ClickableTag, Button } from './functionalComponents';
import { displayLogo } from '../img/brands';
import {
    COLOR_PRIMARY,
    COLOR_FONT_PRIMARY,
    COLOR_FONT_SECONDARY,
    COLOR_BORDER_SECONDARY,
    FONT_CHARACTER_REGULAR,
    FONT_CHARACTER_BOLD,
    FONT_NUMBER_BOLD,
    COLOR_ERROR
} from '../styles/common';

class GasStationInfo extends Component {
    static mapPrediction(predictionValue) {
        switch (predictionValue) {
            case 0:
                return {
                    predictionAvailable: true,
                    iconName: 'caret-up',
                    iconColor: COLOR_ERROR,
                    adviceTitle: '오늘 구매',
                    adviceSentence: {
                        firstPart: '내일 가격상승 예상. 오늘 구매 시,',
                        secondPart: '원까지 절약가능.'
                    },
                    adviceIcon: 'bolt',
                    adviceIconColor: COLOR_PRIMARY
                };
            case 1:
                return {
                    predictionAvailable: true,
                    adviceTitle: '가격 유지',
                    adviceSentence: '내일 동일가격 유지.',
                    adviceIcon: 'sort',
                    adviceIconColor: COLOR_PRIMARY
                };
            case 2:
                return {
                    predictionAvailable: true,
                    iconName: 'caret-down',
                    iconColor: COLOR_PRIMARY,
                    adviceTitle: '구매 대기',
                    adviceSentence: {
                        firstPart: '내일 가격하락 예상. 내일 구매 시,',
                        secondPart: '원까지 절약가능.'
                    },
                    adviceIcon: 'clock-o',
                    adviceIconColor: COLOR_PRIMARY
                };
            default:
                return {
                    predictionAvailable: false,
                    iconName: 'question',
                    iconColor: COLOR_FONT_SECONDARY,
                    adviceTitle: '예측 불가',
                    adviceSentence: '본사에서는 항시 모든 주유소의 예상가를 제공하기 위해 노력합니다.',
                    adviceIcon: 'frown-o',
                    adviceIconColor: COLOR_FONT_SECONDARY
                };
        }
    }

    static alert() {
        Alert.alert(
            '잠시만요!',
            '곧 원하시는 리터 당 가격을 일 주일 동안 보장해드리겠습니다.',
            [{ text: '확인' }],
            { cancelable: true }
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            isComponentReady: true
        };
        this.linkToNavigation = this.linkToNavigation.bind(this);
        this.showAndroidActionSheet = this.showAndroidActionSheet.bind(this);
        GasStationInfo.alert = GasStationInfo.alert.bind(this);
    }

    linkToNavigation() {
        if (Platform.OS === 'ios') {
            const { gasStation } = this.props;

            this.showIOSActionSheet(gasStation);
        } else {
            const { latitude, longitude } = this.props.gasStation.location;

            this.showAndroidActionSheet(latitude, longitude);
        }
    }

    showIOSActionSheet({ location, name }) {
        const { latitude, longitude } = location;
        const OPTIONS = [
            'Cancel',
            'Naver Map',
            'Daum Map',
            'Google Maps',
            'Maps',
            'T-map'
        ];

        ActionSheetIOS.showActionSheetWithOptions({
                options: OPTIONS,
                cancelButtonIndex: 0
            },
            (buttonIndex) => {
                let URL = null;

                if (buttonIndex !== 0) {
                    switch (buttonIndex) {
                        case 1:
                            URL = `navermaps://?menu=location&pinType=place&lat=${latitude}&lng=${longitude}&title=${name}`;
                            break;
                        case 2:
                            URL = `daummaps://look?p=${latitude},${longitude}`;
                            break;
                        case 3:
                            URL = `comgooglemaps://?q=${latitude},${longitude}`;
                            break;
                        case 4:
                            URL = `http://maps.apple.com/?q=${latitude},${longitude}`;
                            break;
                        case 5:
                            URL = `tmap://?Lonlat=${latitude},${longitude}`;
                            break;
                        default:
                            break;

                    }
                    Linking.canOpenURL(URL).then(supported => {
                        if (!supported) {
                            AlertIOS.alert(
                                'Error',
                                `${OPTIONS[buttonIndex]} is not installed on your device`,
                                [{ text: 'Ok' }]
                            );
                        } else {
                            return Linking.openURL(URL);
                        }
                    }).catch(err => console.error('An error occurred', err));
                }
            }
        );
    }

    showAndroidActionSheet(latitude, longitude) {
        Linking.openURL(`geo:${latitude},${longitude}`);
    }

    render() {
        const { containerStyle, divider, row, logoStyle, textMajorStyle, textMediumStyle, textMinorStyle } = styles;
        const { priceInfo, name, brand } = this.props.gasStation;
        const { priceDiff, realTimeVariables, prediction, userState } = this.props;
        const predictionState = GasStationInfo.mapPrediction(prediction);

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
                {(realTimeVariables !== null) &&
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
                    {predictionState.predictionAvailable && prediction !== 1 &&
                    <Icon name={predictionState.iconName} style={{ fontSize: 22, color: predictionState.iconColor }} />}
                    <Text style={textMajorStyle}> {priceInfo.price}원</Text>
                    <Tag text={userState.userFavoriteGas.value} />
                </View>


                {(priceDiff !== 0 && typeof priceDiff !== 'undefined') &&
                <View style={row}>
                    <Text style={textMinorStyle}>
                        지금 사면 약 &nbsp;
                        {<Text style={{ fontFamily: FONT_CHARACTER_BOLD }}>
                            {priceDiff.toLocaleString('en')}
                        </Text>}
                        원(1.6L기준) 절약됩니다.
                    </Text>
                </View>}
                <View style={divider} />


                <View style={row}>
                    <Icon name={predictionState.adviceIcon} style={{ fontSize: 20, color: predictionState.adviceIconColor }} />
                    <Text style={textMajorStyle}> {predictionState.adviceTitle} </Text>
                    { predictionState.predictionAvailable && prediction === 0 && <ClickableTag iconName='snowflake-o' onPress={GasStationInfo.alert} />}
                </View>


                <View style={row}>
                    {
                        predictionState.predictionAvailable ?
                            (
                                prediction !== 1 ?
                                    <Text style={[textMinorStyle, { color: COLOR_PRIMARY }]}>
                                        {predictionState.adviceSentence.firstPart} &nbsp;
                                        <Text style={{ fontFamily: FONT_CHARACTER_BOLD }}>
                                            {(((10 * priceInfo.price) / 100) * userState.userTankCapacity).toFixed(0)}
                                        </Text>
                                        {predictionState.adviceSentence.secondPart}
                                    </Text> :
                                    <Text style={[textMinorStyle, { color: COLOR_PRIMARY }]}>
                                        {predictionState.adviceSentence}
                                    </Text>
                            )
                            :
                            <Text style={[textMinorStyle, { color: COLOR_PRIMARY }]}>
                                {predictionState.adviceSentence}
                            </Text>
                    }
                </View>
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
        flexDirection: 'column',
        marginBottom: 10
    },
    divider: {
        margin: 15,
        borderWidth: 0.5,
        borderColor: COLOR_BORDER_SECONDARY
    },
    row: {
        paddingVertical: 3,
        paddingHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
        paddingRight: 10,
        paddingLeft: 4,
        letterSpacing: 0.1
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

export default GasStationInfo;
