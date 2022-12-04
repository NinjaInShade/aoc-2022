import fs from 'fs/promises';
import path from 'path';

export type ChallengeInput = Array<Array<string>>;

const parseFile = async (day: number): Promise<ChallengeInput> => {
  if (!day) {
    throw new Error('You must enter a day!');
  } else if (day < 1 || day > 31) {
    throw new Error(`There are not ${day} days in December!`);
  }

  try {
    // Linux new line is just \n, Windows it's \n\r and MacOS is \r
    const OS = process.platform;
    const splitScheme: Record<string, string> = {
      linux: '\n',
      darwin: '\r',
      win32: '\r\n',
    };
    const splitOn = splitScheme[OS];

    const result = await fs.readFile(path.join(process.cwd(), `day-${day}`, 'input.txt'), { encoding: 'utf-8' });
    return result
      .trimEnd()
      .split(`${splitOn}${splitOn}`)
      .map((groupedInput) => groupedInput.split(splitOn));
  } catch (err) {
    throw new Error(`Something went wrong reading the file! Error: \n${err}`);
  }
};

export default parseFile;
