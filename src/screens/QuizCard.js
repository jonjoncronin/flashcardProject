import React from "react";
import { TouchableOpacity, View, ScrollView, Text, Dimensions } from "react-native";
import { connect } from "react-redux";

class QuizCard extends React.Component {

  state = { cardFlipped: false };

  render() {
    console.log("QuizCard Comp Props: ", this.props);
    return (
      <View style={{flex: 1, width: (Dimensions.get('window').width-10), padding: 5, margin: 5}}>
        <TouchableOpacity style={{flex:3, backgroundColor:'white', padding:5}}
          onPress={() => {
            this.setState({cardFlipped: !this.state.cardFlipped})
          }}>
          <View style={{flex:1, backgroundColor: 'grey', justifyContent:'center', alignContent: 'center'}}>
            <Text style={{textAlign: 'center', color:'white', fontWeight: 'bold', fontSize: 25}}>
              {!this.state.cardFlipped ? this.props.question: this.props.answer}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flex:1, marginTop:10, backgroundColor: 'pink'}} />
      </View>
    );
  }
}

export default QuizCard;

// <Text>
//   this is really really long text that should take up multiple lines without trying and even with small fonts
// </Text>
