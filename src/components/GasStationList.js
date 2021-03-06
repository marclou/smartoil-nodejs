import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { gasStationFetch, areaGasStationFetch, selectFilter } from '../actions';
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
        const { userLocation, userFavoriteGas, userTankCapacity, userDistanceRange } = this.props.userState;
        const { isFromAreaList } = this.props;

        if (isFromAreaList) {
            const { area, department, region } = this.props.areaList;

            this.props.areaGasStationFetch(area.districtName, department.districtName, region.disctrictName, userFavoriteGas.code, userTankCapacity, userDistanceRange);
        } else {
            this.props.gasStationFetch(userLocation.latitude, userLocation.longitude, userFavoriteGas.code, userTankCapacity, userDistanceRange);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ gasStations, isFromAreaList }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        const { gasStationsData } = gasStations.gasStationsLibraries;

        if (gasStations.selectedFilter === 0) {
            gasStationsData.sort(this.sortByPrice);
        } else {
            if (isFromAreaList) {
                gasStationsData.sort(this.sortByStraightDistance);
            } else {
                gasStationsData.sort(this.sortByRealDistance);
            }
        }
        this.dataSource = ds.cloneWithRows(gasStationsData);
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

    sortByStraightDistance(a, b) {
        let comparison = 0;

        if (a.distance > b.distance) {
            comparison = 1;
        } else if (a.distance < b.distance) {
            comparison = -1;
        }
        return comparison;
    }

    sortByRealDistance(a, b) {
        let comparison = 0;

        if (a.realTimeVariables.totalDistance > b.realTimeVariables.totalDistance) {
            comparison = 1;
        } else if (a.realTimeVariables.totalDistance < b.realTimeVariables.totalDistance) {
            comparison = -1;
        }
        return comparison;
    }

    changeFilter(id) {
        this.props.selectFilter(id);
    }

    renderListOrSpinner() {
        const { gasStationsLibraries, selectedFilter } = this.props.gasStations;
        const { userLocation, userFavoriteGas, userTankCapacity, userDistanceRange } = this.props.userState;
        const { area, department, region } = this.props.areaList;
        const { navigate, isFromAreaList } = this.props;
        const { containerStyle, tabsContainerStyle, tabStyle, tabTextStyle, activeTabStyle, activeTabTextStyle } = styles;

        if (gasStationsLibraries.loading) {
            return <Spinner size='large' />;
        }
        if (gasStationsLibraries.error) {
            return (
                <ErrorStatic
                    title='Ooops, something went wrong'
                    message='But no worry, you can still refresh the result with the button below'
                    onPress={
                        isFromAreaList ? this.props.areaGasStationFetch.bind(this, area.districtName, department.districtName, region.disctrictName, userFavoriteGas.code, userTankCapacity, userDistanceRange) :
                        this.props.gasStationFetch.bind(this, userLocation.latitude, userLocation.longitude, userFavoriteGas.code, userTankCapacity, userDistanceRange)}
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
                    renderRow={(gasStation) => <GasStationItem gasStation={gasStation} navigate={navigate} />}
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
        userState: state.userState,
        areaList: state.areaListReducer.selectedAreas
    };
};

export default connect(mapStateToProps, { gasStationFetch, areaGasStationFetch, selectFilter })(GasStationList);
