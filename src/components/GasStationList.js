import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { gasStationFetch, selectFilter } from '../actions';
import GasStationItem from './GasStationItem';
import {
    Spinner,
    SegmentSelector,
    ErrorStatic
} from './functionalComponents';
import {
    COLOR_PRIMARY,
    COLOR_BACKGROUND_TERCIARY,
    COLOR_BACKGROUND_QUATERNARY,
    COLOR_FONT_QUATERNARY,
    FONT_CHARACTER_REGULAR,
    FONT_CHARACTER_BOLD
} from '../styles/common';

class GasStationList extends Component {
    constructor(props) {
        super(props);
        this.createDataSource(props);
    }

    componentDidMount() {
        const { userLocation, userFavoriteGas } = this.props.userState;

        this.props.gasStationFetch(userLocation.latitude, userLocation.longitude, userFavoriteGas.code);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ gasStations }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        const { gasStationsData, loading, error } = gasStations.gasStationsLibraries;

        if (!loading && !error) {
            this.comparePrice(gasStationsData);
        }
        if (gasStations.selectedFilter === 0) {
            gasStationsData.sort(this.sortByPrice);
        } else {
            gasStationsData.sort(this.sortByDistance);
        }
        this.dataSource = ds.cloneWithRows(gasStationsData);
    }

    comparePrice(gasStationsList) {
        gasStationsList.sort(this.sortByPrice);
        const highestPrice = gasStationsList.slice(-1)[0].priceInfo.price;
        const { userTankCapacity } = this.props.userState;

        return gasStationsList.map((gasStation) => {
            const priceDiff = { priceDiff: (highestPrice - gasStation.priceInfo.price) * userTankCapacity };
            return Object.assign(gasStation.priceInfo, priceDiff);
        });
    }

    sortByPrice(a, b) {
        let comparison = 0;
        if (a.priceInfo.price > b.priceInfo.price) {
            comparison = 1;
        } else if (a.priceInfo.price < b.priceInfo.price) {
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

    changeFilter(id) {
        this.props.selectFilter(id);
    }

    renderListOrSpinner() {
        const { gasStationsLibraries, selectedFilter } = this.props.gasStations;
        const { userLocation, userFavoriteGas } = this.props.userState;
        const { containerStyle, tabsContainerStyle, tabStyle, tabTextStyle, activeTabStyle, activeTabTextStyle } = styles;

        if (gasStationsLibraries.loading) {
            return <Spinner size='large' />;
        }
        if (gasStationsLibraries.error) {
            return (
                <ErrorStatic
                    title='Ooops, something went wrong'
                    message='But no worry, you can still refresh the result with the button below'
                    onPress={this.props.gasStationFetch.bind(this, userLocation.latitude, userLocation.longitude, userFavoriteGas.code)}
                />
            );
        }
        return (
            <View style={containerStyle}>
                <View>
                    <SegmentedControlTab
                        values={['가장 싼', '가까운']}
                        selectedIndex={selectedFilter}
                        onTabPress={this.changeFilter.bind(this, selectedFilter)}
                        borderRadius={0}
                        tabsContainerStyle={tabsContainerStyle}
                        tabStyle={tabStyle}
                        tabTextStyle={tabTextStyle}
                        activeTabStyle={activeTabStyle}
                        activeTabTextStyle={activeTabTextStyle}
                    />
                    <SegmentSelector number={2} indexSelected={selectedFilter} />
                </View>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={(gasStation) => <GasStationItem gasStation={gasStation} />}
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
        flex: 1,
        backgroundColor: COLOR_BACKGROUND_TERCIARY
    },
    tabsContainerStyle: {
        backgroundColor: COLOR_BACKGROUND_QUATERNARY,
        borderBottomWidth: 0,
        padding: 8
    },
    tabStyle: {
        backgroundColor: COLOR_BACKGROUND_QUATERNARY,
        borderWidth: 0
    },
    tabTextStyle: {
        color: COLOR_FONT_QUATERNARY,
        fontFamily: FONT_CHARACTER_REGULAR,
        fontSize: 16
    },
    activeTabStyle: {
        backgroundColor: COLOR_BACKGROUND_QUATERNARY,
        borderWidth: 0,
    },
    activeTabTextStyle: {
        color: COLOR_PRIMARY,
        fontFamily: FONT_CHARACTER_BOLD,
        fontSize: 16
    }
};

const mapStateToProps = state => {
    return {
        gasStations: state.gasStationList,
        userState: state.userState
    };
};

export default connect(mapStateToProps, { gasStationFetch, selectFilter })(GasStationList);
