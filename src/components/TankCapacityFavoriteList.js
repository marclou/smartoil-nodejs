import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';

import { ListSection, SelectionItem } from './functionalComponents';
import { changeUserTankCapacity } from '../actions';
import { COLOR_BACKGROUND_TERCIARY, COLOR_FONT_QUINARY } from '../styles/common';
import Styles from '../styles/NavigationStyle';

class TankCapacityFavoriteList extends Component {
    static navigationOptions = {
        tabBarVisible: false,
        headerTitle: '리터량',
        headerStyle: Styles.headerBackgroundPrimary,
        headerTitleStyle: Styles.headerTitlePrimary,
        headerTintColor: COLOR_FONT_QUINARY
    };

    constructor(props) {
        super(props);
        this.tankCapacity = [];
        for (let i = 8; i < 25; i++) {
            this.tankCapacity.push(i * 5);
        }
        this.createDataSource();
    }

    componentWillReceiveProps() {
        this.createDataSource();
    }

    createDataSource() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(this.tankCapacity);
    }

    render() {
        const { containerStyle } = styles;
        const { userTankCapacity } = this.props;

        return (
            <View style={containerStyle}>
                <ListView
                    dataSource={this.dataSource}
                    renderRow={
                        (rowData) =>
                            <ListSection onPress={this.props.changeUserTankCapacity.bind(this, rowData)}>
                                <SelectionItem value={`${rowData} L`} selected={rowData === userTankCapacity} />
                            </ListSection>
                    }
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND_TERCIARY,
    }
};

const mapStateToProps = state => {
    return { userTankCapacity: state.userState.userTankCapacity };
};

export default connect(mapStateToProps, { changeUserTankCapacity })(TankCapacityFavoriteList);
