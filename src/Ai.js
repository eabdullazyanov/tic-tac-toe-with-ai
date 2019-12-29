export default class {
  delay = 1000;
  getBestMove(node){
    let bestKey = null;
    for (const key in node) {
      if (!bestKey || node[key].winChance > node[bestKey].winChance) bestKey = key;
    }
    return bestKey;
  }
}
