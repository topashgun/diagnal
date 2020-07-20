import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './App.css'
import Header from './components/header'
import Body from './components/Body'
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      searchText: ""
    }
    this.updateSearchText = this.updateSearchText.bind(this);
  }

  updateSearchText(event) {
    this.setState({
      searchText: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <Header updateSearchText={this.updateSearchText}></Header>
        <Body searchText={this.state.searchText}></Body>
      </div>
    );
  }
}

