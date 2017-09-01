import React, { Component } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';

import GasStationRow from './GasStationRow';
import { ListSection } from './functionalComponents';

class GasStationItem extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    onItemPress() {
        const { uniId, priceInfo, realTimeVariables } = this.props.gasStation;
        const { navigate } = this.props;

        navigate('StationInfo', { stationUid: uniId, priceDiff: priceInfo.priceDiff, realTimeVariables: realTimeVariables });
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
