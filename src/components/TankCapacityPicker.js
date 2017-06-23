import React, { Component } from 'react';
import { InteractionManager, Picker, View } from 'react-native';
import { connect } from 'react-redux';

import { Spinner } from './functionalComponents';
import { changeUserTankCapacity } from '../actions';

class TankCapacityPicker extends Component {
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
        const { userTankCapacity } = this.props;

        return (
            <View style={containerStyle}>
                <Picker
                    selectedValue={userTankCapacity}
                    onValueChange={(itemValue) => this.props.changeUserTankCapacity(itemValue)}
                >
                    <Picker.Item label="40 L" value={40} />
                    <Picker.Item label="45 L" value={45} />
                    <Picker.Item label="50 L" value={50} />
                    <Picker.Item label="55 L" value={55} />
                    <Picker.Item label="60 L" value={60} />
                    <Picker.Item label="65 L" value={65} />
                    <Picker.Item label="70 L" value={70} />
                    <Picker.Item label="75 L" value={75} />
                    <Picker.Item label="80 L" value={80} />
                    <Picker.Item label="85 L" value={80} />
                    <Picker.Item label="90 L" value={85} />
                    <Picker.Item label="90 L" value={90} />
                    <Picker.Item label="95 L" value={95} />
                    <Picker.Item label="100 L" value={100} />
                    <Picker.Item label="105 L" value={105} />
                    <Picker.Item label="110 L" value={110} />
                    <Picker.Item label="115 L" value={115} />
                    <Picker.Item label="120 L" value={120} />
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
    return { userTankCapacity: state.userState.userTankCapacity };
};

export default connect(mapStateToProps, { changeUserTankCapacity })(TankCapacityPicker);
