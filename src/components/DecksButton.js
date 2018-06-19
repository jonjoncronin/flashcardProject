import React from "react";
import { View, Text, Animated, TouchableWithoutFeedback,
InteractionManager } from "react-native";

class DecksButton extends React.Component {
  state = { bounceValue: new Animated.Value(1) };

  handlePress = () => {
    const { bounceValue } = this.state;
    const navigation = this.props.navigation;
    const { item } = this.props;
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.2 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 })
    ]).start();
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate("DeckDetails", { deckID: item.id });
    });
  };
  render() {
    const { item } = this.props;
    const { bounceValue } = this.state;
    return (
      <TouchableWithoutFeedback
        key={item.id}
        onPress={() => this.handlePress()}
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
            shadowColor: "#000000",
            shadowRadius: 1.2,
            shadowOpacity: 0.2,
            zIndex: 999
          }}
        >
          <View style={{ flex: 11 }}>
            <Animated.Text
              style={[
                {
                  margin: 5,
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "white"
                },
                { transform: [{ scale: bounceValue }] }
              ]}
            >
              {item.title}
            </Animated.Text>
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
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
export default DecksButton;
