import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { Spinner, SegmentSelector, Area } from './functionalComponents';
import { changeDataSource, selectArea, selectIndex } from '../actions/AreaListAction';
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
        console.log('* CONSTRUCTOR *');
        this.createDataSource(props.areaList);
    }

    componentDidMount() {
        console.log('* COMPONENT DID MOUNT *');
        this.props.changeDataSource(this.props.selectedSegment, this.props.selectedAreas);
    }

    componentWillReceiveProps(nextProps) {
        console.log('----- Will Receive Props -----');
        this.createDataSource(nextProps.areaList);
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.loading) {
            return (this.props.areaList !== nextProps.areaList);
        }
        return (this.props.selectedSegment !== nextProps.selectedSegment) || (this.props.selectedAreas !== nextProps.selectedAreas);
    }

    componentWillUpdate(nextProps) {
        console.log('----- Will Update -----');
        this.props.changeDataSource(nextProps.selectedSegment, nextProps.selectedAreas);
    }

    componentDidUpdate() {
        console.log('----- Did Update -----');
        //this.props.changeDataSource(this.props.selectedSegment, this.props.selectedAreas);
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
        console.log('Render...');
        if (this.props.loading) {
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
                        onTabPress={(index) => this.props.selectIndex(index)}
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
                                name={rowData.districtName}
                                selected={this.isSelected(rowData)}
                                onPress={() => this.props.selectArea(rowData)}
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
        selectedSegment: state.areaListReducer.selectedSegment,
        loading: state.areaListReducer.loading
    };
};

export default connect(mapStateToProps, { changeDataSource, selectArea, selectIndex })(AreaList);
