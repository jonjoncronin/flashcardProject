import React from "react";
import {
  Container,
  Header,
  Left,
  Right,
  Content,
  Body,
  Title,
  Subtitle,
  Icon,
  Button,
  Text,
  Card,
  CardItem,
  Footer,
  FooterTab,
  SwipeRow
} from "native-base";
import { TouchableOpacity, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { handleDeckDelete } from "../actions";

class DeckDetails extends React.Component {
  renderListItem = ({ item }) => {
    const navigation = this.props.navigation;
    const deckID = navigation.getParam("deckID", {});
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CardDetails", {
            deckID: deckID,
            cardID: item.id
          })
        }
      >
        <View
          style={{
            flex: 1,
            margin: 5,
            padding: 5,
            backgroundColor: "#2E9CCA",
            elevation: 4,
            shadowOffset: { width: 0, height: 5 },
            shadowColor: "#000000",
            shadowRadius: 1.2,
            shadowOpacity: 0.2,
            zIndex: 999
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }} key={item.id}>
            {item.question}
          </Text>
        </View>
      </TouchableOpacity>
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
      <Container style={{ flex: 1, backgroundColor: "#5D5C61" }}>
        <Header style={{ backgroundColor: "#938E94" }}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon
                type="MaterialIcons"
                name="arrow-back"
                style={{ color: "white" }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "white" }}>Details</Title>
            <Subtitle>Deck</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Left>
                <Body>
                  <Text>{deck ? deck.title : ""}</Text>
                  <Text>{deck ? deck.description : ""}</Text>
                </Body>
              </Left>
              {deck && deck.cards.length !== 0 ? (
                <Right>
                  <Button
                    vertical
                    onPress={() => {
                      console.log("Starting Quiz");
                      navigation.navigate("Quiz", { deckID: deck.id });
                    }}
                  >
                    <Icon
                      type="MaterialCommunityIcons"
                      name="book-open-page-variant"
                    />
                    <Text>Start Quiz</Text>
                  </Button>
                </Right>
              ) : (
                <Right />
              )}
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Last Quiz Scores: </Text>
                {deck && deck.scores.length !== 0 ? (
                  deck.scores.map(score => (
                    <Text key={score.id}>
                      {(score.correct / score.total) * 100}% correct
                    </Text>
                  ))
                ) : (
                  <Text>None recorded yet</Text>
                )}
              </Body>
            </CardItem>
            <CardItem>
              <View style={{ flex: 1 }}>
                <Text>Questions ({deck ? deck.cards.length : 0}):</Text>
                {deck && deck.cards.length !== 0 ? (
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
          <FooterTab style={{ backgroundColor: "#272727" }}>
            <Button
              vertical
              onPress={() => {
                console.log("Adding Card");
                navigation.navigate("NewCard", { deckID: deck.id });
              }}
            >
              <Icon type="MaterialIcons" name="playlist-add" />
              <Text>Question</Text>
            </Button>
            <Button
              vertical
              onPress={() => {
                console.log("Editting Deck");
                navigation.navigate("EditDeck", { deckID: deck.id });
              }}
            >
              <Icon type="MaterialIcons" name="edit" />
              <Text>Deck</Text>
            </Button>
            <Button
              vertical
              onPress={() => {
                console.log("deleting Deck: ", deck.id);
                handleDeckDelete(deck.id);
                navigation.navigate("Home");
              }}
            >
              <Icon type="MaterialIcons" name="delete-forever" />
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
    handleDeckDelete: deckID => dispatch(handleDeckDelete(deckID))
  };
};

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetails);
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
