type ChallengeInput = string[][];

const part1 = (input: ChallengeInput) => {
  let maxCalories = 0;

  for (const elfCalories of input) {
    const totalCalories = elfCalories.reduce((acc, curr) => acc + parseInt(curr), 0);
    if (totalCalories > maxCalories) {
      maxCalories = totalCalories;
    }
  }

  return maxCalories;
};

const part2 = (input: ChallengeInput) => {
  const maxCalories: number[] = [];

  for (const elfCalories of input) {
    const totalCalories = elfCalories.reduce((acc, curr) => acc + parseInt(curr), 0);
    const lowestValIndex = maxCalories.indexOf(maxCalories.sort((a, b) => a - b)[0]);

    if (maxCalories.length < 3) {
      maxCalories.push(totalCalories);
    } else if (totalCalories > maxCalories[lowestValIndex]) {
      maxCalories[lowestValIndex] = totalCalories;
    }
  }

  return maxCalories.reduce((acc, curr) => acc + curr, 0);
};

const parser = (input: string, newlineSplit: string): ChallengeInput => {
  return input
    .trimEnd()
    .split(`${newlineSplit}${newlineSplit}`)
    .map((groupedInput) => groupedInput.split(newlineSplit));
};

export default { part1, part2, parser };
