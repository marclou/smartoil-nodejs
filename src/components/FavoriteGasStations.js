import React, { Component } from 'react';
import { InteractionManager, ListView } from 'react-native';
import { connect } from 'react-redux';

import realm from '../Realm';
import FavoriteItem from './FavoriteItem';
import { Spinner } from './functionalComponents';

class FavoriteGasStations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false,
            gasStationList: []
        };
        this.createDataSource();
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
        });
    }

    componentWillUpdate() {
        this.createDataSource();
    }

    createDataSource() {
        const stationsRealm = realm.objects('GasStationsList');
        const gasStationList = stationsRealm[0].gasStations;

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state.gasStationList = ds.cloneWithRows(gasStationList);
    }

    render() {
        const { containerStyle } = styles;

        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
        return (
            <ListView
                enableEmptySections
                style={containerStyle}
                dataSource={this.state.gasStationList}
                renderRow={(gasStation) => <FavoriteItem gasStation={gasStation} />}
            />
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        paddingBottom: 60
    }
};

export default connect()(FavoriteGasStations);
