import GameOfLife from './GameofLife/GameOfLife';
import GameOfLifeCreatedEvent from './GameofLife/Events/GameOfLifeCreatedEvent';

import {SynchronousEventHandlerRegistry} from 'seedwork';
// eslint-disable-next-line max-len
const GameOfLifeCreatedEventHandler = require('./GameofLife/Events/GameOfLifeCreatedEventHandler');

const syncHandlerRegistry = new SynchronousEventHandlerRegistry();
syncHandlerRegistry.
    register(new GameOfLifeCreatedEvent(0),
        ()=>new GameOfLifeCreatedEventHandler());

const gridSize:string = process.env.npm_config_size ?? '10';

console.log(`Starting Game of Life for grid of size: ${gridSize}`);

const event = new GameOfLifeCreatedEvent(Number.parseInt(gridSize));
const handler = syncHandlerRegistry.getHandler(event);

handler.apply(event);

const game = GameOfLife.getInstance();
console.log(JSON.stringify(game));
