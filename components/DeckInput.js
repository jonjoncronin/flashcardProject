import React from 'react';
import { Container, Header, Body, Title, Content, Text, Icon, Left, Right, Button } from 'native-base';
import { StackNavigator } from 'react-navigation';

// import DeckDetails from './components/DeckDetails';
// import DeckInput from './components/DeckInput';

export default class DeckInput extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Add a Deck</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>Input to Add a Deck</Text>
          <Button onPress={() => console.log("Submit a deck to be added")}>
          </Button>
        </Content>
      </Container>
    );
  }
}
