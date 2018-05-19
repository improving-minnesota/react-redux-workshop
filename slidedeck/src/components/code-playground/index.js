import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import './code-playground.css';

export default function CodePlayground({ code, noInline }) {
  return (
    <LiveProvider code={code.trim()} noInline={noInline}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
}
