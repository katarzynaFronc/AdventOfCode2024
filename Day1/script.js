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

  // breakdown of data into columns

  let firstColumn = [];
  let secondColumn = [];

  const numbers = inputData.split(/\s+/);

  numbers.map((element, index) => {
    if (index % 2 === 0) {
      firstColumn.push(element);
    } else {
      secondColumn.push(element);
    }
  });

  // first part

  const firstPart = () => {
    firstColumn.sort((a, b) => b - a);
    secondColumn.sort((a, b) => b - a);

    let totalDistance = 0;

    for (let i = 0; i < firstColumn.length; i++) {
      totalDistance += Math.abs(firstColumn[i] - secondColumn[i]);
    }

    console.log(totalDistance);
  };

  console.log(firstPart());

  // second part

  const secondPart = () => {
    let total = 0;
    firstColumn.forEach((el) => {
      const count = secondColumn.filter((el2) => el2 === el).length;
      total += count * el;
    });
    console.log(total);
  };

  console.log(secondPart());
});
