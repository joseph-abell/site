import { Accessor, Setter, createSignal } from "solid-js";
import Main from "../components/Main";

const transposeArray = (array: any[][]) => {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

export const checkEndgame = (grid: Accessor<string[][]>, setGameOver: Setter<boolean>, setWinner: Setter<boolean>) => {
    const groupByRow = Object.values(grid()).map(i => i.join(','));
    const groupByColumn = Object.values(transposeArray(grid())).map(i => i.join(','));

    if (new Set(groupByRow).size < groupByRow.length) {
        console.log('Failed on unique row check', groupByRow);
        setGameOver(true);
    } else if (new Set(groupByColumn).size < groupByColumn.length) {
        console.log('Failed on unique column check', groupByColumn);
        setGameOver(true);
    } else {
        console.log('should win', groupByRow, groupByColumn)
        setWinner(true);
    }
}

export const checkGameOver = (
    gridSize: number,
    grid: Accessor<string[][]>,
    setGameOver: Setter<boolean>,
    setWinner: Setter<boolean>
) => {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize - 2; j++) {
            if (grid()[i][j] && grid()[i][j] === grid()[i][j + 1] && grid()[i][j] === grid()[i][j + 2]) {
                setGameOver(true);
                return;
            } else if (grid()[j][i] && grid()[j][i] === grid()[j + 1][i] && grid()[j][i] === grid()[j + 2][i]) {
                setGameOver(true);
                return;
            }
        }
    }

    if (!grid().flat().includes(null)) {
        checkEndgame(grid, setGameOver, setWinner);
    }
};

export const handleCellClick = (
    row: number,
    col: number,
    event: any,
    gameOver: Accessor<boolean>,
    setGameOver: Setter<boolean>,
    winner: Accessor<boolean>,
    setWinner: Setter<boolean>,
    grid: Accessor<string[][]>,
    setGrid: Setter<string[][]>,
    gridSize: number,

) => {
    if (!gameOver() && !winner() && grid()[row][col] === null) {
        const cellHeight = 50;
        const rect = event.target.getBoundingClientRect();
        const y = event.clientY - rect.top;

        const isTopHalf = y < cellHeight / 2;

        const newGrid = [...grid()];
        newGrid[row][col] = isTopHalf ? 'blue' : 'orange';
        setGrid(newGrid);

        checkGameOver(gridSize, grid, setGameOver, setWinner);
    }
};

export const fillRandomCells = (
    grid: Accessor<string[][]>,
    setGrid: Setter<string[][]>,
    gridSize: number
) => {
    const newGrid = [...grid()];
    let filledCells = 0;

    while (filledCells < 5) {
        const randomRow = Math.floor(Math.random() * gridSize);
        const randomCol = Math.floor(Math.random() * gridSize);

        if (newGrid[randomRow][randomCol] === null) {
            const randomColor = Math.random() < 0.5 ? 'blue' : 'orange';
            newGrid[randomRow][randomCol] = randomColor;
            filledCells++;
        }
    }

    setGrid(newGrid);
};

const Binairo = () => {
    const gridSize = 5;
    const initialGrid = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => null))
    const [grid, setGrid] = createSignal(initialGrid);

    const [gameOver, setGameOver] = createSignal(false);
    const [winner, setWinner] = createSignal(false);

    fillRandomCells(grid, setGrid, gridSize);

    const onCellClick = (rowIndex: number, colIndex: number, e: any) => {
        handleCellClick(
            rowIndex,
            colIndex,
            e,
            gameOver, setGameOver,
            winner, setWinner,
            grid, setGrid,
            gridSize
        )
    }

    const resetGameClick = () => {
        setGrid(Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => null)));
        fillRandomCells(grid, setGrid, gridSize);
        setGameOver(false);
        setWinner(false);
    }

    return (
            <Main>
                <div class='container'>
                <h1 style='margin: 20px 0'>Binairo</h1>

                <h2>Rules</h2>
                <ul style='margin-bottom: 20px;'>
                    <li>You cannot have 3 of the same colour next to each other, vertically, or horizontally</li>
                    <li>Each row should be unique</li>
                    <li>Each column should be unique</li>
                    <li>Click on a coloured semi circle to choose the colour for that cell</li>
                </ul>

                <button style='margin-bottom: 20px;' onClick={resetGameClick}>Reset Game</button>

                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; width: 260px;">
                    {grid().map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                            let background = `linear-gradient(to bottom, blue 50%, orange 50%)`;
                            if (cell === 'blue') background = 'blue';
                            if (cell === 'orange') background = 'orange';

                            return (
                                <div
                                    style={`width: 50px; height: 50px; background: ${background}; border-radius: 20px; border: 2px solid white`}
                                    onClick={(e) => onCellClick(rowIndex, colIndex, e)}
                                />
                            )
                        })
                    )}
                </div>

                {gameOver() && (<h2 style='background: red; color: white; padding: 20px; border-radius: 3px; margin-top: 20px; height: 4rem;'>Game Over</h2>)}
                {winner() && (<h2 style='background: green; color: white; padding: 20px; border-radius: 3px; margin-top: 20px; height: 4rem;'>You Win!</h2>)}

                </div>

            </Main>
    );
};

export default Binairo;
