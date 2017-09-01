import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { SlideDeck } from './components/slide-deck/slide-deck';
import { getSlides } from './util/get-slides';

const slides = getSlides();

ReactDOM.render(
  <SlideDeck slides={slides} />,
  document.getElementById('slide-root')
);
