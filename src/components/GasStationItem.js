import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import { Actions } from 'react-native-router-flux';

import GasStationRow from './GasStationRow';
import { ListSection } from './functionalComponents';

class GasStationItem extends Component {
    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    onItemPress() {
        const { gasStation } = this.props;

        Actions.gasStationInfo({
            title: gasStation.name,
            gasStation: gasStation
        });
    }

    render() {
        const { gasStation } = this.props;

        return (
            <ListSection onPress={this.onItemPress.bind(this)} >
                <GasStationRow gasStation={gasStation} />
            </ListSection>
        );
    }
}

export default GasStationItem;
