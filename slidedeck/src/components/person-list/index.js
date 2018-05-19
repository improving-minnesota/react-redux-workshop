import React from 'react';

import './person-list.css';

export default function PersonList({ children }) {
  return <div className="person-list">{children}</div>;
}
