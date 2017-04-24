import { Component, Input, OnInit } from '@angular/core';

import 'reveal.js/css/reveal.css';
import 'object-partners-revealjs-theme';
import 'highlight.js/styles/monokai.css';


@Component({
  selector: 'opi-slide-deck',
  templateUrl: './slide-deck.component.pug',
  styleUrls: ['./slide-deck.component.scss']
})
export class SlideDeckComponent implements OnInit {
  @Input()
  slides: any[][];

  constructor() { }

  ngOnInit() {
    require.ensure([
      'reveal.js',
      'reveal.js/lib/js/classList.js',
      'reveal.js/lib/js/head.min.js',
      'reveal.js/lib/js/html5shiv.js',
      'highlight.js'
    ], () => {
      const Reveal = require('reveal.js');
      require('reveal.js/lib/js/classList.js');
      require('reveal.js/lib/js/head.min.js');
      require('reveal.js/lib/js/html5shiv.js');

      (window as any).Reveal = Reveal;

      Reveal.initialize({
        history: true,
        margin: 0.20,
        dependencies: [
          {
            async: true,
            src: require('reveal.js/plugin/zoom-js/zoom.js')
          },
          {
            async: true,
            src: require('reveal.js/plugin/markdown/marked.js')
          },
          {
            async: true,
            src: require('reveal.js/plugin/notes/notes.js')
          }
        ]
      });
    });
  }
}
