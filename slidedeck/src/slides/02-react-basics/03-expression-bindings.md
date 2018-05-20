import CodePlayground from '../../components/code-playground';

<CodePlayground code={`
function Hello(props) {
  return (
    <h1>
      Hello {props.name}!
    </h1>
  );
}

render(
  <Hello
    name="World"
  />
);
`} noInline />
