import React from 'react';
import { Container, Header, Body, Title, Content, Text, Icon, Left, Right, Button, List, ListItem } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import DeckDetails from './DeckDetails';
import DeckInput from './DeckInput';

class Decks extends React.Component {
  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>My Decks</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate("DeckInput")}>
              <Icon type="MaterialIcons" name='library-add' size={50} />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem>
              <Button transparent full onPress={() => this.props.navigation.navigate("DeckDetails")}>
                <Text>Deck 1</Text>
              </Button>
            </ListItem>
            <ListItem>
              <Text>Deck 2</Text>
            </ListItem>
            <ListItem>
              <Text>Deck 3</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Decks;
