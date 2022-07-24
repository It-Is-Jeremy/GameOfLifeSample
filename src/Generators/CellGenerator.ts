import Cell = require('../ValueObjects/Cell');
import CellState = require('../ValueObjects/CellState');

class CellGenerator {
  public static generateCells = (size: number):Cell[] => {
    const cells = [];

    for (let i = 0; i < size * 2; i++) {
      const state: CellState = (Math.round(Math.random())) as CellState;
      cells.push(new Cell(state));
    }

    return cells;
  }
}

export = CellGenerator;
