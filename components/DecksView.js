import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Header from "./Header";
import DeckDetails from "./DeckDetails";
import DeckInput from "./DeckInput";

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
            <MaterialIcons color="white" name="chevron-right" size={30} />
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
      <View style={{ flex: 1, backgroundColor: "#747474" }}>
        <Header
          left=""
          center="My Decks"
          right={
            <MaterialIcons
              color="#FF652F"
              name="add-box"
              size={30}
              onPress={() => navigation.navigate("DeckInput")}
            />
          }
        />
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
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(mapStateToProps)(DecksView);
