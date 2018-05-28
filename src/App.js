import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { createStackNavigator } from "react-navigation";
import { View, StatusBar } from "react-native";
import { Constants } from "expo";

/* Screens */
import DecksView from "./screens/DecksView";
// import DeckDetails from "./components/DeckDetails";
// import DeckInput from "./components/DeckInput";
// import CardInput from "./components/CardInput";

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
    Home: DecksView
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
