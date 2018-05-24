import React from 'react';
import { View, Text, Button, Icon, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class DeckDetails extends React.Component {
  render() {
    console.log("DeckDetails View Props: ", this.props);
    const { navigation } = this.props
    const deck = navigation.getParam('deck', {})
    console.log("Deck to detail: ", deck);
    return (
      <View style={{flex: 1}}>
        <Text>
          Deck Details View
        </Text>
        <Button title='Add a card' onPress={() => {
            navigation.navigate("CardInput");
          }} />
        {Object.keys(deck).length !== 0 ? (
          <View>
            <Text>{deck.shortName}</Text>
            <Text>{deck.description}</Text>
            <Text>Cards</Text>
            <FlatList
              data={deck.cards}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Text>
                  {item.question}
                </Text>
              )} />
            </View>
        ): (
          <Text></Text>
        )}
      </View>
    );
  }
}
export default DeckDetails;

// <Container>
//   <Header>
//   <Left>
//     <Button transparent onPress={() => this.props.navigation.goBack()}>
//       <Icon name='arrow-back' />
//     </Button>
//   </Left>
//     <Body>
//       <Title>Deck Details</Title>
//     </Body>
//     <Right>
//       <Button transparent onPress={() => this.props.navigation.navigate("CardInput")}>
//         <Icon type="MaterialIcons" name='add-circle-outline' />
//       </Button>
//     </Right>
//   </Header>
//   <Content>
//     <Text>See the deck details</Text>
//   </Content>
// </Container>
