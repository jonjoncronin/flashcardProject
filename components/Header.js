import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class Header extends React.Component {
  render() {
    const {left, center, right} = this.props;
    return (
      <View style={{height: 40, flexDirection: 'row'}}>
        <View style={{flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: '#272727'}}>
          <Text style={{textAlign: 'left', color: 'white'}}>
            {left}
          </Text>
        </View>
        <View style={{flex: 2, alignContent: 'center', justifyContent: 'center', backgroundColor: '#272727'}}>
          <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>
            {center}
          </Text>
        </View>
        <View style={{flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: '#272727'}}>
          <Text style={{textAlign: 'right', color: 'white'}}>
            {right}
          </Text>
        </View>
      </View>
    )
  }
}

export default Header;
