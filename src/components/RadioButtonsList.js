import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { RadioButtons } from 'react-native-radio-buttons';
import { Icon } from 'native-base';

import { changeUserFavoriteGas } from '../actions';


class RadioButtonsList extends Component {
    componentWillMount() {
        AsyncStorage.getItem('gasTypePreference').then((value) => {
            if (value !== null) {
                this.props.changeUserFavoriteGas(value);
            }
        }).catch(error => {
            console.log(error);
        });
    }
    render() {
        const options = [
            'Gasoline',
            'Premium Gasoline',
            'Diesel',
            'Heating gas'
        ];

        const { userFavoriteGas } = this.props;

        function setSelectedOption(selectedOption) {
            try {
                AsyncStorage.setItem('gasTypePreference', selectedOption);
                this.props.changeUserFavoriteGas(selectedOption);
            } catch (error) {
                console.log(error);
            }
        }

        function renderOption(option, selected, onSelect, index) {
            const textSelectedStyle = selected ? { fontWeight: 'bold' } : {};
            const iconSelectedName = selected ? 'radio-button-on' : '';
            const iconSelectedStyle = selected ? { color: 'blue' } : {};
            const containerStyle = {
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#EEE',
                flexDirection: 'row'
            };

            return (
                <TouchableOpacity onPress={onSelect} key={index}>
                    <View style={containerStyle}>
                        <Icon name={iconSelectedName || 'radio-button-off'} style={iconSelectedStyle && { fontSize: 25, color: 'blue' }} />
                        <Text style={textSelectedStyle && { alignSelf: 'center', paddingLeft: 20 }}>{option}</Text>
                    </View>
                </TouchableOpacity>
            );
        }

        function renderContainer(optionNodes) {
            return <View>{optionNodes}</View>;
        }

        return (
            <View style={{ margin: 20 }}>
                <RadioButtons
                    options={options}
                    onSelection={setSelectedOption.bind(this)}
                    selectedOption={userFavoriteGas}
                    renderOption={renderOption}
                    renderContainer={renderContainer}
                />
            </View>);
    }
}

const mapStateToProps = state => {
    return { userFavoriteGas: state.userState.userFavoriteGas };
};

export default connect(mapStateToProps, { changeUserFavoriteGas })(RadioButtonsList);
