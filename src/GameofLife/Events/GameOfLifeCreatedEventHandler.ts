import IAggregate from 'seedwork/build/src/Abstracts/IAggregate';
import GameOfLifeCreatedEvent = require('./GameOfLifeCreatedEvent');
import GameOfLife = require('../GameOfLife');
const {SynchronousEventHandlerBase} = require('seedwork');

class GameOfLifeCreatedEventHandler
  extends SynchronousEventHandlerBase<GameOfLifeCreatedEvent> {
  protected handle(context: GameOfLife, event: GameOfLifeCreatedEvent): void {
    context.createCells(event.Size);
  }

  protected loadContext(event: GameOfLifeCreatedEvent): IAggregate {
    return GameOfLife.getInstance();
  }

  protected onError(error: unknown, event: GameOfLifeCreatedEvent): void {

  }
}

export = GameOfLifeCreatedEventHandler;
