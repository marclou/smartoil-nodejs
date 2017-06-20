import React, { Component } from 'react';
import { InteractionManager, ListView, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

import { loadFavorites } from '../actions';
import FavoriteItem from './FavoriteItem';
import { Spinner } from './functionalComponents';
import { PADDING_BOTTOM, COLOR_TEXT_TERTIARY } from '../styles/common';

class FavoriteGasStations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
        });
        this.props.loadFavorites();
        this.createDataSource(this.props);
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
        const { containerStyle, emptyContainerStyle, emptyImgStyle, emptyTextStyle } = styles;
        const { isComponentReady } = this.state;
        const { favoriteStations } = this.props;

        if (!isComponentReady) {
            return <Spinner />;
        }
        if (favoriteStations.length === 0) {
            return (
                <View style={emptyContainerStyle}>
                    <Image
                        style={emptyImgStyle}
                        source={require('../img/gas.png')}
                    />
                    <Text style={emptyTextStyle}>
                        단골 주유소가 없습니다.
                    </Text>
                </View>
            );
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
        paddingBottom: PADDING_BOTTOM
    },
    emptyContainerStyle: {
        flex: 1,
        paddingBottom: PADDING_BOTTOM,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyImgStyle: {
        marginLeft: 30,
        height: 150,
        width: 150
    },
    emptyTextStyle: {
        fontSize: 24,
        color: COLOR_TEXT_TERTIARY,
        paddingVertical: 10
    }
};

const mapStateToProps = state => {
    return { favoriteStations: state.favoriteStations.favoritesList };
};

export default connect(mapStateToProps, { loadFavorites })(FavoriteGasStations);
