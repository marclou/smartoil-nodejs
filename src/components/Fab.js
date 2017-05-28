import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

class Fab extends Component {
    render() {
        const { actionButtonIconStyle } = styles;

        return (
            <ActionButton
                buttonColor='rgba(231,76,60,1)'
                bgColor='rgba(0,0,0,0.1)'
                icon={<Icon name='search' style={actionButtonIconStyle} />}
            >
                <ActionButton.Item
                    buttonColor='#9b59b6'
                    title='Location'
                    onPress={() => Actions.result()}
                >
                    <Icon
                        name='pin'
                        style={actionButtonIconStyle}
                    />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor='#3498db'
                    title='Areas'
                    onPress={() => Actions.searchArea()}
                >
                    <Icon
                        name='list'
                        style={actionButtonIconStyle}
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
    }
};

export default Fab;
