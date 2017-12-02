import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Row extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10
  },
  text: {
    color: '#4d4d4d',
    fontSize: 25
  }
});

export default Row;