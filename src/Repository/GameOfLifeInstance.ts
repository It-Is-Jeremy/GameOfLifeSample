import GameOfLife from "../GameofLife/GameOfLife";

class GameOfLifeInstance {
    private static instance:GameOfLife;

    public static getInstance(): GameOfLife {
        if (!GameOfLifeInstance.instance) {
            GameOfLifeInstance.instance = new GameOfLife();
        }

        return GameOfLifeInstance.instance;
    }

}

export = GameOfLifeInstance;