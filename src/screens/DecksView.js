import React from "react";
import { connect } from "react-redux";
import DecksButton from "../components/DecksButton";
import {
  Container,
  Header,
  Left,
  Right,
  Content,
  Body,
  Title,
  Icon
} from "native-base";
import {
  TouchableOpacity,
  View,
  FlatList,
  Text
} from "react-native";


class DecksView extends React.Component {
  renderListItem = ({ item }) => {
    const navigation = this.props.navigation;
    return <DecksButton item={item} navigation={navigation} />;
  };

  render() {
    console.log("Decks View props: ", this.props);
    const { decks } = this.props;
    const navigation = this.props.navigation;
    return (
      <Container style={{ flex: 1, backgroundColor: "#5D5C61" }}>
        <Header style={{ backgroundColor: "#938E94" }}>
          <Left />
          <Body>
            <Title style={{ color: "white" }}>My Decks</Title>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("NewDeck");
              }}
            >
              <Icon
                type="MaterialIcons"
                name="add-box"
                style={{ fontSize: 30, color: "white" }}
              />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content>
          {decks && decks.length !== 0 ? (
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
