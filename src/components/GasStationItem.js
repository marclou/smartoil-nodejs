import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';

import GasStationRow from './GasStationRow';
import GasStationSelectedRow from './GasStationSelectedRow';
import { selectGasStation, deselectGasStation } from '../actions/GasStationListAction';
import { ListSection } from './functionalComponents';

class GasStationItem extends Component {
    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    onItemPress() {
        const { expanded, gasStation } = this.props;

        if (!expanded) {
            this.props.selectGasStation(gasStation.uni_id);
        } else {
            this.props.deselectGasStation();
        }
    }

    /*openDirections() {
        const { latitude, longitude } = this.props.gasStation.location;
        switch (Platform.OS) {
            case 'ios':
                return Linking.openURL(`http://maps.apple.com/maps?daddr=${latitude},${longitude}`);
            case 'android':
                return Linking.openURL(`http://maps.google.com/maps?daddr=${latitude},${longitude}`);
            default:
                return console.log('which plateform ?');
        }
    }*/

    renderDescription() {
        if (this.props.expanded) {
            return (
                <GasStationSelectedRow gasStation={this.props.gasStation} />
            );
        }
        return (
            <GasStationRow gasStation={this.props.gasStation} />
        );
    }

    render() {
        return (
            <ListSection onPress={this.onItemPress.bind(this)} >
                {this.renderDescription()}
            </ListSection>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const expanded = state.gasStationList.selectedID === ownProps.gasStation.uni_id;

    return { expanded };
};

export default connect(mapStateToProps, { selectGasStation, deselectGasStation })(GasStationItem);
