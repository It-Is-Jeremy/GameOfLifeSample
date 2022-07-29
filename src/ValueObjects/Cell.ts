import CellState from "./CellState";

class Cell {
  private _state: CellState;

  public constructor(state: CellState = CellState.Dead) {
    this._state = state;
  }

  public getState: ()=>CellState = () => this._state;
  public isAlive: () => boolean = () => this._state === CellState.Alive;
  public updateState = (state: CellState):void => {
    this._state = state;
  }
}

export = Cell;
