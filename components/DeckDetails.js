import React from 'react';
import { View, Text, Button, Icon } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class DeckDetails extends React.Component {
  render() {
    const navigate = this.props.navigation.navigate;
    return (
      <View style={{flex: 1}}>
        <Text>
          Deck Details View
        </Text>
        <Button title='Add a card' onPress={() => {
            this.props.navigation.navigate("CardInput");
          }} />
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
