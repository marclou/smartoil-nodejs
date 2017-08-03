import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import { isSaved, addFavorite, deleteFavorite } from '../actions';
import { COLOR_PRIMARY, COLOR_BACKGROUND_PRIMARY } from '../styles/common';

class SaveIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: isSaved(props.gasStation.uniId)
        };
    }

    saveData() {
        const { gasStation } = this.props;

        if (!this.state.selected) {
            this.props.addFavorite(gasStation);
        } else {
            this.props.deleteFavorite(gasStation.uniId);
        }
        this.setState({
            selected: isSaved(gasStation.uniId)
        });
    }


    pressIcon() {
        this.saveData();
    }

    render() {
        const { containerStyle, selectedIconStyle, iconStyle } = styles;

        return (
            <TouchableWithoutFeedback onPress={this.pressIcon.bind(this)}>
                <View style={containerStyle} >
                    <Icon name='heart' style={this.state.selected ? selectedIconStyle : iconStyle} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    containerStyle: {
        alignSelf: 'center',
        padding: 15
    },
    selectedIconStyle: {
        fontSize: 20,
        color: COLOR_PRIMARY
    },
    iconStyle: {
        fontSize: 20,
        color: COLOR_BACKGROUND_PRIMARY
    }
};

export default connect(null, { addFavorite, deleteFavorite })(SaveIcon);
