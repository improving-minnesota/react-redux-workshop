import CodePlayground from '../../components/code-playground';

<CodePlayground code={`
class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev) {
    const name = ev.target.value;
    // TODO
    this.setState({
      name
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <h1>{this.state.name}</h1>
      </div>
    );
  }
}
`} />
