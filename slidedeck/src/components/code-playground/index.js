import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import 'prismjs/themes/prism-okaidia.css';
import './code-playground.css';

export default function CodePlayground({ code, noInline }) {
  return (
    <LiveProvider
      code={code.trim()}
      mountStylesheet={false}
      noInline={noInline}
    >
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
}
