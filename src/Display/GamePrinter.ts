import GameOfLife from "../GameofLife/GameOfLife";
import Cell from "../ValueObjects/Cell";

const deadSymbol = " ";
const aliveSymbol = "■";

class GamePrinter {

    public static Print(game:GameOfLife):void {
        const cells = game.getCells();
        console.clear();
        for (let i = 0; i < cells.length; i++) {
            let line = '';
            for(let n = 0; n < cells.length; n++){
                const cell = cells[i][n];
                line += this.getSymbol(cell.isAlive())+' ';
            }
            console.log(line);
        }
    }

    private static getSymbol = (isAlive: boolean): string => isAlive ? aliveSymbol : deadSymbol;

}

export = GamePrinter;