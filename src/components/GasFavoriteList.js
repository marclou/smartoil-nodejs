import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';

import { ListSection, SelectionItem } from './functionalComponents';
import { changeUserFavoriteGas } from '../actions';
import {
    COLOR_BACKGROUND_TERCIARY,
    PADDING_BOTTOM
} from '../styles/common';

class GasFavoriteList extends Component {
    constructor(props) {
        super(props);
        this.createDataSource();
    }

    componentWillReceiveProps() {
        this.createDataSource();
    }

    createDataSource() {
        const gasType = [
            'Gasoline',
            'Premium Gasoline',
            'Diesel',
            'Heating gas'
        ];
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(gasType);
    }

    render() {
        const { containerStyle } = styles;
        const { userFavoriteGas } = this.props;

        return (
            <View style={containerStyle}>
                <ListView
                    dataSource={this.dataSource}
                    renderRow={
                        (rowData) =>
                            <ListSection onPress={this.props.changeUserFavoriteGas.bind(this, rowData)}>
                                <SelectionItem value={rowData} selected={rowData === userFavoriteGas} />
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
        paddingBottom: PADDING_BOTTOM
    }
};

const mapStateToProps = state => {
    return { userFavoriteGas: state.userState.userFavoriteGas };
};

export default connect(mapStateToProps, { changeUserFavoriteGas })(GasFavoriteList);
