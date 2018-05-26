import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class Header extends React.Component {
  render() {
    const {left, center, right} = this.props;
    return (
      <View style={{margin: 5, height: 30, flexDirection: 'row'}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text style={{textAlign: 'left'}}>
            {left}
          </Text>
        </View>
        <View style={{flex: 2, justifyContent: 'center', alignContent: 'center', backgroundColor: 'white'}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            {center}
          </Text>
        </View>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text style={{textAlign: 'right'}}>
            {right}
          </Text>
        </View>
      </View>
    )
  }
}

export default Header;
