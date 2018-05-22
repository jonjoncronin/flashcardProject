import React from 'react';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import { View, StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import { Constants } from 'expo';
import Decks from './components/Decks';
import DeckDetails from './components/DeckDetails';
import DeckInput from './components/DeckInput';
import CardInput from './components/CardInput';

function GenericStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RootStack = createStackNavigator(
  {
    Home: Decks,
    DeckDetails: DeckDetails,
    DeckInput: DeckInput,
    CardInput: CardInput
  },
  {
    navigationOptions: {
      header: null
    },
    InitialRouteName: 'Home',
  }
)
export default class App extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <GenericStatusBar backgroundColor='skyblue' barStyle='light-content' />
        <RootStack />
      </View>
    )
  }
}
