import React, { Component } from 'react';
import { View, Text, Image, Animated, Easing, TouchableWithoutFeedback, Platform, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import { pricePredictionFetch } from '../actions';
import { Tag, Spinner, PredictionPrice, ErrorStatic } from './functionalComponents';
import {
    COLOR_FONT_QUINARY,
    FONT_CHARACTER_REGULAR,
    FONT_CHARACTER_BOLD,
} from '../styles/common';

class PricePrediction extends Component {
    constructor() {
        super();
        this.animate = this.animate.bind(this);
        this.onLayout = this.onLayout.bind(this);
        this.onIconPress = this.onIconPress.bind(this);

        this.state = {
            isPortrait: true,
            animatedVal: new Animated.Value(0)
        };
    }

    componentDidMount() {
        const { userFavoriteArea, userFavoriteGas } = this.props.userState;

        this.props.pricePredictionFetch(userFavoriteArea.code, userFavoriteGas.code);
    }

    componentWillUpdate() {
        this.animate();
    }

    onLayout(e) {
        const { width, height } = e.nativeEvent.layout;
        if (width > height) {
            this.setState({
                isPortrait: false
            });
        } else {
            this.setState({
                isPortrait: true
            });
        }
    }

    onIconPress() {
        const { userFavoriteArea, userFavoriteGas } = this.props.userState;

        this.props.pricePredictionFetch(userFavoriteArea.code, userFavoriteGas.code);

        switch (Platform.OS) {
            case 'android':
                //ToastAndroid.show('가장 저렴한 주유소를 찾으려면 오른쪽 하단 버튼을 이용해주세요.', ToastAndroid.SHORT);
                break;
            case 'ios':
                break;
            default:
                break;
        }
    }

    animate() {
        this.state.animatedVal.setValue(0);
            Animated.timing(
            this.state.animatedVal,
            {
                toValue: 1,
                duration: 800,
                easing: Easing.linear
            }
        ).start((animation) => {
            if (animation.finished) {
                this.animate();
            }
        });
    }

    render() {
        const { loading, error, pricePredictionData } = this.props.pricePrediction;
        const { userFavoriteArea, userFavoriteGas } = this.props.userState;
        const { containerStyle, row, image, advice, subAdvice, imageContainer } = styles;
        const opacity = this.state.animatedVal.interpolate({
            inputRange: [0, 0.3, 1],
            outputRange: [0.75, 1, 0.75]
        });
        const scale = this.state.animatedVal.interpolate({
            inputRange: [0, 0.3, 1],
            outputRange: [0.95, 1.1, 0.95]
        });

        if (loading) {
            return (
                <Spinner size='large' color='white' />
            );
        }
        if (error) {
            return (
                <ErrorStatic
                    title='Ooops, something went wrong'
                    message='But no worry, you can still refresh the result with the button below'
                    onPress={this.props.pricePredictionFetch.bind(this, userFavoriteArea.code, userFavoriteGas.code)}
                />
            );
        }
        return (
            <View
                style={[containerStyle,
                    { padding: 20 },
                    this.state.isPortrait ?
                        { flexDirection: 'column' } :
                        { flexDirection: 'row' }
                    ]}
                onLayout={this.onLayout}
            >
                <TouchableWithoutFeedback onPress={this.onIconPress}>
                    <View style={[row, !this.state.isPortrait ? { flex: 1 } : { flex: 0 }]}>
                        <View style={imageContainer}>
                            {pricePredictionData.shortTermPrediction !== 0 ?
                                <Animated.Image
                                    source={require('../img/prediction/full.png')}
                                    style={[image, { opacity, transform: [{ scale }] }]}
                                /> :
                                <Image
                                    source={require('../img/prediction/empty.png')}
                                    style={image}
                                />
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={[containerStyle, { flexDirection: 'column' }, this.state.isPortrait ? { paddingVertical: 10 } : null]}>
                    <View style={row}>
                        {(() => {
                            switch (pricePredictionData.shortTermPrediction) {
                                case 0:
                                    return <Text style={advice}>내일은 가격이 올라갑니다.</Text>;
                                case 1:
                                    return <Text style={advice}>내일은 가격이 같습니다.</Text>;
                                case 2:
                                    return <Text style={advice}>내일은 가격이 내려갑니다.</Text>;
                                default:
                                    return <Text style={advice}>내일은 가격이 같습니다.</Text>;
                            }
                        })()}
                    </View>
                    <View style={[row, this.state.isPortrait ? { paddingVertical: 10 } : null]}>
                        <Text style={subAdvice}>
                            오늘 가격
                        </Text>
                    </View>
                    <View style={[row, this.state.isPortrait ? { paddingVertical: 10 } : null]}>
                        <PredictionPrice text={Number(pricePredictionData.averagePrice)} />
                    </View>
                    <View style={[row, this.state.isPortrait ? { paddingVertical: 10 } : null]}>
                        <Tag text={userFavoriteGas.value} />
                        <Tag text={userFavoriteArea.value} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    image: {
        backgroundColor: 'transparent',
        height: 85,
        width: 85,
        resizeMode: 'contain',
    },
    advice: {
        alignSelf: 'center',
        color: COLOR_FONT_QUINARY,
        fontSize: 20,
        fontFamily: FONT_CHARACTER_BOLD,
        letterSpacing: 1.5,
    },
    subAdvice: {
        alignSelf: 'center',
        color: COLOR_FONT_QUINARY,
        fontSize: 18,
        fontFamily: FONT_CHARACTER_REGULAR,
        letterSpacing: 2

    },
    imageContainer: {
        alignSelf: 'center',
        height: 174,
        width: 174,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: 'white'
    }
};

const mapStateToProps = state => {
    return {
        pricePrediction: state.pricePrediction,
        userState: state.userState
    };
};

export default connect(mapStateToProps, { pricePredictionFetch })(PricePrediction);
