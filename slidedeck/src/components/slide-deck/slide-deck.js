import React, { Component } from 'react';

import 'reveal.js/css/reveal.css';
import '@objectpartners/revealjs-theme';
import 'highlight.js/styles/monokai.css';

import './slide-deck.css';

export class SlideDeck extends Component {
  componentDidMount() {
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

      window.Reveal = Reveal;
      const hljs = require('highlight.js');

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
          },
          {
            src: '',
            callback() {
              hljs.initHighlightingOnLoad();
            }
          }
        ]
      });

    });
  }

  render() {
    const { slides } = this.props;
    return (
      <div className="reveal">
        <div className="slides">
          <section data-state="title">
            <h1>React</h1>
            <h2>HDC - September 6, 2017</h2>
          </section>
          {
            slides
              .map((deck, deckIndex) => {
                return (
                  <section key={deckIndex}>
                    {
                      deck
                        .map((html, slideIndex) => {
                          return (
                            <section
                              key={`${deckIndex}-${slideIndex}`} dangerouslySetInnerHTML={{ __html: html }} // #yolo
                            />
                          );
                        })
                    }
                  </section>
                );
              })
          }
          <section data-state="title">
            <h1>Thanks!</h1>
            <h3>Follow us! @objectpartners</h3>
          </section>
        </div>
      </div>
    );
  }
}
