import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { SlideDeck } from './components/slide-deck/slide-deck';
import { getSlides } from './util/get-slides';

ReactDOM.render(<SlideDeck slides={getSlides()}/>, document.getElementById('slide-root'));
