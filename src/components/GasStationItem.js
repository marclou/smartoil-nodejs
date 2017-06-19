import React, { Component } from 'react';
import { LayoutAnimation, Modal, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import GasStationRow from './GasStationRow';
import { selectGasStation, deselectGasStation } from '../actions/GasStationListAction';
import { ListSection, PopModal } from './functionalComponents';

class GasStationItem extends Component {
    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    onItemPress() {
        const { gasStation } = this.props;

        Actions.gasStationInfo({
            title: gasStation.store_name,
            gasStation: gasStation
        });

        // if (!expanded) {
        //     this.props.selectGasStation(gasStation.uni_id);
        // } else {
        //     this.props.deselectGasStation();
        // }
    }

    renderModalOrGasStation() {
        const { gasStation, expanded } = this.props;

        if (this.props.expanded) {
            return (
                <View>
                    <Modal
                        animationType={'fade'}
                        transparent={false}
                        visible={expanded}
                        onRequestClose={() => this.props.deselectGasStation()}
                    >
                        <PopModal gasStation={gasStation} />
                        <TouchableHighlight
                            onPress={() => this.props.deselectGasStation()}
                        >
                            <Icon name='times' size={30} />
                        </TouchableHighlight>
                    </Modal>
                </View>
            );
        }
        return (<GasStationRow gasStation={gasStation} />);
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

const mapStateToProps = (state, ownProps) => {
    const expanded = state.gasStationList.selectedID === ownProps.gasStation.uni_id;

    return { expanded };
};

export default connect(mapStateToProps, { selectGasStation, deselectGasStation })(GasStationItem);
