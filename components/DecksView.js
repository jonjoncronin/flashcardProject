import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Icon } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DeckDetails from './DeckDetails';
import DeckInput from './DeckInput';

class DecksView extends React.Component {
  render() {
    console.log("Decks View Props: ", this.props);
    const navigate = this.props.navigation.navigate;
    return (
      <View style={{flex: 1}}>
        <Text>
          My Decks Header
        </Text>
        <MaterialIcons name="add-box" size={50} onPress={() => navigate("DeckInput")} />
        <Text onPress={() => navigate("DeckDetails")}>
          Deck 1
        </Text>
        <Text onPress={() => navigate("DeckDetails")}>
          Deck 2
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(mapStateToProps)(DecksView);

// <Container>
//   <Header>
//     <Left />
//     <Body>
//       <Title>My Decks</Title>
//     </Body>
//     <Right>
//       <Button transparent onPress={() => this.props.navigation.navigate("DeckInput")}>
//         <Icon type="MaterialIcons" name='library-add' size={50} />
//       </Button>
//     </Right>
//   </Header>
//   <Content>
//     <List>
//       <ListItem>
//         <Button transparent full onPress={() => this.props.navigation.navigate("DeckDetails")}>
//           <Text>Deck 1</Text>
//         </Button>
//       </ListItem>
//       <ListItem>
//         <Text>Deck 2</Text>
//       </ListItem>
//       <ListItem>
//         <Text>Deck 3</Text>
//       </ListItem>
//     </List>
//   </Content>
// </Container>
