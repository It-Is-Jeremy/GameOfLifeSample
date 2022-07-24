import CellState = require('./CellState');

class Cell {
  private _state: CellState;

  public constructor(state: CellState = CellState.Dead) {
    this._state = state;
  }

  public getState: ()=>CellState = () => this._state;
}

export = Cell;
