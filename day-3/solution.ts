type ChallengeInput = string[];

const itemPriorities = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const part1 = (input: ChallengeInput) => {
  let sum = 0;

  for (const bag of input) {
    const commonType = calculateItemType(bag);

    if (commonType) {
      sum += calculateSum(commonType);
    }
  }

  return sum;
};

const part2 = (input: ChallengeInput) => {
  let sum = 0;

  let groupBags: string[] = [];

  for (let i = 0; i < input.length + 1; i++) {
    const bag = input[i];

    // Every 3 bags is one group, need to do calculations on each group
    if (i !== 0 && i % 3 === 0) {
      const firstBagLetters = groupBags[0].split('');
      const secondBagLetters = groupBags[1].split('');
      const thirdBagLetters = groupBags[2].split('');

      for (const letter of firstBagLetters) {
        if (secondBagLetters.includes(letter) && thirdBagLetters.includes(letter)) {
          sum += calculateSum(letter);
          break;
        }
      }

      groupBags = [];
    }

    groupBags.push(bag);
  }

  return sum;
};

const calculateItemType = (bag: string): string | undefined => {
  const [compartmentOne, compartmentTwo] = [bag.slice(0, bag.length / 2), bag.slice(bag.length / 2)];
  for (let i = 0; i < compartmentOne.length; i++) {
    if (compartmentTwo.split('').includes(compartmentOne[i])) {
      return compartmentOne[i];
    }
  }
};

const calculateSum = (commonType: string): number => {
  const priorityIndex = itemPriorities.findIndex((priority) => priority == commonType?.toLowerCase());
  if (commonType === commonType?.toLowerCase()) {
    return priorityIndex + 1;
  } else {
    return priorityIndex + 27;
  }
};

const parser = (input: string, newlineSplit: string): ChallengeInput => {
  return input
    .trimEnd()
    .split(`${newlineSplit}${newlineSplit}`)
    .map((groupedInput) => groupedInput.split(newlineSplit))[0];
};

export default { part1, part2, parser };
