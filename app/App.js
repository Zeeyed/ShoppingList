import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  Keyboard
} from 'react-native';
import Header from './header';
import Footer from './footer';
import Row from './row';

class App extends Component {

  constructor(props){
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      value: '',
      items: [],
      allCollected: false,
      dataSource: dataSource.cloneWithRows([])
    }
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllCollected = this.handleToggleAllCollected.bind(this);
    this.setSource = this.setSource.bind(this);
  }

  setSource(items, itemsDatasource, restState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ...restState
    })
  }
  handleToggleAllCollected() {
    const collected = !this.state.allCollected;
    const newItems = this.state.items.map(item => ({
      ...item,
      collected
    }))
    this.setSource(newItems, newItems, { allCollected: collected})
  }

  handleAddItem(){
    if(!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        text: this.state.value,
        collected: false,
        key: Date.now(),
      }
    ];
    this.setSource(newItems, newItems, {value: ''})
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({ value })}
          onToggleAllCollected={this.handleToggleAllCollected}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({key, ...value}) => {
              return(
                <Row
                  key={key}
                  {...value}
                />
              )
            }}
            renderSeparator={(sectionId, rowId) => {
              return <View key={rowId} style={styles.seperator} />
            }}
          />
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    ...Platform.select({
      ios: { paddingTop: 40 }
    })
  },
  content: {
    flex: 1,
  },
  list:{
    backgroundColor: '#FFF'
  },
  seperator: {
    borderWidth: 1,
    borderColor: '#F5F5F5'
  }
});

export default App;
