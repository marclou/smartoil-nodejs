import React, { Component } from 'react';
import { InteractionManager, ListView, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import areas from '../AreaList.json';
import { Spinner, Area } from './functionalComponents';
import { changeUserFavoriteArea } from '../actions';
import { COLOR_FONT_QUINARY } from '../styles/common';
import Styles from '../styles/NavigationStyle';

class AreaFavoriteList extends Component {
    static navigationOptions = {
        tabBarVisible: false,
        headerTitle: '지역',
        headerStyle: Styles.headerBackgroundPrimary,
        headerTitleStyle: Styles.headerTitlePrimary,
        headerTintColor: COLOR_FONT_QUINARY,
    };

    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false
        };
        this.createDataSource();
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
        });
    }

    componentWillReceiveProps() {
        this.createDataSource();
    }

    createDataSource() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(areas);
    }

    render() {
        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
        const { containerStyle, listStyle } = styles;
        const { userFavoriteArea } = this.props;

        return (
            <ScrollView style={containerStyle}>
                <ListView
                    pageSize={areas.length}
                    contentContainerStyle={listStyle}
                    dataSource={this.dataSource}
                    renderRow={
                        (rowData) =>
                            <Area
                                name={rowData.name}
                                selected={rowData.name === userFavoriteArea}
                                onPress={this.props.changeUserFavoriteArea.bind(this, rowData.name)}
                            />
                    }
                />
            </ScrollView>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 10,
    },
    listStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }
};

const mapStateToProps = state => {
    return { userFavoriteArea: state.userState.userFavoriteArea };
};

export default connect(mapStateToProps, { changeUserFavoriteArea })(AreaFavoriteList);
