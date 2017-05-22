import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';

import SquareButton from './SquareButton';
import { fetchingButtons } from '../actions';

class SquareButtonCollection extends Component {
    componentDidMount() {
        this.props.fetchingButtons();
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
