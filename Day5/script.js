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
  const parts = inputData.split("\n").map((row) => row.replace("\r", "").split(","));

  let rules = [];
  let updates = [];

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length === 1) {
      rules.push(parts[i]);
    } else {
      updates.push(parts[i]);
    }
  }

  let rulesArray = rules.flat();

  let joinedUpdates = [];
  let newUpdates = [];

  const correctlyUpdates = () => {
    let joined;

    updates.forEach((update) => {
      // join values of updates to rules format
      let joinedUpdate = [];
      for (let i = 1; i < update.length; i++) {
        joined = update[i - 1] + "|" + update[i];

        joinedUpdate.push(joined);
      }
      joinedUpdates.push(joinedUpdate);

      // search correct updates
      let newUpdate = [];

      for (let j = 0; j < joinedUpdate.length; j++) {
        for (let i = 0; i < rulesArray.length; i++) {
          if (rulesArray[i] === joinedUpdate[j]) {
            newUpdate.push(joinedUpdate[j]);
          }
        }
      }

      // flatten correct updates
      if (newUpdate.length === joinedUpdate.length) {
        const regex = /(\||\|)\d+/;
        let flatten = newUpdate.map((row) => row.replace(regex, ""));
        newUpdates.push(flatten);
      }
    });

    // search middle values and summing them
    let middleValues = [];

    const middleValue = () => {
      newUpdates.map((el) => {
        const lengthOfArray = el.length;
        if (lengthOfArray === 0) {
          return false;
        }
        const middleIndex = Math.floor(lengthOfArray / 2);
        middleValues.push(el[middleIndex]);
      });
      let sum = middleValues.reduce((acc, current) => parseInt(current) + acc, 0);
      console.log(sum);
    };

    console.log(middleValue());
  };
  correctlyUpdates();
});
