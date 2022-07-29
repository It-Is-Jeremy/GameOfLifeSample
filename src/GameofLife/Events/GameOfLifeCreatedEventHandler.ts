import CreateGameOfLifeCommand = require('./CreateGameOfLifeCommand');
import GameOfLife = require('../GameOfLife');
import {EventHandlerBase} from 'seedwork';
import Aggregate from 'seedwork/build/src/Abstracts/Aggregate';
import GameOfLifeInstance from '../../Repository/GameOfLifeInstance';

class GameOfLifeCreatedEventHandler extends EventHandlerBase<CreateGameOfLifeCommand, void> {
  constructor() {
    super();
  }

  protected handle(context: GameOfLife, event: CreateGameOfLifeCommand): Promise<void> {
    context.createCells(event.Size);
    return Promise.resolve();
  }

  protected loadContext(event: CreateGameOfLifeCommand): Promise<GameOfLife> {
    return Promise.resolve(GameOfLifeInstance.getInstance());
  }

  protected onError(error: unknown, event: CreateGameOfLifeCommand): Promise<void> {
    return Promise.resolve();
  }
}

export = GameOfLifeCreatedEventHandler;
