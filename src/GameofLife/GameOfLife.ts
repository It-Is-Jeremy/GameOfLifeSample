import GameOfLifeCreatedEvent from './Events/GameOfLifeCreatedEvent';
import {Cell} from '../ValueObjects/Cell';

const {AggregateBase} = require('seedwork');
import IEvent = require('seedwork/build/src/Abstracts/IEvent');

class GameOfLife extends AggregateBase {
  private _size: number;
  private _cells: Cell[];

  public constructor(size:number) {
    super();
    this.handle(new GameOfLifeCreatedEvent(size));
  }

  public getSize: ()=>number = () => this._size;
  public getCells: ()=>Cell[] = () => this._cells;

  protected handle(event: IEvent) {
    switch (event) {
      case event as GameOfLifeCreatedEvent:
        this.handleCreationEvent(event as GameOfLifeCreatedEvent);
    }
  }

  private handleCreationEvent(event: GameOfLifeCreatedEvent) {
    this._size = event.Size;
    this._cells = [];
    for (let i=0; i<event.Size; i++) {
      this._cells.push(new Cell());
    }
  }
}

export = GameOfLife;
