import GameOfLife from './GameofLife/GameOfLife';

const gridSize:string = process.env.npm_config_size ?? '10';

console.log(`Starting Game of Life for grid of size: ${gridSize}`);

const game = new GameOfLife(Number.parseInt(gridSize));
console.log(game.getCells());
