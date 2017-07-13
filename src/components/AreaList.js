import React, { Component } from 'react';
import { InteractionManager, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { Spinner, SegmentSelector, Area } from './functionalComponents';
import { selectArea, selectIndex } from '../actions/AreaListAction';
import {
    COLOR_FONT_SECONDARY,
    COLOR_BACKGROUND_QUATERNARY,
    COLOR_PRIMARY,
    FONT_CHARACTER_BOLD,
    FONT_CHARACTER_REGULAR
} from '../styles/common';

class AreaList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false
        };
        this.createDataSource(this.props.areaList);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
        });
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.areaList);
    }

    createDataSource(list) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(list);
    }

    isSelected(areaName) {
        const { selectedAreas } = this.props;
        const areas = Object.values(selectedAreas);
        let isSelected = false;

        areas.find(area => {
            if (area === areaName) {
                isSelected = true;
            }
            return isSelected;
        });
        return isSelected;
    }


    render() {
        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
        const {
            containerStyle,
            tabsContainerStyle,
            tabTextStyle,
            tabStyle,
            activeTabTextStyle,
            activeTabStyle,
            listStyle
        } = styles;
        const {
            selectedSegment,
            selectedAreas,
            areaList
        } = this.props;

        return (
            <View style={containerStyle}>
                <View>
                    <SegmentedControlTab
                        values={['시/도', '시/군/구', '읍/면/동']}
                        selectedIndex={selectedSegment}
                        onTabPress={(index) => this.props.selectIndex(index, selectedAreas)}
                        borderRadius={0}
                        tabsContainerStyle={tabsContainerStyle}
                        tabStyle={tabStyle}
                        tabTextStyle={tabTextStyle}
                        activeTabStyle={activeTabStyle}
                        activeTabTextStyle={activeTabTextStyle}
                    />
                    <SegmentSelector number={3} indexSelected={selectedSegment} />
                </View>
                <ListView
                    pageSize={areaList.length}
                    contentContainerStyle={listStyle}
                    dataSource={this.dataSource}
                    renderRow={
                        (rowData) =>
                            <Area
                                name={rowData.name}
                                selected={this.isSelected(rowData.name)}
                                onPress={() => this.props.selectArea(selectedSegment, rowData.name, selectedAreas)}
                            />
                    }
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
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
        color: COLOR_FONT_SECONDARY,
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
    },
    listStyle: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }
};

const mapStateToProps = state => {
    return {
        selectedAreas: state.areaListReducer.selectedAreas,
        areaList: state.areaListReducer.areasList,
        selectedSegment: state.areaListReducer.selectedSegment
    };
};

export default connect(mapStateToProps, { selectArea, selectIndex })(AreaList);
