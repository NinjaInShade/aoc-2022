import type { ChallengeInput } from '../parseFile';

// Create another object mapping outcomes to points
const scoring: Record<string, number> = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
  Loss: 0,
  Draw: 3,
  Win: 6,
};

// Create object mapping choices (rock, paper or scissors) to character abbreviations
// Format: { Choice: [opponent char, player char] }
// Format 2: { Char: Choice } - easier to determine choice when reducing, more keys in object and harder to maintain
const choices: Record<string, string> = {
  A: 'Rock',
  X: 'Rock',
  B: 'Paper',
  Y: 'Paper',
  C: 'Scissors',
  Z: 'Scissors',
};

const requiredOutcomes: Record<string, string> = {
  X: 'Loss',
  Y: 'Draw',
  Z: 'Win',
};

// This challenge requires further array destructuring due to default parsing returning single array of relevant data
const part1 = ([input]: ChallengeInput) => {
  return input.reduce((totalScore, currentGame: string) => {
    const [opponentMove, _, playerMove] = currentGame.split('');
    const [opponentChoice, playerChoice] = calculateChoice(opponentMove, playerMove, choices);

    return totalScore + calculateScore(opponentChoice, playerChoice);
  }, 0);
};

const part2 = ([input]: ChallengeInput) => {
  return input.reduce((totalScore, currentGame: string) => {
    const [opponentMove, _, playerMove] = currentGame.split('');
    const [opponentChoice, playerChoice] = calculateChoice(opponentMove, playerMove, { ...choices, ...requiredOutcomes });

    return totalScore + calculateScore(opponentChoice, playerChoice);
  }, 0);
};

const calculateChoice = (opponentMove: string, playerMove: string, choiceScheme: Record<string, string>): [string, string] => {
  const opponentChoice = choiceScheme[opponentMove];
  let playerChoice = choiceScheme[playerMove];

  if (Object.values(choiceScheme).some((choice) => ['Win', 'Draw', 'Loss'].includes(choice))) {
    // Assume draw
    playerMove = choiceScheme[playerMove];

    if (playerMove === 'Draw') {
      return [opponentChoice, opponentChoice];
    }

    if (opponentChoice === 'Rock') {
      playerChoice = playerMove === 'Win' ? 'Paper' : 'Scissors';
    }
    if (opponentChoice === 'Paper') {
      playerChoice = playerMove === 'Win' ? 'Scissors' : 'Rock';
    }
    if (opponentChoice === 'Scissors') {
      playerChoice = playerMove === 'Win' ? 'Rock' : 'Paper';
    }
  }

  return [opponentChoice, playerChoice];
};

const calculateScore = (opponentChoice: string, playerChoice: string): number => {
  // Choice score
  let currentScore = scoring[playerChoice];

  // Outcome score
  if (opponentChoice === playerChoice) {
    currentScore += scoring.Draw;
  } else {
    currentScore += scoring[calculateWinner(opponentChoice, playerChoice)];
  }

  return currentScore;
};

// Draws are calculated before, so no same choices for opponent/player happen
const calculateWinner = (opponentChoice: string, playerChoice: string): 'Win' | 'Loss' => {
  if (opponentChoice === 'Rock') {
    return playerChoice === 'Paper' ? 'Win' : 'Loss';
  }
  if (opponentChoice === 'Paper') {
    return playerChoice === 'Scissors' ? 'Win' : 'Loss';
  }

  return playerChoice === 'Rock' ? 'Win' : 'Loss';
};

export default { part1, part2 };
