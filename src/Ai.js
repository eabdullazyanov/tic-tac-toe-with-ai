export default class {
  delay = 1000;
  getBestMove(node){
    let firstAvailable;
    console.log('node', node);
    for (let i = 0; i < node.children.length; i++) {
      console.log('i', i);
      if (node.children[i]?.value === node.value) return i;
    }

    return null;
  }
}
