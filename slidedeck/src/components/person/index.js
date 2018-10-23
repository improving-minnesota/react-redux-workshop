import React from 'react';
import { FaTwitter } from 'react-icons/fa';

import './person.css';

export default function Person({ avatar, name, title, twitter }) {
  return (
    <div className="person">
      <img className="person-avatar" src={avatar} />
      <div className="person-details">
        <h2 className="person-name">{name}</h2>
        <h3 className="person-title">{title}</h3>
        <a
          className="person-twitter"
          href={`https://twitter.com/${twitter}`}
          target="_blank"
          rel="noopener"
        >
          <FaTwitter className="icon" color="#1da1f2" />@{twitter}
        </a>
      </div>
    </div>
  );
}
