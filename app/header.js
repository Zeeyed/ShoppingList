import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={this.props.onToggleAllCollected}>
          <Text style={styles.toggle}>{String.fromCharCode(10003)}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder='Type yourss product'
          value={this.props.value}
          onChangeText={this.props.onChange}
          onSubmitEditing={this.props.onAddItem}
          returnKeyType='done'
          blurOnSubmit={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    height: 60,
    fontSize: 16,
    marginLeft: 17
  },
  toggle: {
    fontSize: 30,
    color: '#CCC'
  }
});
export default Header;