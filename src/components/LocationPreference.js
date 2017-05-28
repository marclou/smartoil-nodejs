import React, { Component } from 'react';
import { View, Switch } from 'react-native';
import { connect } from 'react-redux';

import { changeUserAllowLocation } from '../actions';
import { Spinner } from './functionalComponents';

class LocationPreference extends Component {
    valueChanged(value) {
        this.props.changeUserAllowLocation(value);
    }

    render() {
        const { containerStyle } = styles;
        const { userAllowLocation, loadingLocation } = this.props.userLocationPreference;

        if (loadingLocation) {
            return (
                    <View style={containerStyle}>
                        <Spinner size='small' />
                    </View>
                );
        }
        return (
            <View style={containerStyle}>
                <Switch
                    disabled={loadingLocation}
                    value={userAllowLocation}
                    onValueChange={this.valueChanged.bind(this, userAllowLocation)}
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        alignSelf: 'center'
    }
};

const mapStateToProps = state => {
    return { userLocationPreference: state.userState };
};

export default connect(mapStateToProps, { changeUserAllowLocation })(LocationPreference);
