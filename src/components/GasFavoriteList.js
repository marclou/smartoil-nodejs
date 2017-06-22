import React, { Component } from 'react';
import { InteractionManager, ListView, View } from 'react-native';
import { connect } from 'react-redux';

import { Spinner, ListSection, SelectionItem } from './functionalComponents';
import { changeUserFavoriteGas } from '../actions';

class GasFavoriteList extends Component {
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
        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
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
        flex: 1
    }
};

const mapStateToProps = state => {
    return { userFavoriteGas: state.userState.userFavoriteGas };
};

export default connect(mapStateToProps, { changeUserFavoriteGas })(GasFavoriteList);
