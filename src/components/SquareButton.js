import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { Spinner } from './functionalComponents';

class SquareButton extends Component {
    onButtonPress() {
        const { type } = this.props.squareButtonProps;
        switch (type) {
            case 'FIND_RESULT':
                return Actions.resultList({ coords: { latitude: 37.55, longitude: 126.90 } });
            case 'ADD_LOCATION':
                return Actions.addArea();
            default:
                return null;
        }
    }

    displayAlert() {
        const { type, title } = this.props.squareButtonProps;

        if (type === 'FIND_RESULT') {
            Alert.alert(
                `Remove ${title}`,
                'Are you sure you want to remove this location?',
                [
                    { text: 'Cancel', onPress: () => {} },
                    { text: 'OK', onPress: () => console.log('pressed ok') }
                ],
                { cancelable: true }
            );
        }
    }

    renderButtonOrSpinner() {
        const { buttonStyle, textStyle, iconStyle } = styles;
        const { loading, title, icon } = this.props.squareButtonProps;

        if (loading) {
            return (
                <Spinner size='small' />
            );
        }
        return (
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={this.onButtonPress.bind(this)}
                onLongPress={this.displayAlert.bind(this)}
            >
                <View style={buttonStyle}>
                    <Text style={textStyle}>
                        {title}
                    </Text>
                    <Icon style={iconStyle} name={icon} />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle}>
                {this.renderButtonOrSpinner()}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        alignSelf: 'baseline',
        width: 100,
        height: 100
    },
    buttonStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#007AFF'
    },
    textStyle: {
        alignSelf: 'center'
    },
    iconStyle: {
        alignSelf: 'center'
    }
};

export default SquareButton;
