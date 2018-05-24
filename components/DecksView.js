import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, Icon, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DeckDetails from './DeckDetails';
import DeckInput from './DeckInput';

class DecksView extends React.Component {
  render() {
    console.log("Decks View Props: ", this.props);
    const { decks } = this.props;
    const navigate = this.props.navigation.navigate;
    console.log("Decks: ", decks);
    return (
      <View style={{flex: 1}}>
        <Text>
          My Decks Header
        </Text>
        <MaterialIcons name="add-box" size={50} onPress={() => navigate("DeckInput")} />
        {decks.length !== 0 ? (
          <View style={{backgroundColor: 'lightblue'}}>
            <Text>more than one deck</Text>
            <FlatList
              data={decks}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Text
                  key={item.id}
                  onPress={() => navigate("DeckDetails", {deck: item})}
                >
                  {item.shortName}
                </Text>
              )} />
          </View>

        ) : (
          <Text></Text>
        )}
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
