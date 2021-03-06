import React, { Component } from 'react';
import { View, Switch, Platform } from 'react-native';
import { connect } from 'react-redux';

import { changeUserAllowLocation } from '../actions';
import { Spinner } from './functionalComponents';
import { COLOR_PRIMARY } from '../styles/common';

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
                    onTintColor={Platform.OS === 'ios' ? COLOR_PRIMARY : 'rgba(25, 118, 210, 0.5)'}
                    thumbTintColor={Platform.OS === 'android' && userAllowLocation ? COLOR_PRIMARY : null}
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
