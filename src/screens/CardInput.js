import React from "react";
import { Container, Header, Left, Right, Content, Body, Title, Icon, Button, Text } from "native-base";
import { TouchableOpacity, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";

// import DeckDetails from './components/DeckDetails';
// import DeckInput from './components/DeckInput';

export default class CardInput extends React.Component {
  render() {
    console.log("CardInput View Props: ", this.props);
    const navigation = this.props.navigation;
    const deckID = navigation.getParam("deckID", {});
    console.log("Deck to add card to: ", deckID);
    return (
      <Container style={{ flex: 1, backgroundColor: "#747474"}}>
        <Header style={{backgroundColor: '#272727'}}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon type='MaterialIcons' name='arrow-back' style={{color:'white'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white', width: 120}}>New Question</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View>
          <Text>Input</Text>
          <Text>More Input</Text>
          <Button
            block
            light
            onPress={() => {
              console.log("Adding a new card");
              navigation.goBack();
            }}
          >
            <Text>Submit</Text>
          </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

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
