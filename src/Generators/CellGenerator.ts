import Cell = require('../ValueObjects/Cell');
import CellState = require('../ValueObjects/CellState');

class CellGenerator {
  public static generateCells = (size: number):Cell[][] => {
    const cells:Cell[][] = [];

    for (let i = 0; i < size; i++) {
      cells[i] = [];
      for (let n = 0; n < size; n++) {
        const state: CellState = (Math.round(Math.random())) as CellState;
        cells[i].push(new Cell(state));
      }
    }

    return cells;
  }
}

export = CellGenerator;
