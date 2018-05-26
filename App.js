import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { View, StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import { Constants } from 'expo';
import DecksView from './components/DecksView';
import DeckDetails from './components/DeckDetails';
import DeckInput from './components/DeckInput';
import CardInput from './components/CardInput';

const store = configureStore();

function GenericStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const RootStack = createStackNavigator(
  {
    Home: DecksView,
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

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <GenericStatusBar backgroundColor='#747474' barStyle='light-content' />
          <RootStack />
        </View>
      </Provider>
    )
  }
}

// const mapStateToProps = state => {
//   return { decks: state.decks };
// }

export default App;
