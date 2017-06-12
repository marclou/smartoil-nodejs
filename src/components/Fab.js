import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

import { Blur } from './functionalComponents';

class Fab extends Component {
    displayAlert(alertTitle, alertMessage, error) {
        Alert.alert(
            alertTitle,
            alertMessage,
            [
                { text: 'OK', onPress: () => console.log(error) },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ],
            { cancelable: false }
        );
    }

    allowLocationSearch() {
        const { userAllowLocation } = this.props.userState;

        if (userAllowLocation) {
            return Actions.result();
        }
        return this.displayAlert('Alert', 'Please, turn on your location to use our services', null);
    }

    render() {
        const { actionButtonIconStyle, actionButtonPopIconStyle } = styles;

        return (
            <ActionButton
                buttonColor='#3498db'
                icon={<Icon name='search' style={actionButtonIconStyle} />}
                offsetY={70}
                degrees={45}
                backdrop={<Blur />}
            >
                <ActionButton.Item
                    buttonColor='#EEE'
                    title='Location'
                    onPress={this.allowLocationSearch.bind(this)}
                >
                    <Icon
                        name='pin'
                        style={actionButtonPopIconStyle}
                    />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor='#EEE'
                    title='Areas'
                    onPress={() => Actions.searchArea()}
                >
                    <Icon
                        name='list'
                        style={actionButtonPopIconStyle}
                    />
                </ActionButton.Item>
            </ActionButton>
        );
    }
}

const styles = {
    actionButtonIconStyle: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    actionButtonPopIconStyle: {
        fontSize: 16,
        height: 18,
        color: 'black',
    }

};

const mapStateToProps = state => {
    return { userState: state.userState };
};

export default connect(mapStateToProps)(Fab);
