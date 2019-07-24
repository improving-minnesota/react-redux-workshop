import React from 'react';
import Sortable from './Sortable';
import Sorter from './Sorter';

const SortContext = React.createContext({
  sort: 'dsc',
  setSort: () => {
    console.log('default setter');
  }
});

class Sorting extends React.Component {
  state = {
    sort: 'asc'
  };

  updateSort = newSort => {
    console.log(`UpdateSort: ${newSort}`);
    this.setState({
      sort: newSort
    });
  };

  render() {
    const { sort } = this.state;

    return (
      <SortContext.Provider
        value={{
          sort,
          setSort: this.updateSort
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 'auto',
            flexDirection: 'column',
            margin: '20px',
            border: '1px solid black'
          }}
        >
          <small>Context level, sort is '{sort}'</small>
          <Sorter />
          <Sortable />
        </div>
      </SortContext.Provider>
    );
  }
}

export { SortContext };

export default Sorting;
