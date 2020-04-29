import React, { useState } from "react";
import "./style.css";

function Game() {
  const [grid, setGrid] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]);

  const move = (y1, x1, y2, x2) => {
    const newGrid = grid.map((row) => [...row]);
    newGrid[y2][x2] = grid[y1][x1];
    newGrid[y1][x1] = 16;
    setGrid(newGrid);
  };

  const handleClick = (y, x) => {
    if (y > 0 && grid[y - 1][x] === 16) {
      move(y, x, y - 1, x);
    } else if (y < 3 && grid[y + 1][x] === 16) {
      move(y, x, y + 1, x);
    } else if (x > 0 && grid[y][x - 1] === 16) {
      move(y, x, y, x - 1);
    } else if (x < 3 && grid[y][x + 1] === 16) {
      move(y, x, y, x + 1);
    }
  };

  return (
    <div className="container">
      {grid.map((row, y) =>
        row.map((col, x) => (
          <button
            className="box"
            key={col}
            onClick={() => handleClick(y, x)}
            onKeyDown={() => {}}
            type="button"
            style={{
              opacity: col === 16 ? "0" : "1",
            }}
          >
            {col}
          </button>
        ))
      )}
    </div>
  );
}

export default Game;
