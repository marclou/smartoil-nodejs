import React, { Component } from 'react';
import { InteractionManager, ListView } from 'react-native';
import { connect } from 'react-redux';

import { loadFavorites } from '../actions';
import FavoriteItem from './FavoriteItem';
import { Spinner } from './functionalComponents';

class FavoriteGasStations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false
        };
        this.props.loadFavorites();
        this.createDataSource(this.props);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
        });
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ favoriteStations }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(favoriteStations);
    }

    render() {
        const { containerStyle } = styles;

        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
        return (
            <ListView
                enableEmptySections
                style={containerStyle}
                dataSource={this.dataSource}
                renderRow={(gasStation) => <FavoriteItem gasStation={gasStation} />}
            />
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        paddingBottom: 60
    }
};

const mapStateToProps = state => {
    return { favoriteStations: state.favoriteStations.favoritesList };
};

export default connect(mapStateToProps, { loadFavorites })(FavoriteGasStations);
