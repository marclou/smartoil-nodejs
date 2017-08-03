import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';

import { ListSection, SelectionItem } from './functionalComponents';
import { changeUserFavoriteGas } from '../actions';
import {
    COLOR_BACKGROUND_TERCIARY,
    PADDING_BOTTOM
} from '../styles/common';
import {
    GASOLINE,
    DIESEL,
    PREMIUM_GASOLINE,
    LPG
} from '../Type';

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
            GASOLINE.value,
            DIESEL.value,
            PREMIUM_GASOLINE.value,
            LPG.value
        ];
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(gasType);
    }

    saveFavoriteGas(gasType) {
        const { userFavoriteGas } = this.props;

        if (userFavoriteGas.value !== gasType) {
            switch (gasType) {
                case GASOLINE.value:
                    this.props.changeUserFavoriteGas(GASOLINE);
                    break;
                case DIESEL.value:
                    this.props.changeUserFavoriteGas(DIESEL);
                    break;
                case PREMIUM_GASOLINE.value:
                    this.props.changeUserFavoriteGas(PREMIUM_GASOLINE);
                    break;
                case LPG.value:
                    this.props.changeUserFavoriteGas(LPG);
                    break;
                default:
                    this.props.changeUserFavoriteGas(GASOLINE);
                    break;
            }
        }
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
                            <ListSection onPress={this.saveFavoriteGas.bind(this, rowData)}>
                                <SelectionItem value={rowData} selected={rowData === userFavoriteGas.value} />
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
