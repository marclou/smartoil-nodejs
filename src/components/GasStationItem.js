import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';

import GasStationRow from './GasStationRow';
import { ListSection } from './functionalComponents';

class GasStationItem extends Component {
    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    onItemPress() {
        const { uniId, priceInfo } = this.props.gasStation;
        const { navigate } = this.props;

        navigate('StationInfo', { stationUid: uniId, priceDiff: priceInfo.priceDiff });
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
