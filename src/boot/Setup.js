import * as Expo from "expo";
import React from "react";
import FlashQuizApp from "../FlashQuizApp";

/**
 * Setup Component allows for loading of Expo components. Follows the pattern
 * laid out by Expo examples.
 * @extends React
 */
class Setup extends React.Component {
  state = {
    isReady: false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return <FlashQuizApp />;
  }
}

export default Setup;
