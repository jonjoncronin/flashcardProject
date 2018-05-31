import React from "react";
import { Container, Header, Left, Right, Content, Body, Title, Icon, Button, Text, Card, CardItem, Footer, FooterTab, SwipeRow } from "native-base";
import { TouchableOpacity, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { handleDeckDelete } from "../actions"

class DeckDetails extends React.Component {

  renderListItem = ({ item }) => {
    const navigation = this.props.navigation;
    return (

        <SwipeRow
          style={{flex:1}}
          leftOpenValue={75}
          rightOpenValue={-75}
          left={
            <Button success onPress={() => alert(item.answer)} >
              <Icon active name="add" />
            </Button>
          }
          body={
            <View>
              <Text key={item.id}>
                {item.question}
              </Text>
            </View>
          }
          right={
            <Button danger onPress={() => alert(item.id)}>
              <Icon active name="trash" />
            </Button>
          }
        />
    );
  };

  render() {
    console.log("DeckDetails View Props: ", this.props);
    const { decks, navigation, handleDeckDelete } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const deck = decks.find(entry => {
      return entry.id === deckID;
    });
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
        <Content padder>
          <Card>
            <CardItem header bordered>
              <View>
                <Text>{deck.shortName}</Text>
                <Text>{deck.description}</Text>
              </View>
            </CardItem>
            <CardItem>
                <View style={{ flex: 1}}>
                <Text>Questions ({deck ? deck.cards.length:0}):</Text>
                {(deck && deck.cards.length !== 0) ? (
                  <FlatList
                    data={deck.cards}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderListItem}
                  />
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
              onPress={() => {
                console.log("Adding Card");
                navigation.navigate("NewCard", {deckID: deck.id});
              }}
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
              onPress={() => {
                console.log("deleting Deck: ", deck.id);
                handleDeckDelete(deck.id);
                navigation.goBack();
              }}
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

const mapDispatchToProps = dispatch => {
  return {
    handleDeckDelete: (deckID) =>
      dispatch(handleDeckDelete(deckID))
  };
};

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails);
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
