import React, { Component } from 'react';
import { View, Button } from 'react-native';

class ShareList extends Component {
    onButtonPress() {
        console.log('Pressed');
    }

    render() {
        const { containerStyle } = styles;

        return (
          <View style={containerStyle}>
              <Button
                  onPress={this.onButtonPress.bind(this)}
                  title="Share with Facebook"
              />
              <Button
                  onPress={this.onButtonPress.bind(this)}
                  title="Share with Tweeter"
              />
          </View>
        );
    }
}

const styles = {
    containerStyle: {
        margin: 20
    }
};

export default ShareList;
