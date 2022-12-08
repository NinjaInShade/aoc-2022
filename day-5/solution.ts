import { newlineSplit } from '../parseFile';
type ChallengeInput = [string, string[]];

type Stack = {
  [key: string]: {
    stack: string[];
    push: (items: string[]) => void;
    pop: (amount: number) => string[];
  };
};

const part1 = (input: ChallengeInput) => {
  const [stacksUnparsed, instructions] = input;
  let stacks = createStacks(stacksUnparsed, false);
  stacks = runInstructions(instructions, stacks);

  // Return string of all the top items of each stack
  return Object.values(stacks).reduce((acc, curr) => (acc += curr.stack[curr.stack.length - 1]), '');
};

const part2 = (input: ChallengeInput) => {
  const [stacksUnparsed, instructions] = input;
  let stacks = createStacks(stacksUnparsed, true);
  stacks = runInstructions(instructions, stacks);

  // Return string of all the top items of each stack
  return Object.values(stacks).reduce((acc, curr) => (acc += curr.stack[curr.stack.length - 1]), '');
};

const createStack = (items: string[] = [], maintainOrder: boolean = false) => {
  const stack: string[] = items;

  const push = (items: string[]) => {
    stack.push(...items);
  };

  const pop = (amount: number): string[] => {
    if (amount > stack.length) {
      throw new Error(`You can't pop off ${amount} items, the stack is only ${stack.length} tall.`);
    }
    const poppedItems: string[] = [];
    for (let i = 0; i < amount; i++) {
      poppedItems.push(stack.pop() as string);
    }
    return maintainOrder ? poppedItems.reverse() : poppedItems;
  };

  return { stack, push, pop };
};

const createStacks = (stacksUnparsed: string, maintainOrders): Stack => {
  const stacks: Stack = {};
  const _stacksInput = stacksUnparsed.split(newlineSplit).map((stack) => stack);
  const stackNumbers = _stacksInput.pop();

  if (stackNumbers) {
    // loop through each stack input, push to object { stackNum: createStack([items]) }
    for (let i = 0; i < stackNumbers.length; i++) {
      const stackNum = parseInt(stackNumbers[i]);
      if (!Number.isNaN(stackNum)) {
        // Get all items inside the stack we're parsing, and create a stack out of them
        const stackItems = _stacksInput.reduce((acc, curr) => (curr[i] && !['[', ' ', '', ']'].includes(curr[i]) ? [...acc, curr[i]] : acc), [] as string[]).reverse();
        stacks[stackNum] = createStack(stackItems, maintainOrders);
      }
    }
  }
  return stacks;
};

const runInstructions = (instructions: string[], stacks: Stack): Stack => {
  // Parse instructions, move items to required stacks
  for (const instruction of instructions) {
    const [moveAmount, from, to] = instruction
      .split(' ')
      .filter((instr) => !['move', 'from', 'to', ' '].includes(instr))
      .map((instr) => parseInt(instr));

    const itemsToMove = stacks[from].pop(moveAmount);
    stacks[to].push(itemsToMove);
  }

  return stacks;
};

const parser = (input: string, newlineSplit: string): ChallengeInput => {
  const [stack, instructions] = input.trimEnd().split(`${newlineSplit}${newlineSplit}`);
  return [stack, instructions.split(newlineSplit)];
};

export default { part1, part2, parser };
