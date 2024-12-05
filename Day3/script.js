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

  // console.log(inputData);

  let mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  let result = [...inputData.matchAll(mulRegex)];

  // first part

  const sum = (func) => {
    let multiNumbers = 0;
    func.map((el) => {
      let mul = el[1] * el[2];
      multiNumbers += mul;
    });
    console.log(multiNumbers);
  };
  sum(result);

  // second part

  const _do = inputData.split("do()");
  let doResult = [];

  for (let i = 0; i < _do.length; i++) {
    const _dont = _do[i].split("don't()");
    const before = _dont[0];
    doResult.push(before);
  }
  const doString = doResult.join("");

  let newResult = [...doString.matchAll(mulRegex)];
  sum(newResult);
});
