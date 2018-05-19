import React from 'react';
import { Container, Header, Body, Title, Content, Text} from 'native-base';

export default class App extends React.Component {
  state = { isReady: false };

  async componentWillMount() {
  await Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({isReady: true});
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Header>
          <Body>
            <Title>Header</Title>
          </Body>
        </Header>
        <Content>
          <Text>Open up App.js to start working on your app!</Text>
        </Content>
      </Container>
    );
  }
}
