import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';

import SquareButton from './SquareButton';
import { fetchingButtons } from '../actions';

class SquareButtonCollection extends Component {
    componentWillMount() {
        this.addAsyncStorage();
        this.props.fetchingButtons();
    }

    // TO BE REMOVED
    addAsyncStorage() {
        const SB = [
            {
                id: 2,
                loading: false,
                title: 'Yongsan',
                icon: 'pin'
            },
            {
                id: 3,
                loading: false,
                title: 'Gangnam',
                icon: 'pin'
            }
        ];
        AsyncStorage.setItem('SquareButtons', JSON.stringify(SB));
    }

    render() {
        const { containerStyle } = styles;
        const { squareButtonsProps } = this.props;

        return (
            <View style={containerStyle}>
                {squareButtonsProps.map((squareButtonProps, index) => {
                    return (
                        <SquareButton
                            squareButtonProps={squareButtonProps}
                            key={index}
                        />
                    );
                })}
            </View>
        );
    }
}

const styles = {
  containerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20
  }
};

const mapStateToProps = (state) => {
    return { squareButtonsProps: state.squareButtonCollection };
};

export default connect(mapStateToProps, { fetchingButtons })(SquareButtonCollection);
