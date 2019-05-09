import React from 'react';
import Lightbulb from './Lightbulb';
import './button.css';

export default class LightSwitch extends React.Component {
  state = { isOn: false };

  turnOff = () => {
    this.setState({ isOn: false });
  };

  turnOn = () => {
    this.setState({ isOn: true });
  };

  render() {
    const { isOn } = this.state;
    return (
      <div>
        <Lightbulb on={isOn} />
        <button onClick={this.turnOff}>Off</button>
        <button onClick={this.turnOn}>On</button>
      </div>
    );
  }
}
