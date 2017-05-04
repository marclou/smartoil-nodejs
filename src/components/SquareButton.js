import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Spinner } from './functionalComponents';

class SquareButton extends Component {
    onButtonPress() {
        const { fetchingData } = this.props;
        return fetchingData();
    }

    renderButtonOrSpinner() {
        const { loading, title, icon } = this.props.squareButtonState;
        const { buttonStyle, textStyle, iconStyle } = styles;
        if (loading) {
            return (
                <Spinner size='small' />
            );
        }
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={this.onButtonPress.bind(this)}>
                <View style={buttonStyle} >
                    <Text style={textStyle}>
                        {title}
                    </Text>
                    <Icon style={iconStyle} name={icon} />
                </View>
            </TouchableOpacity>
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
