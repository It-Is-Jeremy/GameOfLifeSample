import Cell = require('../ValueObjects/Cell');
import {AggregateBase} from 'seedwork';
import CellGenerator = require('../Generators/CellGenerator');

class GameOfLife extends AggregateBase {
  private static instance: GameOfLife;
  private _size: number;
  private _cells: Cell[];

  private constructor() {
    super();
  }

  public static getInstance(): GameOfLife {
    if (!GameOfLife.instance) {
      GameOfLife.instance = new GameOfLife();
    }

    return GameOfLife.instance;
  }

  public createCells(size:number):void {
    this._size = size;
    this._cells = CellGenerator.generateCells(size);
  }

  public getSize = (): number => this._size;
  public getCells = (): Cell[] => this._cells;
}

export = GameOfLife;
