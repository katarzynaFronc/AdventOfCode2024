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
  const levels = inputData.split("\n").map((el) => el.split(" ").map(Number));
  console.log(levels);

  function isSafe(level) {
    const result = level.map((num, i) => i >= 0 && num - level[i + 1]).slice(0, -1);
    return result.every((num) => num >= 1 && num <= 3) || result.every((num) => num <= -1 && num >= -3);
  }

  const part1 = () => {
    console.log(levels.filter(isSafe).length);
  };

  console.log(part1());
});
