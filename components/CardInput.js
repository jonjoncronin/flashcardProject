import React from 'react';
import { View, Text, Button, Icon } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// import DeckDetails from './components/DeckDetails';
// import DeckInput from './components/DeckInput';

export default class CardInput extends React.Component {
  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={{flex: 1}}>
        <Text>
          Card input
        </Text>
        <Button title='Submit new card' onPress={() => {
            console.log("Submit a card to be added");
            this.props.navigation.goBack();
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
