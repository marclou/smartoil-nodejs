import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Fab from './Fab';
import { getUserPosition, getUserFavoriteGas } from '../actions';
import { SearchButton } from './functionalComponents';

class Welcome extends Component {
    componentDidMount() {
        this.props.getUserPosition();
        this.props.getUserFavoriteGas();
        this.addAsyncStorage();
    }

    onButtonPress(researchType) {
        switch (researchType) {
            case 'LOCATION':
                Actions.result();
                break;
            case 'AREA_LIST':
                return Actions.searchArea();
            default:
                return Actions.searchArea();
        }
    }

    // TO BE REMOVED
    addAsyncStorage() {
        const SB = [
            {
                id: 2,
                type: 'FIND_RESULT',
                loading: false,
                title: 'Yongsan',
                icon: 'pin'
            },
            {
                id: 3,
                type: 'FIND_RESULT',
                loading: false,
                title: 'Gangnam',
                icon: 'pin'
            }
        ];
        AsyncStorage.setItem('SquareButtons', JSON.stringify(SB));
    }

    render() {
        const { containerStyle } = styles;
        const { userAllowLocation } = this.props.userGlobalState;

        return (
            <View style={containerStyle} >
                <SearchButton
                    disabled={!userAllowLocation}
                    onPress={this.onButtonPress.bind(this, 'LOCATION')}
                    icon={'pin'}
                >
                    Use location
                </SearchButton>
                <Fab />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'space-around'
    }
};

const mapStateToProps = state => {
    return { userGlobalState: state.userState };
};

export default connect(mapStateToProps, { getUserPosition, getUserFavoriteGas })(Welcome);
