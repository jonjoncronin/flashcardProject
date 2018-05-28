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
      <TouchableOpacity
        onPress={() => navigation.navigate("DeckDetails", { deck: item })}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignContent: "center",
            margin: 5,
            height: 40,
            backgroundColor: "#14A76C"
          }}
        >
          <View style={{ flex: 11 }}>
            <Text
              style={{
                margin: 5,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "left",
                color: "white"
              }}
              key={item.id}
            >
              {item.shortName}
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
      <Container style={{ flex: 1, backgroundColor: "#747474"}}>
        <Header style={{backgroundColor: '#272727'}}>
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
              <Icon type='MaterialIcons' name='add-box' style={{fontSize: 30, color:'#FF652F'}} />
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
