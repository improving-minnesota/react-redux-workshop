import { invariant } from '../util';

const INDICES = ['base', 'sidebar', 'header'];

export const Z_INDEX = element => {
  const index = INDICES.indexOf(element);
  invariant(index > -1, `${element} not found in ${INDICES.join(' | ')}`);

  return index === -1 ? 1 : index + 1;
};
