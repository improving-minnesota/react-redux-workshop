import React from 'react';
import lightbulb from './light-bulb.svg';

const Lightbulb = props => {
  return (
    <div>
      <img
        src={lightbulb}
        style={{
          height: '150px',
          backgroundColor: props.on ? 'yellow' : 'transparent'
        }}
      />
    </div>
  );
};

export default Lightbulb;
