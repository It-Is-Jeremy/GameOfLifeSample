import Event from 'seedwork/build/src/Abstracts/Event';
import Guid from 'seedwork/build/src/ValueObjects/Guid';

class IncrementGameCommand extends Event {
  GameOfLifeId: Guid;
}

export = IncrementGameCommand;
