import React from "react";
import { connect } from "react-redux";
import { Container, Header, Left, Right, Content, Body, Title, Icon, Button, Text } from "native-base";
import { TouchableOpacity, View, FlatList } from "react-native";
// import DeckDetails from "./DeckDetails";
// import DeckInput from "./DeckInput";

class DecksView extends React.Component {
  renderListItem = ({ item }) => {
    const navigation = this.props.navigation;
    return (
      <TouchableOpacity key={item.id}
        onPress={() => navigation.navigate("DeckDetails", { deckID: item.id })}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignContent: "center",
            margin: 5,
            backgroundColor: "#7395AE",
            elevation: 4,
            shadowOffset: { width: 0, height: 5 },
            shadowColor: '#000000',
            shadowRadius: 1.2,
            shadowOpacity: 0.2,
            zIndex:999
          }}
        >
          <View style={{ flex: 11 }}>
            <Text
              style={{
                margin: 5,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                color: "white"
              }}
            >
              {item.shortName}
            </Text>
            <Text
              style={{
                margin: 5,
                fontSize: 12,
                fontWeight: "100",
                textAlign: "center",
                color: "white"
              }}
            >
              {item.cards.length} cards
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignContent: "center",
              justifyContent: "center"
            }}
          >
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    console.log("Decks View props: ", this.props);
    const { decks } = this.props;
    const navigation = this.props.navigation;
    return (
      <Container style={{ flex: 1, backgroundColor: "#5D5C61"}}>
        <Header style={{backgroundColor: '#938E94'}}>
          <Left />
          <Body>
            <Title style={{color: 'white'}}>My Decks</Title>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("NewDeck")
              }}
            >
              <Icon type='MaterialIcons' name='add-box' style={{fontSize: 30, color:'white'}} />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content>
        {decks.length !== 0 ? (
          <View style={{ flex: 1, margin: 10, backgroundColor: "white" }}>
            <FlatList
              data={decks}
              keyExtractor={item => item.id.toString()}
              renderItem={this.renderListItem}
            />
          </View>
          ) : (
            <Text />
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(mapStateToProps)(DecksView);
