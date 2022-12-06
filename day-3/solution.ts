import type { ParserFunction } from '../parseFile';

const part1 = (input: string[]) => {
  console.log(input);
  //
};

const part2 = (input: string[]) => {
  //
};

const parser: ParserFunction = (result, newlineSplit) => {
  return result
    .trimEnd()
    .split(`${newlineSplit}${newlineSplit}`)
    .map((groupedInput) => groupedInput.split(newlineSplit))[0];
};

export default { part1, part2, parser };
