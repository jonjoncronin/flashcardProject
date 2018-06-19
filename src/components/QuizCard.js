import React from "react";
import { connect } from "react-redux";
import { Icon } from "native-base";
import {
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  Dimensions
} from "react-native";

class QuizCard extends React.Component {
  state = {
    cardFlipped: false,
    score: ""
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          width: Dimensions.get("window").width - 10,
          padding: 5,
          margin: 5
        }}
      >
        <View style={{ flex: 3, backgroundColor: "white", padding: 5 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "grey",
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 25
              }}
            >
              {!this.state.cardFlipped
                ? this.props.question
                : this.props.answer}
            </Text>
            <Text style={{ textAlign: "center", color: "white", fontSize: 12 }}>
              card {this.props.index + 1} of {this.props.total}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.25,
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "space-evenly",
            alignContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({ score: "correct" });
              if (this.props.onUpdateResult) {
                this.props.onUpdateResult(this.props.index, "correct");
              }
            }}
          >
            {this.state.score === "correct" ? (
              <Icon
                type="Feather"
                name="check-square"
                style={{ color: "lightgreen" }}
              />
            ) : (
              <Icon
                type="Feather"
                name="check-square"
                style={{ color: "white" }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ cardFlipped: !this.state.cardFlipped });
            }}
          >
            <Icon
              type="MaterialCommunityIcons"
              name="rotate-3d"
              style={{ color: "white" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ score: "wrong" });
              if (this.props.onUpdateResult) {
                this.props.onUpdateResult(this.props.index, "wrong");
              }
            }}
          >
            {this.state.score === "wrong" ? (
              <Icon
                type="Feather"
                name="x-square"
                style={{ color: "tomato" }}
              />
            ) : (
              <Icon type="Feather" name="x-square" style={{ color: "white" }} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default QuizCard;
