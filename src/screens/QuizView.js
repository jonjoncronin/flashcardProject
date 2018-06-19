import React from "react";
import {
  Container,
  Header,
  Left,
  Right,
  Content,
  Body,
  Title,
  Subtitle,
  Icon,
  Button,
  Text,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Spinner
} from "native-base";
import {
  TouchableOpacity,
  TouchableHighlight,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert
} from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { handleQuizScoreAdd } from "../actions";
import QuizCard from "./QuizCard";
import {
  clearLocalNotification,
  setLocalNotification
} from "../utils/notificationHelpers";

class QuizView extends React.Component {
  state = {
    cards: [],
    firstMount: true
  };

  updateResult(index, result) {
    console.log("QuizView called from QuizCard: ", index, result);
    let cardsToUpdate = this.state.cards;
    cardsToUpdate[index].result = result;
    this.setState({ cards: cardsToUpdate });
  }

  componentDidMount() {
    const { decks, navigation } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const deck = decks.find(entry => {
      return entry.id === deckID;
    });
    console.log("Deck to quiz: ", deck);
    let cards = deck.cards.map(entry => {
      return {
        question: entry.question,
        answer: entry.answer,
        result: ""
      };
    });
    if (this.state.firstMount) {
      this.setState({
        cards: cards,
        firstMount: false
      });
    }
  }

  getScored = (total, card) => {
    if (card.result !== "") {
      return total + 1;
    } else {
      return total;
    }
  };

  getCorrect = (total, card) => {
    if (card.result === "correct") {
      return total + 1;
    } else {
      return total;
    }
  };

  renderAlertPopup = () => {
    const { navigation, handleQuizScoreAdd } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const cards = this.state.cards;
    let scoredCount = cards.reduce(this.getScored, 0);
    let correctCount = cards.reduce(this.getCorrect, 0);
    if (scoredCount !== this.state.cards.length) {
      //Alert that the you haven't marked a result for all cards
      let msg =
        "You have only answered " +
        scoredCount +
        " out of " +
        this.state.cards.length +
        " questions so far. The quiz score will not be saved if you finish now.";
      Alert.alert("Are you sure?", msg, [
        {
          text: "Confirm",
          onPress: () => this.props.navigation.goBack()
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]);
    } else {
      //Alert that the quiz is finished with %correct
      //OnClose attempt to update the store with the score and navigate back

      let msg =
        "You answered " +
        correctCount +
        " out of " +
        scoredCount +
        " questions correctly!";

      // clear local notifications and reschedule another
      clearLocalNotification().then(setLocalNotification);

      //Tell the user good job for quiz completion
      Alert.alert("Quiz Completed", msg, [
        {
          text: "Ok",
          onPress: () => {
            handleQuizScoreAdd(deckID, {
              correct: correctCount,
              total: scoredCount
            });
            navigation.goBack();
          }
        }
      ]);
    }
  };

  render() {
    console.log("QuizView Props: ", this.props);
    const { navigation } = this.props;
    console.log("QuizView State: ", this.state);

    return (
      <Container style={{ flex: 1, backgroundColor: "#5D5C61" }}>
        <Header style={{ backgroundColor: "#938E94" }}>
          <Body
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignContent: "center"
            }}
          >
            <Button
              style={{ justifyContent: "center", alignContent: "center" }}
              onPress={() => this.renderAlertPopup()}
            >
              <Text>Finish</Text>
            </Button>
          </Body>
        </Header>
        <FlatList
          horizontal
          pagingEnabled
          directionalLockEnabled
          showsHorizontalScrollIndicator
          data={this.state.cards}
          keyExtractor={item => item.question.toString()}
          renderItem={({ item, index }) => {
            return (
              <QuizCard
                question={item.question}
                answer={item.answer}
                index={index}
                total={this.state.cards.length}
                onUpdateResult={this.updateResult.bind(this)}
              />
            );
          }}
          ListEmptyComponent={() => {
            return (
              <Content padder>
                <Spinner color="white" />
              </Content>
            );
          }}
        />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleQuizScoreAdd: (deckID, score) =>
      dispatch(handleQuizScoreAdd(deckID, score))
  };
};

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizView);
