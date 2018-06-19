import React from "react";
import {
  Container,
  Header,
  Left,
  Right,
  Content,
  Body,
  Title,
  Icon,
  Button,
  Text,
  Form,
  Item,
  Label,
  Input
} from "native-base";
import { TouchableOpacity, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { handleCardEdit } from "../actions";

class CardEdit extends React.Component {
  state = {
    question: "",
    answer: ""
  };

  handleSubmit = event => {
    const { navigation, handleCardEdit } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const cardID = navigation.getParam("cardID", {});
    const userInputs = this.state;
    // call your redux action creator
    if (handleCardEdit) {
      handleCardEdit(deckID, cardID, userInputs);
    }
    navigation.goBack();
  };

  componentDidMount() {
    const { navigation, decks } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const cardID = navigation.getParam("cardID", {});
    const deckToEdit = decks.find(entry => {
      return entry.id === deckID;
    });
    const cardToEdit = deckToEdit.cards.find(entry => {
      return entry.id === cardID;
    });
    this.setState({
      question: cardToEdit.question,
      answer: cardToEdit.answer
    });
  }

  render() {
    const { navigation, handleCardEdit } = this.props;
    const deckID = navigation.getParam("deckID", {});
    const cardID = navigation.getParam("cardID", {});

    return (
      <Container style={{ flex: 1, backgroundColor: "#5D5C61" }}>
        <Header style={{ backgroundColor: "#938E94" }}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon
                type="MaterialIcons"
                name="arrow-back"
                style={{ color: "white" }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "white" }}>New Question</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label style={{ color: "white" }}>Question</Label>
              <Input
                style={{ color: "white" }}
                onChangeText={text => this.setState({ question: text })}
                value={this.state.question}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{ color: "white" }}>Answer</Label>
              <Input
                style={{ color: "white" }}
                onChangeText={text => this.setState({ answer: text })}
                value={this.state.answer}
              />
            </Item>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                margin: 10,
                alignContent: "center",
                justifyContent: "center"
              }}
            >
              <Button light onPress={this.handleSubmit}>
                <Text>Edit Question</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleCardEdit: (deckID, cardID, userInputs) =>
      dispatch(handleCardEdit(deckID, cardID, userInputs))
  };
};

const mapStateToProps = state => {
  return { decks: state };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardEdit);
