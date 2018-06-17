import React from "react";
import { Container, Header, Left, Right, Content, Body, Title, Icon, Button, Text, Form, Item, Label, Input } from "native-base";
import { TouchableOpacity, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { handleDeckEdit } from "../actions"

// import DeckDetails from './components/DeckDetails';
// import DeckInput from './components/DeckInput';

class DeckEdit extends React.Component {

  state = { title: '',
            description: ''};

  handleSubmit = event => {
    const { navigation, handleDeckEdit } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const userInputs = this.state;
    console.log("Editting a deck");
    console.log("New Deck Inputs: ", userInputs);
    // call your redux action creator
    if(handleDeckEdit) {
      handleDeckEdit(deckID, userInputs);
    }
    navigation.goBack();
  }

  componentDidMount() {
    const { navigation, decks } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const deckToEdit = decks.find((entry) => {
      return entry.id === deckID;
    });
    this.setState({title: deckToEdit.title,
                   description: deckToEdit.description});
  }

  render() {
    console.log("DeckEdit View Props: ", this.props);
    const navigation = this.props.navigation;
    return (
      <Container style={{ flex: 1, backgroundColor: "#5D5C61"}}>
        <Header style={{backgroundColor: '#938E94'}}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon type='MaterialIcons' name='arrow-back' style={{color:'white'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>Edit a deck</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label style={{color:'white'}}>Deck Title</Label>
              <Input
                style={{color:'white'}}
                onChangeText={(text) => this.setState({title: text})}
                value={this.state.title} />
            </Item>
            <Item floatingLabel>
              <Label style={{color:'white'}}>Description</Label>
              <Input
                style={{color:'white'}}
                onChangeText={(text) => this.setState({description: text})}
                value={this.state.description} />
            </Item>
            <View style={{flex: 1, flexDirection: 'row', margin: 10, alignContent: 'center', justifyContent: 'center'}}>
              <Button
                light
                onPress={this.handleSubmit}
              >
                <Text>Edit Deck</Text>
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
    handleDeckEdit: (deckID, userInputs) =>
      dispatch(handleDeckEdit(deckID, userInputs))
  };
};

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckEdit);
