import CodePlayground from '../../components/code-playground';

<CodePlayground code={`
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        posts: ['Post 1', 'Post 2']
      });
    }, 1500);

    setTimeout(() => {
      this.setState({
        comments: ['Comment Uno', 'Comment Dos', 'Comment Catorce']
      });
    }, 3000);
  }

  render() {
    return (
      <div>
        <h3>Posts</h3>
        {this.state.posts.map(post => <div key={post}>{post}</div>)}
        <h3>Comments</h3>
        {this.state.comments.map(comment => <div key={comment}>{comment}</div>)}
      </div>
    );
  }
}
`} />