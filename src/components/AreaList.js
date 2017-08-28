import React, { Component } from 'react';
import { View, ListView, LayoutAnimation, UIManager, Platform } from 'react-native';
import { connect } from 'react-redux';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { Spinner, SegmentSelector, Area, ErrorStatic } from './functionalComponents';
import { changeDataSource, selectArea, selectIndex } from '../actions/AreaListAction';
import {
    COLOR_FONT_SECONDARY,
    COLOR_BACKGROUND_QUATERNARY,
    COLOR_PRIMARY,
    FONT_CHARACTER_BOLD,
    FONT_CHARACTER_REGULAR
} from '../styles/common';
import Styles from '../styles/NavigationStyle';

class AreaList extends Component {
    static navigationOptions = {
        tabBarVisible: false,
        headerTitle: '지역으로 검색',
        headerTintColor: COLOR_FONT_SECONDARY,
        headerTitleStyle: Styles.headerTitleDark,
        headerStyle: [Styles.headerBackgroundDark, { shadowOpacity: 0 }],
        gesturesEnabled: false
    };

    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.createDataSource(props.areaList);
    }

    componentDidMount() {
        this.props.changeDataSource(this.props.selectedSegment, this.props.selectedAreas);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps.areaList);
    }

    shouldComponentUpdate(nextProps) {
        return (this.props.selectedSegment !== nextProps.selectedSegment)
            || (this.props.areaList !== nextProps.areaList)
            || (this.props.error !== nextProps.error);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.selectedSegment !== this.props.selectedSegment) {
            this.props.changeDataSource(nextProps.selectedSegment, nextProps.selectedAreas);
        }
        LayoutAnimation.spring();
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
            if (area !== null) {
                if (area.districtName === areaName.districtName) {
                    isSelected = true;
                }
            }
            return isSelected;
        });
        return isSelected;
    }


    render() {
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
            areaList,
            loading,
            error
        } = this.props;

        if (loading) {
            return <Spinner />;
        }
        if (error) {
            return (
                <ErrorStatic
                    title='Ooops, something went wrong'
                    message='But no worry, you can still refresh the result with the button below'
                    onPress={this.props.changeDataSource.bind(this, selectedSegment, selectedAreas)}
                />
            );
        }

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
                    enableEmptySections
                    renderRow={
                        (rowData) =>
                            <Area
                                name={rowData.districtName}
                                selected={this.isSelected(rowData)}
                                onPress={() => this.props.selectArea(rowData, selectedSegment)}
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
        loading: state.areaListReducer.loading,
        error: state.areaListReducer.error
    };
};

export default connect(mapStateToProps, { changeDataSource, selectArea, selectIndex })(AreaList);
