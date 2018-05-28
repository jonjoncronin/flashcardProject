import React from "react";
import { Container, Header, Left, Right, Content, Body, Title, Icon, Button, Text, Card, CardItem, Footer, FooterTab } from "native-base";
import { TouchableOpacity, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";

class DeckDetails extends React.Component {

  renderListItem = ({ item }) => {
    const navigation = this.props.navigation;
    return (
      <Text key={item.id}>
        {item.question}
      </Text>
    );
  };

  render() {
    console.log("DeckDetails View Props: ", this.props);
    const { navigation } = this.props;
    const deck = navigation.getParam("deck", {});
    console.log("Deck to detail: ", deck);
    return (
      <Container style={{ flex: 1, backgroundColor: "#747474"}}>
        <Header style={{backgroundColor: '#272727'}}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon type='MaterialIcons' name='arrow-back' style={{color:'white'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>Details</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>
            <CardItem header bordered>
              <Text>Deck: {deck.shortName}</Text>
            </CardItem>
            <CardItem>
              <View>
                <Text>Description:</Text>
                <Text>{deck.description}</Text>
                <Text>Questions ({deck ? deck.cards.length:0}):</Text>
                {(deck && deck.cards.length !== 0) ? (
                  <Text>{deck.cards[0].question}</Text>
                ) : (
                    <Text>No question cards for this deck</Text>
                )}
              </View>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor: '#272727'}}>
            <Button vertical
              onPress={() => console.log("Adding Card")}
            >
              <Icon type='MaterialIcons' name='playlist-add' />
              <Text>Question</Text>
            </Button>
            <Button vertical
              onPress={() => console.log("Editting Deck")}
            >
              <Icon type='MaterialIcons' name='edit' />
              <Text>Deck</Text>
            </Button>
            <Button vertical
              onPress={() => console.log("deleting Deck")}
            >
              <Icon type='MaterialIcons' name='delete-forever' />
              <Text>Deck</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
export default DeckDetails;

// <Container>
//   <Header>
//   <Left>
//     <Button transparent onPress={() => this.props.navigation.goBack()}>
//       <Icon name='arrow-back' />
//     </Button>
//   </Left>
//     <Body>
//       <Title>Deck Details</Title>
//     </Body>
//     <Right>
//       <Button transparent onPress={() => this.props.navigation.navigate("CardInput")}>
//         <Icon type="MaterialIcons" name='add-circle-outline' />
//       </Button>
//     </Right>
//   </Header>
//   <Content>
//     <Text>See the deck details</Text>
//   </Content>
// </Container>
