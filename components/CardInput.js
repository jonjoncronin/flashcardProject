import React from 'react';
import { View, Text, Button } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Header from './Header';

// import DeckDetails from './components/DeckDetails';
// import DeckInput from './components/DeckInput';

export default class CardInput extends React.Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{flex: 1, backgroundColor: 'slategray'}}>
        <Header
          left={<MaterialIcons name="arrow-back" size={30} onPress={() => navigation.goBack()} />}
          center="Add a new card"
          right=''
        />
        <Button title='Submit new card' onPress={() => {
            console.log("Submit a card to be added");
            navigation.goBack();
          }} />
      </View>
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
