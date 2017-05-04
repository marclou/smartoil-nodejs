import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage } from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons';
import { Icon } from 'native-base';


class RadioButtonsList extends Component {

    /**
     * selectedOption is the user choice for the gas preference.
     * When component is about to mount, selectedOption is set up :
     * - To the cache memory value (if found)
     * - Gasoline by default (if not found)
     */
    componentWillMount() {
        this.state = { selectedOption: '' };
        AsyncStorage.getItem('gasTypePreference').then((value) => {
            if (value !== null) {
                this.setState({ selectedOption: value });
            } else {
                this.setState({ selectedOption: 'Gasoline' });
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

        function setSelectedOption(selectedOption) {
            try {
                AsyncStorage.setItem('gasTypePreference', selectedOption);
                this.setState({
                    selectedOption
                });
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
                    selectedOption={this.state.selectedOption}
                    renderOption={renderOption}
                    renderContainer={renderContainer}
                />
            </View>);
    }
}
export default RadioButtonsList;
