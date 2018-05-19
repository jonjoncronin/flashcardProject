import React from 'react';
import Decks from './components/Decks';
import DeckDetails from './components/DeckDetails';
import DeckInput from './components/DeckInput';
import CardInput from './components/CardInput';
import { createStackNavigator } from 'react-navigation'

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
  state = { isReady: false };

  async componentWillMount() {
  await Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({isReady: true});
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <RootStack />;
  }
}
