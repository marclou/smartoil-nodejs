import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';

import realm from '../Realm';

class FavoriteGasStations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gasStationList: []
        };
        this.createDataSource();
    }

    componentWillUpdate() {
        this.createDataSource();
    }

    createDataSource() {
        const stationList = realm.objects('GasStationsList');
        const gasStationList = stationList[0].gasStations;

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state.gasStationList = ds.cloneWithRows(gasStationList);
    }

    render() {
        const { containerStyle } = styles;

        return (
            <ListView
                enableEmptySections
                style={containerStyle}
                dataSource={this.state.gasStationList}
                renderRow={(gasStation) =>
                    <View style={{padding: 10}}>
                        <Text>
                            {gasStation.name}
                        </Text>
                    </View>
                }
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
