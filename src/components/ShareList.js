import React, { Component } from 'react';

import { Container, Content, Button, Text } from 'native-base';

class ShareList extends Component {
    render() {
        const { containerStyle } = styles;

        return (
          <Container style={{ justifyContent: 'center' }} >
             <Content>
                 <Button transparent blue >
                     <Text>Light</Text>
                 </Button>
                 <Button transparent blue >
                     <Text>Light</Text>
                 </Button>
            </Content>
          </Container>
        );
    }
}

const styles = {
    containerStyle: {
        margin: 20
    }
};

export default ShareList;
