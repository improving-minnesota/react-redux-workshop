import React, { Component } from 'react';

import './counter.css';

const decrement = state => ({
  count: state.count - 1
});
const increment = state => ({
  count: state.count + 1
});

export default class Counter extends Component {
  state = {
    count: 0
  };

  decrement = () => this.setState(decrement);
  increment = () => this.setState(increment);

  render() {
    const message =
      this.state.count > 5 ? 'Alright alright you get it' : this.state.count;
    return (
      <div className="counter">
        <h2>Count: {message}</h2>
        <div className="button-container">
          <button onClick={this.decrement}>-</button>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }
}
