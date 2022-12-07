type ChallengeInput = string[];

const part1 = (input: ChallengeInput) => {
  return reducerFunction(input, (min1, min2, max1, max2) => {
    return (min1 <= min2 && max1 >= max2) || (min1 >= min2 && max1 <= max2);
  });
};

const part2 = (input: ChallengeInput) => {
  return reducerFunction(input, (min1, min2, max1, max2) => {
    return (max1 >= min2 && min2 >= min1) || (max2 >= min1 && min2 <= min1);
  });
};

const reducerFunction = (input, conditionFunction: (min1: number, min2: number, max1: number, max2: number) => boolean) => {
  return input.reduce((acc, current) => {
    const [range1, range2] = current.split(',');
    const [min1, max1] = range1.split('-').map((num) => parseInt(num));
    const [min2, max2] = range2.split('-').map((num) => parseInt(num));

    const condition = conditionFunction(min1, min2, max1, max2);
    if (condition) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

const parser = (input: string, newlineSplit: string): ChallengeInput => {
  return input.trimEnd().split(`${newlineSplit}`);
};

export default { part1, part2, parser };
