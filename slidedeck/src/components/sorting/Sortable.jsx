import React from 'react';
import { SortContext } from './Sorting';

const animals = [
  'Cow',
  'Dog',
  'Cat',
  'Llama',
  'Wombat',
  'Zebra',
  'Albatross',
  'Narwhal',
  'Earthworm',
  'Jellyfish'
];

const Sortable = () => {
  const { sort } = React.useContext(SortContext);
  const sorted = [...animals].sort((a, b) => {
    if (sort === 'asc') {
      return a.localeCompare(b);
    } else if (sort === 'dsc') {
      return b.localeCompare(a);
    }
    return 0;
  });

  return (
    <div
      style={{
        margin: '20px',
        border: '1px solid black'
      }}
    >
      <ol>
        {sorted.map(val => (
          <li key={val}>{val}</li>
        ))}
      </ol>
    </div>
  );
};

export default Sortable;
