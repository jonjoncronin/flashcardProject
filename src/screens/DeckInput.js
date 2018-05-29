import React from "react";
import { Container, Header, Left, Right, Content, Body, Title, Icon, Button, Text, Form, Item, Label, Input } from "native-base";
import { TouchableOpacity, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { handleDeckAdd } from "../actions"

// import DeckDetails from './components/DeckDetails';
// import DeckInput from './components/DeckInput';

class DeckInput extends React.Component {

  state = { shortName: '',
            description: ''};

  handleSubmit = event => {
    const { navigation, handleDeckAdd } = this.props;
    const userInputs = this.state;
    console.log("Adding a new deck");
    console.log("New Deck Inputs: ", userInputs);
    // call your redux action creator
    if(handleDeckAdd) {
      handleDeckAdd(userInputs);
    }
    navigation.goBack();
  }

  render() {
    console.log("DeckInput View Props: ", this.props);
    const navigation = this.props.navigation;
    return (
      <Container style={{ flex: 1, backgroundColor: "#747474"}}>
        <Header style={{backgroundColor: '#272727'}}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon type='MaterialIcons' name='arrow-back' style={{color:'white'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>Add a deck</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label style={{color:'white'}}>Deck Name</Label>
              <Input
                style={{color:'white'}}
                onChangeText={(text) => this.setState({shortName: text})}
                value={this.state.shortName} />
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
                <Text>Submit Deck</Text>
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
    handleDeckAdd: (userInputs) =>
      dispatch(handleDeckAdd(userInputs))
  };
};

export default connect(null, mapDispatchToProps)(DeckInput);