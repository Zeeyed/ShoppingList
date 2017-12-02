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

const filterProducts = (filter, items) => {
  return items.filter(item => {
    if(filter === 'ALL') return true;
    if(filter === 'WAITING') return !item.collected;
    if(filter === 'COLLECTED') return item.collected;
  });
}

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
      dataSource: dataSource.cloneWithRows([]),
      filter: 'ALL'
    }
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleFilterItems = this.handleFilterItems.bind(this);
    this.handleToggleAllCollected = this.handleToggleAllCollected.bind(this);
    this.handleToggleCollected = this.handleToggleCollected.bind(this);
    this.setSource = this.setSource.bind(this);
  }

  setSource(items, itemsDatasource, restState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ...restState
    });
  }
  handleDeleteItem(key) {
    const newItems = this.state.items.filter(item => {
      return item.key !== key
    });
    this.setSource(newItems, filterProducts(this.state.filter, newItems));
  }
  handleFilterItems(filter) {
    this.setSource(this.state.items,
      filterProducts(filter, this.state.items),
      { filter }
    )
  }
  handleToggleCollected(key, collected) {
    const newItems = this.state.items.map(item => {
      if(item.key !== key) return item;
      return {
        ...item,
        collected
      }
    });
    this.setSource(newItems, filterProducts(this.state.filter, newItems));
  }
  handleToggleAllCollected() {
    const collected = !this.state.allCollected;
    const newItems = this.state.items.map(item => ({
      ...item,
      collected
    }))
    this.setSource(newItems, filterProducts(this.state.filter, newItems), { allCollected: collected})
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
    this.setSource(newItems, filterProducts(this.state.filter, newItems), {value: ''})
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
                  onCollected={(collected) => this.handleToggleCollected(key, collected)}
                  onDelete={() => this.handleDeleteItem(key)}
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
        <Footer
          filter={this.state.filter}
          onFilter={this.handleFilterItems}
        />
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
