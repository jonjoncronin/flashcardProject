import React from "react";
import { Container, Header, Left, Right, Content, Body, Title, Subtitle, Icon, Button, Text, Card, CardItem, Footer, FooterTab, SwipeRow } from "native-base";
import { TouchableOpacity, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";

class QuizView extends React.Component {
  state = { questions: [],
            correctCount: 0,
            missedCount: 0 };

  componentDidMount() {
    const { decks, navigation } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const deck = decks.find(entry => {
      return entry.id === deckID;
    });
    console.log("Deck to quiz: ", deck);
    let questions = deck.cards.map((entry) => {
      return {question: entry.question,
              answer: entry.answer};
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
        <Content padder>
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor: '#272727'}}>
            <Button vertical
              onPress={() => {
                console.log("Question Correct");
                this.setState({correctCount: this.state.correctCount+1});
              }}
            >
              <Icon type='MaterialIcons' name='check-circle' color='green' />
            </Button>
            <Button vertical
              onPress={() => {
                console.log("Question Missed");
                this.setState({missedCount: this.state.missedCount+1});
              }}
            >
              <Icon type='MaterialIcons' name='cancel' color='red' />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return { decks: state };
};

export default connect(mapStateToProps, null)(QuizView);
