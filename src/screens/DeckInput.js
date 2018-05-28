import React from "react";
import { Container, Header, Left, Right, Content, Body, Title, Icon, Button, Text } from "native-base";
import { TouchableOpacity, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";

// import DeckDetails from './components/DeckDetails';
// import DeckInput from './components/DeckInput';

class DeckInput extends React.Component {
  render() {
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
          <View>
          <Text>Input</Text>
          <Text>More Input</Text>
          <Button
            block
            light
            onPress={() => {
              console.log("Adding a new deck");
              navigation.goBack();
            }}
          >
            <Text>Submit Deck</Text>
          </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default DeckInput;
