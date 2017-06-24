import React, { Component } from 'react';
import { InteractionManager, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { Spinner, SegmentSelector, Area } from './functionalComponents';
import { COLOR_FONT_SECONDARY, COLOR_BACKGROUND_QUATERNARY, COLOR_PRIMARY } from '../styles/common';

class AreaList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false
        };
        const obj = this.props.areaList.filter((obj) => {
            return obj.name === 'Wonju-si';
        })[0];

        this.createDataSource(this.props.areaList);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
        });
    }

    createDataSource(list) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(list);
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
            areaList,
            userSelection
        } = this.props;

        return (
            <View style={containerStyle}>
                <View>
                    <SegmentedControlTab
                        values={['시/도', '시/군/구', '읍/면/동']}
                        selectedIndex={selectedSegment}
                        onTabPress={() => console.log('lol')}
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
                                selected={false}
                                onPress={() => console.log('selected')}
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
        fontSize: 16
    },
    activeTabStyle: {
        backgroundColor: COLOR_BACKGROUND_QUATERNARY,
        borderWidth: 0,
    },
    activeTabTextStyle: {
        color: COLOR_PRIMARY,
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
        userSelection: state.areaListReducer.selectedAreas,
        areaList: state.areaListReducer.areasList,
        selectedSegment: state.areaListReducer.selectedSegment
    };
};

export default connect(mapStateToProps)(AreaList);
