import parseFile from './parseFile';
import day1Solution from './day-1/solution';
import day2Solution from './day-2/solution';
import day3Solution from './day-3/solution';

const solutionImports = {
  1: day1Solution,
  2: day2Solution,
  3: day3Solution,
};

const main = async () => {
  for (const [day, solutionImport] of Object.entries(solutionImports)) {
    console.log(`Running day ${day} solutions...`);

    const input = await parseFile(parseInt(day), solutionImport.parser);
    console.log(`Part 1: ${solutionImport.part1(input)} \nPart 2: ${solutionImport.part2(input)}`);

    console.log('\n');
  }
};

main();
