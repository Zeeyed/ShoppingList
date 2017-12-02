import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';

class Row extends Component {
  render() {
    const { collected } = this.props;
    return (
      <View style={styles.wrapper}>
        <Switch
          value={collected}
          onValueChange={this.props.onCollected}
        />
        <View style={styles.textWrapper}>
          <Text style={[styles.text, collected && styles.collected]}>
            {this.props.text}
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.props.onDelete}
        >
          <Text style={styles.delete}>X</Text>
        </TouchableOpacity>
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
  },
  textWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
  collected: {
    textDecorationLine: 'line-through'
  },
  delete: {
    color: '#cc9a9a',
    fontSize: 18
  }
});

export default Row;