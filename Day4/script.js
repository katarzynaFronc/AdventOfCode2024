const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

document.getElementById("fileInput").addEventListener("change", async (e) => {
  // load data

  const file = e.target.files[0];
  const inputData = await readFile(file);

  const grid = inputData.split("\n").map((row) => row.replace("\r").split(""));

  console.log(grid);

  let xmasCount = 0;
  let word = "XMAS";

  function findXMAS() {
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    const rows = grid.length;
    const cols = grid[0].length;

    function isWord(x, y, dx, dy) {
      for (let i = 0; i < word.length; i++) {
        let newX = x + i * dx;
        let newY = y + i * dy;

        if (newX < 0 || newY < 0 || newX >= rows || newY >= cols || grid[newX][newY] !== word[i]) {
          return false;
        }
      }
      return true;
    }

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (grid[x][y] === word[0]) {
          for (const [dx, dy] of directions) {
            if (isWord(x, y, dx, dy)) {
              xmasCount++;
            }
          }
        }
      }
    }
  }
  console.log(findXMAS());
  console.log(xmasCount);
});
