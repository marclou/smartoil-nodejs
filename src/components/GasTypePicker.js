import React, { Component } from 'react';
import { Picker, View } from 'react-native';
import { connect } from 'react-redux';

import { changeUserFavoriteGas } from '../actions';
import { GAS_TYPE } from '../Type';

class GasTypePicker extends Component {
    saveFavoriteGas(gasCode, index) {
        const { userFavoriteGas } = this.props;

        if (userFavoriteGas.code !== gasCode) {
            this.props.changeUserFavoriteGas(GAS_TYPE[index]);
        }
    }

    render() {
        const { containerStyle } = styles;
        const { userFavoriteGas } = this.props;

        return (
            <View style={containerStyle}>
                <Picker
                    selectedValue={userFavoriteGas.code}
                    onValueChange={(itemValue, itemIndex) => this.saveFavoriteGas(itemValue, itemIndex)}
                >
                    {GAS_TYPE.map((gasType, i) => {
                        return (
                            <Picker.Item label={gasType.value} value={gasType.code} key={i} />
                        );
                    })}
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
