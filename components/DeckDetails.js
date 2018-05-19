import React from 'react';
import { Container, Header, Body, Title, Content, Text, Icon, Left, Right, Button } from 'native-base';
import { StackNavigator } from 'react-navigation';

export default class DeckDetails extends React.Component {
  const
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
            <Title>Deck Details</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate("CardInput")}>
              <Icon type="MaterialIcons" name='add-circle-outline' />
            </Button>
          </Right>
        </Header>
        <Content>
          <Text>See the deck details</Text>
        </Content>
      </Container>
    );
  }
}
