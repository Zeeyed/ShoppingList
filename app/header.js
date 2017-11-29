import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TextInput
          value={this.props.value}
          onChangeText={this.props.onChange}
          onSubmitEditing={this.props.onAddItem}
          placeholder='just a placeholder'
          blurOnSubmit={false}
          returnKeyType='done'
          style={styles.input}
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
    height: 60
  }
});
export default Header;