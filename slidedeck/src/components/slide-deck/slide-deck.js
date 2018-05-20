import React, { Component } from 'react';

import 'prismjs';
import loadLanguages from 'prismjs/components/index.js';
import 'prismjs/plugins/keep-markup/prism-keep-markup.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';
import 'prismjs/plugins/unescaped-markup/prism-unescaped-markup.js';

import 'reveal.js/css/reveal.css';
import '@objectpartners/revealjs-theme';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/plugins/unescaped-markup/prism-unescaped-markup.css';

import './slide-deck.css';

export class SlideDeck extends Component {
  componentDidMount() {
    loadLanguages(['json', 'jsx']);
    require.ensure(
      [
        'reveal.js',
        'reveal.js/lib/js/classList.js',
        'reveal.js/lib/js/head.min.js',
        'reveal.js/lib/js/html5shiv.js'
      ],
      () => {
        const Reveal = require('reveal.js');
        require('reveal.js/lib/js/classList.js');
        require('reveal.js/lib/js/head.min.js');
        require('reveal.js/lib/js/html5shiv.js');

        window.Reveal = Reveal;

        Reveal.initialize({
          history: true,
          margin: 0.1,
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
      }
    );
  }

  render() {
    const { slides } = this.props;
    const { WORKSHOP_CLIENT: client, WORKSHOP_DATE: date } = process.env;
    return (
      <div className="reveal">
        <div className="slides">
          <section data-state="title">
            <h1>React</h1>
            <h2>
              {client} - {date}
            </h2>
          </section>
          {slides.map((deck, deckIndex) => {
            return (
              <section key={deckIndex}>
                {deck.map((html, slideIndex) => {
                  const key = `${deckIndex}-${slideIndex}`;
                  if (html.default) {
                    const Slide = html.default;
                    return (
                      <section key={key}>
                        <Slide />
                      </section>
                    );
                  }
                  return (
                    <section
                      key={key}
                      dangerouslySetInnerHTML={{ __html: html }} // #yolo
                    />
                  );
                })}
              </section>
            );
          })}
          <section data-state="title">
            <h1>Thanks!</h1>
            <h3>Follow us! @objectpartners</h3>
          </section>
        </div>
      </div>
    );
  }
}
