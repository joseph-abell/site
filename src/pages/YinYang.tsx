import { Component, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import Main from '../components/Main';

const YinYangPuzzle: Component = () => {
  const [store, setStore] = createStore<{ grid: string[][] }>({
    grid: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => ('white'))
        )
  });

  const toggleCell = (x: number, y: number) => {
    setStore('grid', (prevGrid) => {
      const newGrid = prevGrid.map((row, rowIndex) =>
        row.map((cell, cellIndex) =>
          rowIndex === y && cellIndex === x
            ? cell === 'blue' ? 'orange' : 'blue'
            : cell
        )
      );
      return newGrid;
    });
  };

  return (
    <Main>
      <div class='container'>
      <h1>Yin Yang</h1>
      <h2>Rules:</h2>
      <ul>
        <li>Fill each empty cell with either a black circle or a white circle.</li>
        <li>All white circles should be orthogonally connected, so do all black circles.</li>
        <li>There may not be any 2x2 cell region consisting of the same circle color.</li>
      </ul>
    <div class='yin-yang'>
            <For each={store.grid}>
                {(row, y) => (
                    <div class="row">
                    <For each={row}>
                        {(cell, x) => (
                        <div
                            class={`cell ${cell}`}
                            onClick={() => toggleCell(x(), y())}
                        >
                        </div>
                        )}
                    </For>
                    </div>
                )}
            </For>
        </div>
      </div>
    </Main>
  );
};

export default YinYangPuzzle;
