import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';

class InfoResult extends Component {
    componentWillMount() {
        this.state = {
            fadeAnim: new Animated.Value(0),
        };
    }
    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 2000
            }
        ).start();
    }

    render() {
        const { textContainer, textStyle } = styles;
        const { text } = this.props;
        const { fadeAnim } = this.state;

        return (
            <Animated.View style={{ ...textContainer, opacity: fadeAnim }}>
                <Text style={textStyle}>
                    {text}
                </Text>
            </Animated.View>
        );
    }
}

const styles = {
    textContainer: {
        width: 200,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15
    }
};

export default InfoResult;
