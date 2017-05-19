import React, { Component } from 'react';
import { View, Switch } from 'react-native';
import { connect } from 'react-redux';

import { changeUserAllowLocation } from '../actions';

class LocationPreference extends Component {

    valueChanged(value) {
        this.props.changeUserAllowLocation(value);
    }

    render() {
        const { containerStyle } = styles;
        const { userAllowLocation } = this.props.userLocationPreference;

        return (
            <View style={containerStyle}>
                <Switch
                    value={userAllowLocation}
                    onValueChange={this.valueChanged.bind(this, userAllowLocation)}
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        padding: 10,
        paddingBottom: 5
    }
};

const mapStateToProps = state => {
    return { userLocationPreference: state.userState };
};

export default connect(mapStateToProps, { changeUserAllowLocation })(LocationPreference);
