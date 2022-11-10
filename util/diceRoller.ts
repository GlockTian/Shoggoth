enum Result {
  Success,
  Failure,
  CriticalSuccess,
  CriticalFailure,
}

function rollDice(size: number): number {
  return Math.floor(Math.random() * size) + 1;
}

function checkPoint(point: number): boolean {
  return rollDice(100) <= point;
}

function checkPointResult(point: number): { res: Result; dice: number } {
  const dice = rollDice(100);
  if (dice <= point) {
    if (dice === 1) {
      return { res: Result.CriticalSuccess, dice };
    } else {
      return { res: Result.Success, dice };
    }
  } else {
    if (dice === 100) {
      return { res: Result.CriticalFailure, dice };
    } else {
      return { res: Result.Failure, dice };
    }
  }
}

export { Result, rollDice, checkPoint, checkPointResult };