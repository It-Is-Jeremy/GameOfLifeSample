import {EventHandlerBase} from "seedwork";
import GameOfLife from "../GameOfLife";
import GameOfLifeInstance from "../../Repository/GameOfLifeInstance";
import Cell from "../../ValueObjects/Cell";
import IncrementGameCommand from "./IncrementGenerationEvent";
import Aggregate from "seedwork/build/src/Abstracts/Aggregate";
import CellState from "../../ValueObjects/CellState";
import GamePrinter from "../../Display/GamePrinter";

type NeighbourCellsMetaData = {
    LiveNeighbours: number;
    DeadNeighbours: number;
}

type position = {
    y: number,
    x: number,
}

class IncrementGameCommandHandler extends EventHandlerBase<IncrementGameCommand, void>{
    protected handle(context: GameOfLife, event: IncrementGameCommand): Promise<void> {
        const cells:Cell[][] = [];
        const gameOfLifeCells=context.getCells();
        for(let y=0; y<gameOfLifeCells.length; y++){
            cells.push([]);
            for(let x=0; x < gameOfLifeCells.length; x++){
                const neighbourCellMetaData = this.getNeighbourCellMetaData({y,x}, gameOfLifeCells, context.getSize());
                if(!gameOfLifeCells[y][x].isAlive() &&  neighbourCellMetaData.LiveNeighbours === 3){
                    cells[y].push(new Cell(CellState.Alive));
                }
                else if(!(gameOfLifeCells[y][x].isAlive() && (neighbourCellMetaData.LiveNeighbours === 2 || neighbourCellMetaData.LiveNeighbours === 3))){
                    cells[y].push(new Cell(CellState.Dead));
                }else{
                    cells[y].push(gameOfLifeCells[y][x]);
                }

            }
        }

        context.updateCells(cells);
        return Promise.resolve();
    }

    private getNeighbourCellMetaData(cellPosition:position, cells:Cell[][], gridSize: number): NeighbourCellsMetaData{
        const maxLength = cells.length;

        let liveCount = 0;
        let deadCount = 0;

        const incrementLiveAndDeadCount = (cell: Cell) => {
            if(cell.isAlive()){
                liveCount+=1;
            }
            else{
                deadCount+=1
            }
        }

        const leftNeighbour = cellPosition.x === 0 ? cells[cellPosition.y][gridSize-1] : cells[cellPosition.y][cellPosition.x -1];
        const rightNeighbour = cellPosition.x === gridSize-1 ? cells[cellPosition.y][0] : cells[cellPosition.y][cellPosition.x + 1];
        const aboveNeighbour = cellPosition.y === 0 ? cells[gridSize-1][cellPosition.x] : cells[cellPosition.y - 1][cellPosition.x];
        const belowNeighbour = cellPosition.y === gridSize-1 ? cells[0][cellPosition.x] : cells[cellPosition.y + 1][cellPosition.x];
        const leftAboveNeighbour = cellPosition.y === 0 ?
            (cellPosition.x === 0 ? cells[gridSize-1][gridSize-1] : cells[gridSize-1][cellPosition.x-1]) :
            (cellPosition.x === 0 ? cells[cellPosition.y-1][gridSize-1] : cells[cellPosition.y - 1][cellPosition.x -1]);

        const leftBelowNeighbour =
            cellPosition.y === gridSize-1 ?
                (cellPosition.x === 0 ? cells[0][gridSize-1] : cells[0][cellPosition.x-1] ):
                (cellPosition.x === 0 ? cells[cellPosition.y+1][gridSize-1] : cells[cellPosition.y + 1][cellPosition.x -1 ]);

        const rightAboveNeighbour = cellPosition.y === 0 ?
            (cellPosition.x === gridSize-1 ? cells[gridSize-1][0] : cells[gridSize-1][cellPosition.x + 1]) :
            (cellPosition.x === gridSize-1 ? cells[cellPosition.y-1][0] : cells[cellPosition.y - 1][cellPosition.x + 1]);

        const rightBelowNeighbour = cellPosition.y === gridSize-1 ?
            cellPosition.x === gridSize-1 ? cells[0][0] :cells[0][cellPosition.x + 1] :
            cellPosition.x === gridSize-1 ? cells[gridSize-1][0] :cells[cellPosition.y + 1][cellPosition.x + 1];

        incrementLiveAndDeadCount(leftNeighbour);
        incrementLiveAndDeadCount(rightNeighbour);
        incrementLiveAndDeadCount(aboveNeighbour);
        incrementLiveAndDeadCount(belowNeighbour);
        incrementLiveAndDeadCount(leftAboveNeighbour);
        incrementLiveAndDeadCount(leftBelowNeighbour);
        incrementLiveAndDeadCount(rightAboveNeighbour);
        incrementLiveAndDeadCount(rightBelowNeighbour);

        return {
            DeadNeighbours: deadCount,
            LiveNeighbours: liveCount,
        };
    }

    protected loadContext(event: IncrementGameCommand): Promise<Aggregate> {
        return Promise.resolve(GameOfLifeInstance.getInstance());
    }

    protected onError(error: unknown, event: IncrementGameCommand): Promise<void> {
        return Promise.resolve();
    }

}

export = IncrementGameCommandHandler;