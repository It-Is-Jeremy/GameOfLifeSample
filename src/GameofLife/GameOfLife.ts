import Cell = require('../ValueObjects/Cell');
import {AggregateBase} from 'seedwork';
import CellGenerator = require('../Generators/CellGenerator');

class GameOfLife extends AggregateBase {
  private _size: number;
  private _cells: Cell[][];
  private _previousCells: Cell[][][];

  public constructor() {
    super();
    this._previousCells = [];
  }

  public createCells(size:number):void {
    this._size = size;
    this._cells = CellGenerator.generateCells(size);
  }

  public updateCells(cells:Cell[][]):void{
    this._previousCells.push([...this._cells]);
    this._cells = [...cells];
  }

  public isStale(): boolean{
    if(this._previousCells.length === 0 ){
      return false;
    }

    return this._cells
        .every((cellRow, cellRowIndex) =>
            this._previousCells[this._previousCells.length-1][cellRowIndex]
                .every((previousCell, innerIndex) =>
                    cellRow[innerIndex].getState() === previousCell.getState()));
  }

  public getSize = (): number => this._size;
  public getCells = (): Cell[][] => [...this._cells.map(cellRows => cellRows.slice())];


}

export = GameOfLife;
