import React, { Component } from 'react';
import { ListView, View, InteractionManager } from 'react-native';
import { connect } from 'react-redux';

import { ListSection, SelectionItem, Spinner } from './functionalComponents';
import { changeUserFavoriteGas } from '../actions';
import {
    COLOR_BACKGROUND_TERCIARY,
} from '../styles/common';
import { GAS_TYPE } from '../Type';

class GasFavoriteList extends Component {
    static navigationOptions = {
        tabBarVisible: false,
        headerTitle: '기름 종류',
    };

    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false
        };
        this.gasType = GAS_TYPE;
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
        this.dataSource = ds.cloneWithRows(this.gasType);
    }

    saveFavoriteGas(gasType) {
        const { userFavoriteGas } = this.props;

        if (userFavoriteGas.code !== gasType.code) {
            this.props.changeUserFavoriteGas(gasType);
        }
    }

    renderRow(rowData) {
        const { userFavoriteGas } = this.props;

        return (
            <ListSection onPress={this.saveFavoriteGas.bind(this, rowData)}>
                <SelectionItem value={rowData.value} selected={rowData.code === userFavoriteGas.code} />
            </ListSection>
        );
    }

    render() {
        const { containerStyle } = styles;

        if (!this.state.isComponentReady) {
            return <Spinner />;
        }

        return (
            <View style={containerStyle}>
                <ListView
                    dataSource={this.dataSource}
                    pageSize={this.gasType.length}
                    renderRow={
                        (rowData) => this.renderRow(rowData)
                    }
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND_TERCIARY
    }
};

const mapStateToProps = state => {
    return { userFavoriteGas: state.userState.userFavoriteGas };
};

export default connect(mapStateToProps, { changeUserFavoriteGas })(GasFavoriteList);
