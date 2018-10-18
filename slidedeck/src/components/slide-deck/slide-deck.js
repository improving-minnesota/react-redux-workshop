import React, { Component } from 'react';

import 'prismjs';

import 'reveal.js/css/reveal.css';
import '@objectpartners/revealjs-theme';

import './slide-deck.css';

export class SlideDeck extends Component {
  componentDidMount() {
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

  getSectionProps(html) {
    const section = html.match(/<section[^>]+/);
    if (!section) {
      return {};
    }

    const props = section
      .pop()
      .replace(/<section\s/, '')
      .split(/([\w-]+)="([^"]+)"/)
      .filter(part => part && part.length > 0);

    return props.reduce((merged, part, index) => {
      if (part % 1 === 0) {
        merged[part] = '';
      } else if (props[index - 1]) {
        merged[props[index - 1]] = part;
      }
      return merged;
    }, {});
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
                  const sectionProps = this.getSectionProps(html);
                  return (
                    <section
                      key={key}
                      {...sectionProps}
                      dangerouslySetInnerHTML={{ __html: html }} // #yolo
                    />
                  );
                })}
              </section>
            );
          })}
          <section data-background="https://media.giphy.com/media/eTVG7eVNnud8Y/giphy.gif">
            <h2>Questions</h2>
          </section>
          <section data-state="title">
            <h1>Thank you!</h1>
            <h3>Follow us! @objectpartners</h3>
          </section>
        </div>
      </div>
    );
  }
}
