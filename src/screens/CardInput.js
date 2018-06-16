import React from "react";
import { Container, Header, Left, Right, Content, Body, Title, Icon, Button, Text, Form, Item, Label, Input } from "native-base";
import { TouchableOpacity, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { handleCardAdd } from "../actions"
// import DeckDetails from './components/DeckDetails';
// import DeckInput from './components/DeckInput';

class CardInput extends React.Component {

  state = { question: '',
            answer: ''};

  handleSubmit = event => {
    const { navigation, handleCardAdd } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const userInputs = this.state;
    console.log("Adding a new card to the deck: ", deckID);
    console.log("New Card Inputs: ", userInputs);
    // call your redux action creator
    if(handleCardAdd) {
      handleCardAdd(deckID, userInputs);
    }
    navigation.goBack();
  }

  render() {
    console.log("CardInput View Props: ", this.props);
    const { navigation, handleCardAdd } = this.props;
    const deckID = navigation.getParam("deckID", {});
    console.log("Deck to add card to: ", deckID);

    return (
      <Container style={{ flex: 1, backgroundColor: "#5D5C61"}}>
        <Header style={{backgroundColor: '#938E94'}}>
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
                <Text>Add Question</Text>
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
    handleCardAdd: (deckID, userInputs) =>
    dispatch(handleCardAdd(deckID, userInputs))
  };
};

export default connect(null, mapDispatchToProps)(CardInput);
