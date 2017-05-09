import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';

import { gasStationFetch } from '../actions';
import GasStationItem from './GasStationItem';
import { Spinner } from './functionalComponents';


class GasStationList extends Component {
    componentWillMount() {
        const { latitude, longitude } = this.props.coords;

        this.props.gasStationFetch(latitude, longitude);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ gasStationsLibraries }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        const { gasStationsData, userGasTypePreference } = gasStationsLibraries;
        this.dataSource = ds.cloneWithRows(this.matchUserGasTypePreference(gasStationsData, userGasTypePreference));
    }

    matchUserGasTypePreference(array, userPreference) {
        let result = [];

        switch (userPreference) {
            case 'Gasoline':
                result = array.map((object) => {
                    const price = { price: object.price_oil };
                    return Object.assign(object, price);
                });
                break;
            case 'Premium Gasoline':
                result = array.map((object) => {
                    const price = { price: object.price_premium_oil };
                    return Object.assign(object, price);
                });
                break;
            case 'Diesel':
                result = array.map((object) => {
                    const price = { price: object.price_dissel };
                    return Object.assign(object, price);
                });
                break;
            case 'Heating gas':
                result = array.map((object) => {
                    const price = { price: object.price_heating_oil };
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

    render() {
        return (
            this.renderListOrSpinner()
        );
    }
}

const mapStateToProps = state => {
    return { gasStationsLibraries: state.gasStationsLibraries };
};

export default connect(mapStateToProps, { gasStationFetch })(GasStationList);
