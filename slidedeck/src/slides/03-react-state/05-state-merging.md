import CodePlayground from '../../components/code-playground';

<CodePlayground code={`
class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    }
  }

  fetchPosts() {
    setTimeout(() => {
      this.setState({
        posts: ['Post 1', 'Post 2']
      });
    }, 1000);
  }

  fetchComments() {
    setTimeout(() => {
      this.setState({
        comments: ['Comment Uno', 'Comment Dos', 'Comment Catorce']
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        <h3>Posts</h3>
        {this.state.posts.map(post => <div key={post}>{post}</div>)}
        <h3>Comments</h3>
        {this.state.comments.map(comment => <div key={comment}>{comment}</div>)}
        <button onClick={() => this.fetchPosts()}>Get posts</button>
        <button onClick={() => this.fetchComments()}>Get comments</button>
      </div>
    );
  }
}
`} />