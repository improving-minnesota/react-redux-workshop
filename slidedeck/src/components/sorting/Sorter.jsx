import React from 'react';
import { SortContext } from './Sorting';

const Sorter = () => {
  const { sort, setSort } = React.useContext(SortContext);
  console.log(`Sorter: ${sort}`);
  return (
    <div
      style={{
        margin: '20px',
        border: '1px solid black'
      }}
    >
      <select
        value={sort}
        onChange={event => setSort(event.currentTarget.value)}
        style={{
          fontSize: '24px'
        }}
      >
        <option value="asc">Ascending</option>
        <option value="dsc">Descending</option>
        <option value="">None</option>
      </select>
    </div>
  );
};

export default Sorter;
