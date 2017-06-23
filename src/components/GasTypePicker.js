import React, { Component } from 'react';
import { InteractionManager, Picker, View } from 'react-native';
import { connect } from 'react-redux';

import { Spinner } from './functionalComponents';
import { changeUserFavoriteGas } from '../actions';

class GasTypePicker extends Component {
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
    }

    render() {
        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
        const { containerStyle } = styles;
        const { userFavoriteGas } = this.props;

        return (
            <View style={containerStyle}>
                <Picker
                    selectedValue={userFavoriteGas}
                    onValueChange={(itemValue) => this.props.changeUserFavoriteGas(itemValue)}
                >
                    <Picker.Item label="Gasoline" value="Gasoline" />
                    <Picker.Item label="Premium Gasoline" value="Premium Gasoline" />
                    <Picker.Item label="Diesel" value="Diesel" />
                    <Picker.Item label="Heating Gas" value="Heating Gas" />
                </Picker>
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

export default connect(mapStateToProps, { changeUserFavoriteGas })(GasTypePicker);
