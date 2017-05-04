import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';

import * as SquareButtonActionCreators from '../actions';
import SquareButton from './SquareButton';

class SquareButtonCollection extends Component {
    renderSquareButtons() {
        const { squareButtonCollection, squareButtonActions } = this.props;

        return (
            squareButtonCollection.map((value, index) => {
                return (
                    <SquareButton
                        key={index}
                        squareButtonState={value}
                        {...squareButtonActions}
                    />
                );
            })
        );
    }

    render() {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle}>
                {this.renderSquareButtons()}
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

const mapStateToProps = state => {
    return { squareButtonCollection: state.squareButtonCollection };
};

const mapDispatchToProps = dispatch => {
  return { squareButtonActions: bindActionCreators(SquareButtonActionCreators, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(SquareButtonCollection);
