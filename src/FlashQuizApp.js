import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { fetchDecks } from "./actions";
import { createStackNavigator } from "react-navigation";
import { View, StatusBar } from "react-native";
import { Constants } from "expo";
import { setLocalNotification } from "./utils/notificationHelpers";
/* Screens */
import DecksView from "./screens/DecksView";
import DeckDetails from "./screens/DeckDetails";
import DeckInput from "./screens/DeckInput";
import CardInput from "./screens/CardInput";
import CardDetails from "./screens/CardDetails";
import DeckEdit from "./screens/DeckEdit";
import CardEdit from "./screens/CardEdit";
import QuizView from "./screens/QuizView";

/**
 * The application Redux Store for FlashQuiz
 * @type {[type]}
 */
const store = configureStore();

// Create and configure AsyncStorage/localStorage - emulate backend DB
store.dispatch(fetchDecks()).then(() => {
  console.log("App Store state: ", store.getState());
});

/**
 * Stateless function component that wraps a StatusBar component. This
 * generic component allows the caller to specify a background color for the
 * StatusBar.
 * @param       {[type]} backgroundColor [description]
 * @param       {[type]} props           [description]
 * @constructor
 */
function GenericStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

/**
 * The application StackNavigator defines the React-Navigation Component being
 * used through out the entire application
 * @type {StackNavigator}
 */
const RootStack = createStackNavigator(
  {
    Home: DecksView,
    NewDeck: DeckInput,
    DeckDetails: DeckDetails,
    NewCard: CardInput,
    CardDetails: CardDetails,
    EditDeck: DeckEdit,
    EditCard: CardEdit,
    Quiz: QuizView
  },
  {
    navigationOptions: {
      header: null
    },
    InitialRouteName: "Home"
  }
);

export default class FlashQuizApp extends React.Component {

  /**
   * Upon application mounting local notifications should be set so that
   * the user will get a daily FlashQuiz notification.
   */
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <GenericStatusBar
            backgroundColor="#5D5C61"
            barStyle="light-content"
          />
          <RootStack />
        </View>
      </Provider>
    );
  }
}
