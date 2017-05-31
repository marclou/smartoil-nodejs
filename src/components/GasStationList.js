import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, SegmentedControlIOS, LayoutAnimation } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { gasStationFetch, selectFilter, deselectGasStation } from '../actions';
import GasStationItem from './GasStationItem';
import { Spinner } from './functionalComponents';


class GasStationList extends Component {
    componentWillMount() {
        if (this.props.gasStations.gasStationsLibraries.loading !== true) {
            this.createDataSource(this.props);
        }
    }

    componentDidMount() {
        const { latitude, longitude } = this.props.userState.userLocation;

        this.props.gasStationFetch(latitude, longitude);
    }

    componentWillReceiveProps(nextProps) {
        LayoutAnimation.spring();
        this.createDataSource(nextProps);
    }

    createDataSource({ gasStations, userState }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        const { gasStationsData } = gasStations.gasStationsLibraries;
        const { userFavoriteGas } = userState;


        const gasStationList = this.matchUserGasTypePreference(gasStationsData, userFavoriteGas);

        if (gasStations.selectedFilter === 0) {
            gasStationList.sort(this.sortByPrice);
        } else {
            gasStationList.sort(this.sortByDistance);
        }
        this.dataSource = ds.cloneWithRows(gasStationList);
    }

    sortByPrice(a, b) {
        let comparison = 0;
        if (a.price > b.price) {
            comparison = 1;
        } else if (a.price < b.price) {
            comparison = -1;
        }
        return comparison;
    }

    sortByDistance(a, b) {
        let comparison = 0;
        if (a.distance > b.distance) {
            comparison = 1;
        } else if (a.distance < b.distance) {
            comparison = -1;
        }
        return comparison;
    }

    matchUserGasTypePreference(array, userPreference) {
        let result = [];

        switch (userPreference) {
            case 'Gasoline':
                result = array.map((object) => {
                    const price = { price: object.oil };
                    return Object.assign(object, price);
                });
                break;
            case 'Premium Gasoline':
                result = array.map((object) => {
                    const price = { price: object.premium_oil };
                    return Object.assign(object, price);
                });
                break;
            case 'Diesel':
                result = array.map((object) => {
                    const price = { price: object.diesel };
                    return Object.assign(object, price);
                });
                break;
            case 'Heating gas':
                result = array.map((object) => {
                    const price = { price: object.heating_oil };
                    return Object.assign(object, price);
                });
                break;
        }
        return result;
    }

    changeFilter(id) {
        this.props.deselectGasStation();
        this.props.selectFilter(id);
    }

    renderListOrSpinner() {
        const { gasStationsLibraries, selectedFilter } = this.props.gasStations;

        if (gasStationsLibraries.loading) {
            return <Spinner size='large' />;
        }
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={(gasStation) => <GasStationItem gasStation={gasStation} />}
                renderHeader={() =>
                    <View style={{ padding: 10 }}>
                        <SegmentedControlTab
                            values={['Cheapest', 'Nearest']}
                            selectedIndex={selectedFilter}
                            onTabPress={this.changeFilter.bind(this, selectedFilter)}
                        />
                    </View>
                }
            />
        );
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                {this.renderListOrSpinner()}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    }
};

const mapStateToProps = state => {
    return {
        gasStations: state.gasStationList,
        userState: state.userState
    };
};

export default connect(mapStateToProps, { gasStationFetch, selectFilter, deselectGasStation })(GasStationList);
