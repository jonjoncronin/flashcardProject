import React from "react";
import { Container, Header, Left, Right, Content, Body, Title, Subtitle, Icon, Button, Text, Card, CardItem, Footer, FooterTab, Spinner } from "native-base";
import { TouchableOpacity, TouchableHighlight, View, FlatList, StyleSheet, Dimensions, Alert } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import QuizCard from './QuizCard';

class QuizView extends React.Component {
  state = { cards: [],
            firstMount: true,
          };

  updateResult(index, result) {
    console.log("QuizView called from QuizCard: ", index, result);
    let cardsToUpdate = this.state.cards;
    cardsToUpdate[index].result = result;
    this.setState({cards: cardsToUpdate});
  }

  componentDidMount() {
    const { decks, navigation } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const deck = decks.find(entry => {
      return entry.id === deckID;
    });
    console.log("Deck to quiz: ", deck);
    let cards = deck.cards.map((entry) => {
      return {question: entry.question,
              answer: entry.answer,
              result: ''};
    });
    if(this.state.firstMount) {
      this.setState({cards: cards,
                     firstMount: false});
    }

  }

  getScored = (total, card) => {
    if(card.result !== '') {
      return (total + 1);
    }
    else {
      return total;
    }
  }

  getCorrect = (total, card) => {
    if(card.result === 'correct') {
      return (total + 1);
    }
    else {
      return total;
    }
  }

  renderAlertPopup = () => {
    const cards = this.state.cards;
    let scoredCount = cards.reduce(this.getScored, 0);
    let correctCount = cards.reduce(this.getCorrect, 0);
    if(scoredCount !== this.state.cards.length) {
      //Alert that the you haven't marked a result for all cards
      let msg = 'You have only answered ' + scoredCount + ' out of ' + this.state.cards.length + ' questions so far. The quiz score will not be saved if you leave now.';
      Alert.alert('Are you sure?', msg, [
        {
          text: 'Confirm',
          onPress: () => this.props.navigation.goBack(),
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]);
    }
    else {
      //Alert that the quiz is finished with %correct
      //OnClose attempt to update the store with the score and navigate back

      let msg = 'You answered ' + correctCount + ' out of ' + scoredCount + ' questions correctly!';
      Alert.alert('Quiz Completed', msg, [
        {
          text: 'Ok',
          onPress: () => this.props.navigation.goBack(),
        }
      ]);
    }
  }

  render() {
    console.log("QuizView Props: ", this.props);
    const { navigation } = this.props;
    console.log("QuizView State: ", this.state);

    return (
      <Container style={{ flex: 1, backgroundColor: "#747474"}}>
        <Header style={{backgroundColor: '#272727'}}>
          <Left>
            <Button transparent onPress={() => this.renderAlertPopup()}>
              <Icon type='MaterialIcons' name='done-all' style={{color:'white'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'white'}}>Quiz</Title>
          </Body>
          <Right />
        </Header>
        <FlatList
          horizontal
          pagingEnabled
          directionalLockEnabled
          showsHorizontalScrollIndicator
          data={this.state.cards}
          keyExtractor={item => item.question.toString()}
          renderItem={({item, index}) => {
            return (
              <QuizCard
                question={item.question}
                answer={item.answer}
                index={index}
                total={this.state.cards.length}
                onUpdateResult={this.updateResult.bind(this)} />
            )
          }}
          ListEmptyComponent={() => {
            return (
              <Content padder>
                <Spinner color='white' />
              </Content>
            )
          }}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return { decks: state };
};

export default connect(mapStateToProps, null)(QuizView);
