const start = document.getElementById('.start');
const stop = document.getElementById('.stop');

const canvas = document.getElementById("myCanvas");
const cc = canvas.getContext('2d');

let stopper = 0;

const resolution = 8;
canvas.width = 400;
canvas.height = 400;

const COLS = canvas.width/resolution;
const ROWS = canvas.height/resolution;

function update() 
{ 
  fillGrid();
  Rendering();
  requestAnimationFrame(update);
}

function fillGrid() 
{
  return new Array(COLS).fill(null)
    .map(() => new Array(ROWS).fill(null)
      .map(() => Math.floor(Math.random() * 2)));
}

let grid = fillGrid();

requestAnimationFrame(update);

function update() 
{
  grid = nextGen(grid);
  Rendering(grid);
  requestAnimationFrame(update);
}

function nextGen(grid) 
{
  const nextGen = grid.map(arr => [...arr]);

  for (let c = 0; c < grid.length; c++) 
  {
    for (let r = 0; r < grid[c].length; r++) 
    {
      const cell = grid[c][r];
      let numNeighbours = 0;
      for (let i = -1; i < 2; i++) 
      {
        for (let j = -1; j < 2; j++) 
        {
          if (i === 0 && j === 0) 
          {
            continue;
          }
          const x_cell = c + i;
          const y_cell = r + j;

          if (x_cell >=0 && y_cell>=0 && x_cell<COLS && y_cell<ROWS)
          {
            const currentNeighbour = grid[c + i][r+ j];
            numNeighbours += currentNeighbour;
          }
        }
      }

      
      if (cell === 1 && numNeighbours < 2) 
      {
        nextGen[c][r] = 0;
      } else if (cell === 1 && numNeighbours > 3)
      {
        nextGen[c][r] = 0;
      } else if (cell === 0 && numNeighbours === 3)
      {
        nextGen[c][r] = 1;
      }
    }
  }
  return nextGen;
}

function Rendering(grid) 
{
  
  for (let col = 0; col < grid.length; col++) 
  {
    for (let row = 0; row < grid[col].length; row++) 
    {
      const cell = grid[col][row];

      cc.beginPath();
      cc.rect(col * resolution,row * resolution,resolution,resolution);
      cc.fillStyle = cell ? 'black' : 'red';
      cc.fill();
    }
  }
}

start.addEventListener('click'  , () => {
  stopper =0;
  requestAnimationForFrame(update);
})

stop.addEventListener( 'click' , () => {
  stopper = 1;
})