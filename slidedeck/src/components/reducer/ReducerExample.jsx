import React from 'react';

const initialState = {
  agents: []
};

const agents = ['Sterling Archer', 'Lana Kane', 'Cyril Figgis'];

const agentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return Object.assign({}, state, {
return {
  ...state, 
  agents: state.agents.concat(action.payload)
}
      });
    default:
      return state;
  }
};

class ReducerExample extends React.Component {
  state = initialState;

  addAgent = () => {
    const employee = agents.shift();
    if (employee) {
      const newState = agentReducer(this.state, {
        type: 'ADD_EMPLOYEE',
        payload: employee
      });

      this.setState(newState);
    }
  };

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        {agents.length > 0 ? (
          <button onClick={this.addAgent}>Add agent</button>
        ) : (
          <p>Out of agents!</p>
        )}
      </div>
    );
  }
}

export default ReducerExample;
