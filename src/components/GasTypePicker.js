import React, { Component } from 'react';
import { Picker, View } from 'react-native';
import { connect } from 'react-redux';

import { changeUserFavoriteGas } from '../actions';
import {
    GASOLINE,
    PREMIUM_GASOLINE,
    DIESEL,
    LPG
} from '../Type';

class GasTypePicker extends Component {
    saveFavoriteGas(gasType) {
        const { userFavoriteGas } = this.props;

        if (userFavoriteGas.code !== gasType) {
            switch (gasType) {
                case GASOLINE.code:
                    this.props.changeUserFavoriteGas(GASOLINE);
                    break;
                case DIESEL.code:
                    this.props.changeUserFavoriteGas(DIESEL);
                    break;
                case PREMIUM_GASOLINE.code:
                    this.props.changeUserFavoriteGas(PREMIUM_GASOLINE);
                    break;
                case LPG.code:
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
                <Picker
                    selectedValue={userFavoriteGas.code}
                    onValueChange={itemValue => this.saveFavoriteGas(itemValue)}
                >
                    <Picker.Item label={GASOLINE.value} value={GASOLINE.code} />
                    <Picker.Item label={DIESEL.value} value={DIESEL.code} />
                    <Picker.Item label={PREMIUM_GASOLINE.value} value={PREMIUM_GASOLINE.code} />
                    <Picker.Item label={LPG.value} value={LPG.code} />
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
