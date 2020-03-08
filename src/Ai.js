import { MAX, MIN } from './constants'

const getBestChildIndex = (role, children) => children?.reduce((bestI, currentChild, i) => {
  if (
    bestI === null
    || role === MAX && currentChild.value > children[bestI].value
    || role === MIN && currentChild.value < children[bestI].value
  ) {
    return i;
  }

  return bestI;
}, null);

export default {
  getBestChildIndex,
};
