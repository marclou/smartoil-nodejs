import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'native-base';


class SaveIcon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            payload: props.gasStation
        };
    }

    saveData() {
    }


    pressIcon() {
        this.setState({
            selected: !this.state.selected
        });
        this.saveData();
    }

    render() {
        const { containerStyle, iconStyle } = styles;

        return (
            <TouchableWithoutFeedback onPress={this.pressIcon.bind(this)}>
                <View style={containerStyle} >
                    <Icon name={this.state.selected ? 'ios-heart' : 'ios-heart-outline'} style={iconStyle} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    containerStyle: {
        alignSelf: 'center'
    },
    iconStyle: {
        fontSize: 25,
        color: 'red'
    }
};

export default SaveIcon;
