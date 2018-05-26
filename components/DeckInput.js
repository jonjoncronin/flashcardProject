import React from 'react';
import { View, Text, Button, Icon } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import Header from './Header';

// import DeckDetails from './components/DeckDetails';
// import DeckInput from './components/DeckInput';

class DeckInput extends React.Component {

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: 'slategray'}}>
        <Header
          left={<MaterialIcons name="arrow-back" size={30} onPress={() => navigation.goBack()} />}
          center="Add a new deck"
          right=''
        />
        <Button title='Submit new Deck' onPress={() => {
            console.log("Submit a deck to be added");
            navigation.goBack();
          }} />
      </View>
    );
  }
}

export default DeckInput;

// <Container>
//   <Header>
//     <Left>
//       <Button transparent onPress={() => this.props.navigation.goBack()}>
//         <Icon name='arrow-back' />
//       </Button>
//     </Left>
//     <Body>
//       <Title>Add a Deck</Title>
//     </Body>
//     <Right />
//   </Header>
//   <Content>
//     <Text>Input to Add a Deck</Text>
//     <Button transparent onPress={() => {
//       console.log("Submit a deck to be added");
//       this.props.navigation.goBack();
//       }}>
//       <Text>Submit</Text>
//     </Button>
//   </Content>
// </Container>
