import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { RadioButtons } from 'react-native-radio-buttons';
import { Icon } from 'native-base';

import { changeUserTankCapacity } from '../actions';

const options = [
    '40',
    '50',
    '60',
    '70'
];

class RadioButtonsList extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.tankCapacity !== nextProps.tankCapacity;
    }

    render() {
        const { tankCapacity } = this.props;

        function setSelectedOption(selectedOption) {
            if (selectedOption !== tankCapacity) {
                try {
                    this.props.changeUserTankCapacity(selectedOption);
                } catch (error) {
                    console.log(error);
                }
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
                        <Text style={textSelectedStyle && { alignSelf: 'center', paddingLeft: 20 }}>{option} L</Text>
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
                    selectedOption={tankCapacity}
                    renderOption={renderOption}
                    renderContainer={renderContainer}
                />
            </View>);
    }
}

const mapStateToProps = state => {
    return { tankCapacity: state.userState.userTankCapacity };
};

export default connect(mapStateToProps, { changeUserTankCapacity })(RadioButtonsList);
