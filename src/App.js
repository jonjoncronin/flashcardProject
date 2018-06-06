import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { createStackNavigator } from "react-navigation";
import { View, StatusBar } from "react-native";
import { Constants } from "expo";

/* Screens */
import DecksView from "./screens/DecksView";
import DeckDetails from "./screens/DeckDetails";
import DeckInput from "./screens/DeckInput";
import CardInput from "./screens/CardInput";
import CardDetails from "./screens/CardDetails";
import DeckEdit from "./screens/DeckEdit";

const store = configureStore();

function GenericStatusBar({ backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const RootStack = createStackNavigator(
  {
    Home: DecksView,
    NewDeck: DeckInput,
    DeckDetails: DeckDetails,
    NewCard: CardInput,
    CardDetails: CardDetails,
    EditDeck: DeckEdit
  },
  {
    navigationOptions: {
      header: null
    },
    InitialRouteName: "Home"
  }
);

export default () =>
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <GenericStatusBar
        backgroundColor="#747474"
        barStyle="light-content"
      />
      <RootStack />
    </View>
  </Provider>;
