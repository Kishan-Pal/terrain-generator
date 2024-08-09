class Tile {
  row;
  col;
  isCollapsed = false;
  possibilities;
  image = null;
  imageNumber;
  connectors;
  constructor(num) {
    this.possibilities = new Array(num + 1).fill(1);
    this.possibilities[0] = num;
  }
}

export default Tile;
