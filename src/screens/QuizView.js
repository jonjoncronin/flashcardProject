import React from "react";
import { Container, Header, Left, Right, Content, Body, Title, Subtitle, Icon, Button, Text, Card, CardItem, Footer, FooterTab, Spinner } from "native-base";
import { TouchableOpacity, TouchableHighlight, View, FlatList, StyleSheet, Dimensions } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import QuizCard from './QuizCard';

class QuizView extends React.Component {
  state = { questions: [],
            correctCount: 0,
            missedCount: 0,
            allCardsViewed: false,
            currentIndex: 0,
            cardFlipped: false
          };

  componentDidMount() {
    const { decks, navigation } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const deck = decks.find(entry => {
      return entry.id === deckID;
    });
    console.log("Deck to quiz: ", deck);
    let questions = deck.cards.map((entry) => {
      return {question: entry.question,
              answer: entry.answer,
              marked: ''};
    });
    this.setState({questions: questions});
  }

  render() {
    console.log("QuizView Props: ", this.props);
    const { navigation } = this.props;
    console.log("QuizView State: ", this.state);

    return (
      <Container style={{ flex: 1, backgroundColor: "#747474"}}>
        <Header style={{backgroundColor: '#272727'}}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon type='MaterialIcons' name='arrow-back' style={{color:'white'}}/>
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
          data={this.state.questions}
          keyExtractor={item => item.question.toString()}
          renderItem={({item}) => {
            return (
              <QuizCard question={item.question} answer={item.answer} />
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

// <FlatList
//   pagingEnabled
//   horizontal
//   showsHorizontalScrollIndicator
//   directionalLockEnabled
//   data={this.state.questions}
//   keyExtractor={item => item.question.toString()}
//   renderItem={({item}) => {
//     return (
//       <QuizCard question={item.question} answer={item.answer} />
//     )
//   }}
// />
// {!this.state.cardFlipped ? (
//   <Text style={{color: "white", fontWeight: 'bold'}}>card facing front</Text>
// ) : (
//   <Text style={{color: "white", fontWeight: 'bold'}}>card facing back</Text>
// )}
