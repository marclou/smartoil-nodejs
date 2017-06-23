import React, { Component } from 'react';
import { InteractionManager, ListView, View } from 'react-native';
import { connect } from 'react-redux';

import { Spinner, ListSection, SelectionItem } from './functionalComponents';
import { changeUserTankCapacity } from '../actions';
import { PADDING_BOTTOM } from '../styles/common';

class TankCapacityFavoriteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false
        };
        this.tankCapacity = [];
        for (let i = 8; i < 25; i++) {
            this.tankCapacity.push(i * 5);
        }
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
        this.dataSource = ds.cloneWithRows(this.tankCapacity);
    }

    render() {
        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
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
        paddingBottom: PADDING_BOTTOM
    }
};

const mapStateToProps = state => {
    return { userTankCapacity: state.userState.userTankCapacity };
};

export default connect(mapStateToProps, { changeUserTankCapacity })(TankCapacityFavoriteList);
