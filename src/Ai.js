/* eslint-disable no-mixed-operators */

import { MAX, MIN } from './constants';

function getBestChildIndex(role, children) {
  if (!children) return null;

  return children.reduce((bestI, currentChild, i) => {
    if (
      bestI === null
      || role === MAX && currentChild.value > children[bestI].value
      || role === MIN && currentChild.value < children[bestI].value
    ) {
      return i;
    }

    return bestI;
  }, null);
}

export default {
  getBestChildIndex,
};
