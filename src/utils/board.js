const SQUARES_ROW = 4;

export function compareCondition(index, direction) {
  if (direction > 0) {
    return index < SQUARES_ROW;
  } else {
    return index >= 0;
  }
}