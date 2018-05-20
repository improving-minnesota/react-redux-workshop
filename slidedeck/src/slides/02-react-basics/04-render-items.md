import CodePlayground from '../../components/code-playground';

<CodePlayground code={`
function Todos(props) {
  return (
    <ul>
      {
        props.items
          .map(item =>
            <li key={item}>
              <input type="checkbox" />
              {item}
            </li>
          )
      }
    </ul>
  );
}

render(
  <Todos
    items={[
      'Teach React',
      'Teact Redux'
    ]}
  />
);
`} noInline />
