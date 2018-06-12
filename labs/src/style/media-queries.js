import { invariant } from '../util';

const BREAKPOINTS = {
  large: 768
};

export const MEDIA = {
  greaterThan(size) {
    const exists = BREAKPOINTS.hasOwnProperty(size);
    invariant(exists, `The size '${size}' was not found in (${Object.keys(BREAKPOINTS).join(' | ')})`);

    const breakpoint = BREAKPOINTS[size] || 0;

    return `@media only screen and (min-width: ${breakpoint}px)`;
  }
};
