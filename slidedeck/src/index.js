import React from 'react';
import ReactDOM from 'react-dom';

import { SlideDeck } from './components/slide-deck/slide-deck';
import { getSlides } from './util/get-slides';

import './index.css';

const slides = getSlides();

ReactDOM.render(
  <SlideDeck slides={slides} />,
  document.getElementById('slide-root')
);
