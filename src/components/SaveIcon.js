import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';

import { isSaved, addFavorite, deleteFavorite } from '../actions';

class SaveIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: isSaved(props.gasStation.uni_id)
        };
    }

    saveData() {
        const { gasStation } = this.props;

        if (!this.state.selected) {
            this.props.addFavorite(gasStation);
        } else {
            this.props.deleteFavorite(gasStation.uni_id);
        }
        this.setState({
            selected: isSaved(gasStation.uni_id)
        });
    }


    pressIcon() {
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

export default connect(null, { addFavorite, deleteFavorite })(SaveIcon);
