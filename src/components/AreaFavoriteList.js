import React, { Component } from 'react';
import { InteractionManager, ListView, ScrollView, LayoutAnimation, UIManager, Platform } from 'react-native';
import { connect } from 'react-redux';

import { Spinner, Area } from './functionalComponents';
import { changeUserFavoriteArea } from '../actions';
import { COLOR_BACKGROUND_TERCIARY } from '../styles/common';
import { AREAS } from '../Type';

class AreaFavoriteList extends Component {
    static navigationOptions = {
        tabBarVisible: false,
        headerTitle: '지역',
    };

    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: true
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.createDataSource();
    }

    /*componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
        });
    }*/

    componentWillReceiveProps() {
        this.createDataSource();
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    createDataSource() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(AREAS);
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
                    pageSize={AREAS.length}
                    contentContainerStyle={listStyle}
                    dataSource={this.dataSource}
                    removeClippedSubviews={false}
                    renderRow={
                        (rowData) =>
                            <Area
                                name={rowData.value}
                                selected={rowData.code === userFavoriteArea.code}
                                onPress={this.props.changeUserFavoriteArea.bind(this, rowData)}
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
        backgroundColor: COLOR_BACKGROUND_TERCIARY,
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
