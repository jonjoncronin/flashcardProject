import React from "react";
import { Container, Header, Left, Right, Content, Body, Title, Icon, Button, Text, Form, Item, Label, Input } from "native-base";
import { TouchableOpacity, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { handleCardEdit } from "../actions"
// import DeckDetails from './components/DeckDetails';
// import DeckInput from './components/DeckInput';

class CardEdit extends React.Component {

  state = { question: '',
            answer: ''};

  handleSubmit = event => {
    const { navigation, handleCardEdit} = this.props;
    const deckID = navigation.getParam("deckID", {});
    const cardID = navigation.getParam("cardID", {});
    const userInputs = this.state;
    console.log("Editing a card to the deck: ", deckID);
    console.log("New Card Inputs: ", userInputs);
    // call your redux action creator
    if(handleCardEdit) {
      handleCardEdit(deckID, cardID, userInputs);
    }
    navigation.goBack();
  }

  componentDidMount() {
    const { navigation, decks } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const cardID = navigation.getParam("cardID", {});
    const deckToEdit = decks.find((entry) => {
      return entry.id === deckID;
    });
    const cardToEdit = deckToEdit.cards.find((entry) => {
      return entry.id === cardID;
    });
    this.setState({question: cardToEdit.question,
                   answer: cardToEdit.answer});
  }

  render() {
    console.log("CardEdit View Props: ", this.props);
    const { navigation, handleCardEdit } = this.props;
    const deckID = navigation.getParam("deckID", {});
    console.log("Deck to edit card on: ", deckID);
    const cardID = navigation.getParam("cardID", {});
    console.log("Card to edit: ", cardID);

    return (
      <Container style={{ flex: 1, backgroundColor: "#747474"}}>
        <Header style={{backgroundColor: '#272727'}}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon type='MaterialIcons' name='arrow-back' style={{color:'white'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>New Question</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label style={{color:'white'}}>Question</Label>
              <Input
                style={{color:'white'}}
                onChangeText={(text) => this.setState({question: text})}
                value={this.state.question} />
            </Item>
            <Item floatingLabel>
              <Label style={{color:'white'}}>Answer</Label>
              <Input
                style={{color:'white'}}
                onChangeText={(text) => this.setState({answer: text})}
                value={this.state.answer} />
            </Item>
            <View style={{flex: 1, flexDirection: 'row', margin: 10, alignContent: 'center', justifyContent: 'center'}}>
              <Button
                light
                onPress={this.handleSubmit}
              >
                <Text>Edit Question</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleCardEdit: (deckID, cardID, userInputs) =>
    dispatch(handleCardEdit(deckID, cardID, userInputs))
  };
};

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardEdit);

// <Container>
//   <Header>
//     <Left>
//       <Button transparent onPress={() => this.props.navigation.goBack()}>
//         <Icon name='arrow-back' />
//       </Button>
//     </Left>
//     <Body>
//       <Title>Add a Card</Title>
//     </Body>
//     <Right />
//   </Header>
//   <Content>
//     <Text>Input to Add a Card</Text>
//     <Button transparent onPress={() => {
//       console.log("Submit a card to be added");
//       this.props.navigation.goBack();
//       }}>
//       <Text>Submit</Text>
//     </Button>
//   </Content>
// </Container>
