import React, { Component } from 'react';
import { StyleSheet, Modal, TouchableOpacity, View, Dimensions, PanResponder, Animated, Text, Image } from 'react-native';

class AndroidActionSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panY: new Animated.Value(0),
            opacity: new Animated.Value(0.5),
        };

        this.state.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([
                null,
                {
                    dy: this.state.panY,
                },
            ]),
            onPanResponderRelease: (e, gestureState) => {
                switch (true) {
                    case gestureState.dy > 100:
                        Animated.timing(this.state.panY, {
                            toValue: -1,
                            duration: 2000,
                        }).start();
                        //this.state.panY.setOffset(-1);
                        break;
                    case gestureState.dy < -100:
                        Animated.timing(this._animation, {
                            toValue: 1,
                            duration: 2000
                        }).start();
                        //this.state.panY.setOffset(1);
                        break;
                    default:
                        //this.state.panY.setOffset(0);
                        Animated.timing(this.state.panY, {
                            toValue: 0,
                            duration: 200,
                        }).start();
                        break;
                }
                this.state.panY.removeAllListeners();
            }
        });
    }

    render() {
        const { visible, animationType, transparent, onBackgroundPress } = this.props;
        const { backgroundStyle, containerStyle } = styles;
        const { panY, opacity, panResponder } = this.state;

        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;

        const opacityInterpolate = opacity.interpolate({
            inputRange: [-1, 1],
            outputRange: [0.1, 0.9],
        });

        const heightInterpolate = panY.interpolate({
            inputRange: [-1, 1],
            outputRange: [50, height],
            extrapolate: 'clamp'
        });

        let contentAnimationStyle = {
            height: heightInterpolate
        };

        let backgroundAnimationStyle = {
            opacity: opacityInterpolate
        };

        return (
            <Modal
                visible={visible}
                animationType={animationType}
                transparent={transparent}
                onRequestClose={onBackgroundPress}
            >
                <Animated.View
                    style={[backgroundStyle, backgroundAnimationStyle]}
                    // onPress={onBackgroundPress}
                />
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[containerStyle, contentAnimationStyle]}
                />
            </Modal>
        );
    }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        backgroundColor: 'black'
    },
    containerStyle: {
        height: 300,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    }
});

export default AndroidActionSheet;
