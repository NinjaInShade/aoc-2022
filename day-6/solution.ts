type ChallengeInput = string;

const part1 = (input: ChallengeInput) => {
  return findFirstDistinctSubstring(input, 4);
};

const part2 = (input: ChallengeInput) => {
  return findFirstDistinctSubstring(input, 14);
};

const findFirstDistinctSubstring = (input: ChallengeInput, number: number): number => {
  for (let i = number - 1; i < input.length; i++) {
    let charsBeforeSet: string[] = [];
    for (let j = 0; j < number; j++) {
      charsBeforeSet.push(input[i - j]);
    }
    const lastCharacters = new Set(charsBeforeSet);
    if (lastCharacters.size === number) {
      return i + 1;
    }
  }

  return 0;
};

const parser = (input: string, newlineSplit: string): ChallengeInput => {
  return input.trimEnd();
};

export default { part1, part2, parser };
