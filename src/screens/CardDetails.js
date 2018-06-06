import React from "react";
import { Container, Header, Left, Right, Content, Body, Title,Subtitle, Icon, Button, Text, Card, CardItem, Footer, FooterTab} from "native-base";
import { TouchableOpacity, View } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";

class CardDetails extends React.Component {
  state = {
    editting: false
  };

  handleEditButtonClick = () => {
    console.log("Handling Card edit");
    this.setState({editting: !this.state.editting});
  };

  render() {
    console.log("CardDetails View Props: ", this.props);
    const { decks, navigation } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const cardID = navigation.getParam("cardID", {});
    const deck = decks.find(entry => {
      return entry.id === deckID;
    });
    const card = deck.cards.find(entry => {
      return entry.id === cardID;
    });

    console.log("Card to detail: ", card);
    return (
      <Container style={{ flex: 1, backgroundColor: "#747474"}}>
        <Header style={{backgroundColor: '#272727'}}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon type='MaterialIcons' name='arrow-back' style={{color:'white'}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>Details</Title>
            <Subtitle>Question</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <View>
                <Text>{card.question}</Text>
              </View>
            </CardItem>
            <CardItem>
                <View>
                  <Text>{card.answer}</Text>
                </View>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor: '#272727'}}>
            <Button vertical
              onPress={() => this.handleEditButtonClick()}
            >
              <Icon type='MaterialIcons' name='edit' />
              <Text>Question</Text>
            </Button>
            <Button vertical
              onPress={() => {
                console.log("deleting Card: ", card.id);
                // handleDeckDelete(deck.id);
                navigation.goBack();
              }}
            >
              <Icon type='MaterialIcons' name='delete-forever' />
              <Text>Question</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     handleDeckDelete: (deckID) =>
//       dispatch(handleDeckDelete(deckID))
//   };
// };
//

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(mapStateToProps, null)(CardDetails);
