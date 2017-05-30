import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, SegmentedControlIOS } from 'react-native';

import { gasStationFetch } from '../actions';
import GasStationItem from './GasStationItem';
import { Spinner } from './functionalComponents';


class GasStationList extends Component {
    componentWillMount() {
        if (this.props.gasStationsLibraries.loading !== true) {
            this.createDataSource(this.props);
        }
    }

    componentDidMount() {
        const { latitude, longitude } = this.props.coords;

        this.props.gasStationFetch(latitude, longitude);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ gasStationsLibraries, gasType }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        const { gasStationsData } = gasStationsLibraries;

        const gasStationList = this.matchUserGasTypePreference(gasStationsData, gasType);
        gasStationList.sort(this.sortByPrice);

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

    /** Function to return a Spinner (loading = true)
     * when gas station datas aren't fetched from DB yet.
     **/
    renderListOrSpinner() {
        const { loading } = this.props.gasStationsLibraries;

        if (loading) {
            return <Spinner size='large' />;
        }
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
                renderHeader={this.renderHeader}
            />
        );
    }

    /** Function to tell ListView Component how each row should be rendered **/
    renderRow(gasStation) {
        return (
            <GasStationItem
                gasStation={gasStation}
            />
        );
    }

    renderHeader() {
        return (
            <View style={{ padding: 10 }}>
                <SegmentedControlIOS
                    values={['Nearest', 'Cheapest']}
                />
            </View>
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
        gasStationsLibraries: state.gasStationList.gasStationsLibraries,
        gasType: state.userState.userFavoriteGas
    };
};

export default connect(mapStateToProps, { gasStationFetch })(GasStationList);
