import GameOfLife from './GameofLife/GameOfLife';
import CreateGameOfLifeCommand from './GameofLife/Events/CreateGameOfLifeCommand';

// eslint-disable-next-line max-len
const GameOfLifeCreatedEventHandler = require('./GameofLife/Events/GameOfLifeCreatedEventHandler');

import {EventHandlerRegistry} from "seedwork";
import GameOfLifeInstance from "./Repository/GameOfLifeInstance";
import GamePrinter from "./Display/GamePrinter";
import IncrementGameCommand from "./GameofLife/Events/IncrementGenerationEvent";
const IncrementGameCommandHandler = require("./GameofLife/Events/IncrementGameCommandHandler");

const gridSize:number = Number.parseInt(process.env.npm_config_size || '10');

const setup = async (): Promise<InstanceType<typeof EventHandlerRegistry>> => {
    const eventHandlerRegistry = new EventHandlerRegistry();
    eventHandlerRegistry.
    register(new CreateGameOfLifeCommand(0),
        ()=>new GameOfLifeCreatedEventHandler());

    eventHandlerRegistry.register(new IncrementGameCommand(),
        ()=>new IncrementGameCommandHandler())
    const event = new CreateGameOfLifeCommand(gridSize);
    await eventHandlerRegistry.send(event);

    return eventHandlerRegistry;

}

const main = async () => {
    const eventHandlerRegistry = await setup();

    const gameOfLife = GameOfLifeInstance.getInstance();
    while(!gameOfLife.isStale()){
        GamePrinter.Print(gameOfLife);
        const incrementCommand = new IncrementGameCommand();
        await eventHandlerRegistry.send(incrementCommand);
        await new Promise(resolve => setTimeout(resolve, gridSize > 50 ? 150 : 200));
    }
}

main();