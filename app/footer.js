import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Footer extends Component {
  render() {
    const { filter } = this.props;
    const COLLECTED = 'COLLECTED',
    WAITING = 'WAITING',
    ALL = 'ALL';
    return (
      <View style={styles.wrapper}>
        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filterElement, filter === ALL && styles.active]}
            onPress={() => this.props.onFilter(ALL)}
          >
            <Text>All</Text> 
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterElement, filter === WAITING && styles.active]}
            onPress={() => this.props.onFilter(WAITING)}
          >
            <Text>Waiting</Text> 
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterElement, filter === COLLECTED && styles.active]}
            onPress={() => this.props.onFilter(COLLECTED)}
          >
            <Text>Collected</Text> 
          </TouchableOpacity>
        </View>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14
  },
  filters: {
    flexDirection: 'row'
  },
  filterElement: {
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8
  },
  active: {
    borderColor: 'rgba(175, 47, 47, .2)'
  }
});

export default Footer;