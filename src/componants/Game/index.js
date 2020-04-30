import React, { useEffect, useState } from 'react';
import './style.css';

function Game() {
  const [grid, setGrid] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]);
  const [finish, setFinish] = useState(false);

  const suffle = () => {
    let first;
    let rand1;
    let rand2;
    let cols;
    let yy;
    let xx;
    let t;
    let i;
    const rows = [0, 1, 2, 3, 2, 1, 0];

    const newGrid = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    for (t = 0; t < 250; t += 1) {
      rand1 = Math.floor(Math.random() * 2);
      rand2 = Math.floor(Math.random() * 3);
      // eslint-disable-next-line no-loop-func
      cols = [0, 0, 0, 0, 1, 1, 1].map((n) => n + rand2);

      if (rand1 === 1) {
        xx = cols;
        yy = rows;
      } else {
        xx = rows;
        yy = cols;
      }

      first = newGrid[yy[0]][xx[0]];
      for (i = 0; i < 6; i += 1) {
        newGrid[yy[i]][xx[i]] = newGrid[yy[i + 1]][xx[i + 1]];
      }
      newGrid[yy[6]][xx[6]] = first;
    }
    setGrid(newGrid);
    setFinish(false);
  };

  useEffect(() => {
    suffle();
  }, []);

  const move = (y1, x1, y2, x2) => {
    const newGrid = grid.map((row) => [...row]);
    newGrid[y2][x2] = grid[y1][x1];
    newGrid[y1][x1] = 16;
    setGrid(newGrid);
    if (
      JSON.stringify(newGrid) ===
      '[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]'
    )
      setFinish(true);
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
    <div className="game">
      <div className="container">
        {grid.map((row, y) =>
          row.map((col, x) => (
            <button
              className="btn box"
              key={col}
              onClick={() => handleClick(y, x)}
              type="button"
              style={{
                opacity: col === 16 ? '0' : '1',
              }}
            >
              {col}
            </button>
          ))
        )}
      </div>
      <br />
      {finish && (
        <div className="message">
          <p>Congratulation , you won</p>
        </div>
      )}
      <button type="button" className="btn btnRestart" onClick={suffle}>
        restart
      </button>
    </div>
  );
}

export default Game;
