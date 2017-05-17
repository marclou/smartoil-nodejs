import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as squareButtonActionsCreator from '../actions/squareButtonAction';
import SquareButton from './SquareButton';

class SquareButtonCollection extends Component {
    renderSquareButtons() {
        const { squareButtonsCollection } = this.props;
        return (
            squareButtonsCollection.map((value, index) => {
                return (
                    <SquareButton
                        key={index}
                        squareButtonState={value}
                        {...squareButtonActionsCreator}
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
    return { squareButtonsCollection: state.squareButton.squareButtonCollectionReducer };
};

const mapDispatchToProps = dispatch => {
    return { squareButtonActionCreator: bindActionCreators(squareButtonActionsCreator, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(SquareButtonCollection);
