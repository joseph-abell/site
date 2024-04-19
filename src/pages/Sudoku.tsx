import { For, createEffect, createSignal } from 'solid-js';
import Main from '../components/Main';

const SudokuCell = (props: any) => {
    const [classname, setClassname] = createSignal('sudoku-cell');

    createEffect(() => {
        let c = 'sudoku-cell';
        const selected = props.selectedCell().colIndex === props.colIndex() && props.selectedCell().rowIndex === props.rowIndex();
        if (selected) {
            c = c.concat(' selected');
        }

        if (props.colIndex() === 2 || props.colIndex() === 5) {
            c = c.concat(' border-right-thick');
        }
        if (props.rowIndex() === 2 || props.rowIndex() === 5) {
            c = c.concat(' border-bottom-thick');
        }

        setClassname(c);
    })
    return (
        <div class={classname()} onClick={() => props.setSelectedCell({ rowIndex: props.rowIndex(), colIndex: props.colIndex() })}>
            {props.cell === 0 ? '' : props.cell}
        </div>
    )
}

const SudokuBoard = () => {
    const [selectedCell, setSelectedCell] = createSignal({ rowIndex: -1, colIndex: -1 })
    const [board, setBoard] = createSignal([
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    createEffect(() => {
        window.addEventListener('keyup', (event) => {
            const colIndex = selectedCell().colIndex;
            const rowIndex = selectedCell().rowIndex;

            if (event.key === 'ArrowRight') {
                if (colIndex > 8) {
                    setSelectedCell({ rowIndex, colIndex: 0 });
                } else {
                    setSelectedCell({ rowIndex, colIndex: colIndex + 1 });
                }
            }

            if (event.key === 'ArrowLeft') {
                if (colIndex < 0) {
                    setSelectedCell({ rowIndex, colIndex: 8 });
                } else {
                    setSelectedCell({ rowIndex, colIndex: colIndex - 1 });
                }
            }

            if (event.key === 'ArrowDown') {
                if (rowIndex > 8) {
                    setSelectedCell({ rowIndex: 0, colIndex });
                } else {
                    setSelectedCell({ rowIndex: rowIndex + 1, colIndex });
                }
            }

            if (event.key === 'ArrowUp') {
                if (rowIndex < 0) {
                    setSelectedCell({ rowIndex: 8, colIndex });
                } else {
                    setSelectedCell({ rowIndex: rowIndex - 1, colIndex });
                }
            }

            if (selectedCell().colIndex !== -1 && selectedCell().rowIndex !== -1) {
                const newBoard = [...board()]
                    .map((row, rowIndex) =>
                        row.map((col, colIndex) => {
                            console.log(event.key);
                            const isNum = Number(event.key);
                            const isBackspace = event.key === 'Backspace';
                            const isMatching = selectedCell().rowIndex === rowIndex && selectedCell().colIndex === colIndex;

                            if (isMatching) {
                                if (isBackspace) return 0;
                                if (!Number.isNaN(isNum)) return isNum;
                            }

                            return col;
                        }))
                setBoard(newBoard);
            }
        });
    });


    return (
        <Main>
            <div class="sudoku-board container">
                <For each={board()}>{(row, rowIndex) => (
                    <div class="sudoku-row">
                        <For each={row}>{(cell, colIndex) => (
                            <SudokuCell
                                selectedCell={selectedCell}
                                setSelectedCell={setSelectedCell}
                                cell={cell}
                                colIndex={colIndex}
                                row={rowIndex}
                                rowIndex={rowIndex} />
                        )}
                        </For>
                    </div>
                )}
                </For>
            </div>
        </Main>

    );
};

export default SudokuBoard;
