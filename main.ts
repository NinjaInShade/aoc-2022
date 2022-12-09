import parseFile from './parseFile';
import day1Solution from './day-1/solution';
import day2Solution from './day-2/solution';
import day3Solution from './day-3/solution';
import day4Solution from './day-4/solution';
import day5Solution from './day-5/solution';
import day6Solution from './day-6/solution';

const solutionImports = {
  1: day1Solution,
  2: day2Solution,
  3: day3Solution,
  4: day4Solution,
  5: day5Solution,
  6: day6Solution,
};

const ACCENT_CLR = '\x1b[33m';
const RESET_CLR = '\x1b[0m';

const STAR = `${ACCENT_CLR}★${RESET_CLR}`;

const main = async () => {
  for (const [day, solutionImport] of Object.entries(solutionImports)) {
    console.log(`Running day ${day} solutions...`);

    const input = await parseFile(parseInt(day), solutionImport.parser);
    console.log(`Part 1: ${solutionImport.part1(input)} ${STAR}\nPart 2: ${solutionImport.part2(input)} ${STAR}`);

    console.log('\n');
  }
};

main();
