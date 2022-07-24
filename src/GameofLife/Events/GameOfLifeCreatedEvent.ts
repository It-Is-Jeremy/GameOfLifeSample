import Event from 'seedwork/build/src/Abstracts/Event';

class GameOfLifeCreatedEvent extends Event {
  public readonly Size: number;

  constructor(size:number) {
    super();
    this.Size = size;
  }
}

export = GameOfLifeCreatedEvent;
