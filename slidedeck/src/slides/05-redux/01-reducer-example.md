import CodePlayground from '../../components/code-playground';

<CodePlayground code={`
const initialState = {
  agents: []
};

let agents = ['Sterling Archer', 'Lana Kane', 'Cyril Figgis'];

function agentReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return Object.assign({}, state, {
        agents: state.agents.concat(action.payload)
      });
    default:
      return state;
  }
}

class StateReducer extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.addAgent = this.addAgent.bind(this);
  }

  addAgent() {
    const employee = agents.shift();
    if (employee) {
      const newState = agentReducer(this.state, {
        type: 'ADD_EMPLOYEE',
        payload: employee
      });

      this.setState(newState);
    }
  }

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <button onClick={this.addAgent}>Add agent</button>
      </div>
    );
  }
}

render(<StateReducer />)

`} noInline />