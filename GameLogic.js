class GameLogic {
  constructor(moves) {
    this.moves = moves;
  }

  // Определение победителя
  determineWinner(userMoveIndex, computerMoveIndex) {
    const half = Math.floor(this.moves.length / 2);

    // Если ходы совпали, ничья
    if (userMoveIndex === computerMoveIndex) {
      return "Draw";
    }

    // Проверка, выигрывает ли ход пользователя
    else if (
      (userMoveIndex > computerMoveIndex &&
        userMoveIndex - computerMoveIndex <= half) ||
      (userMoveIndex < computerMoveIndex &&
        computerMoveIndex - userMoveIndex > half)
    ) {
      return "You win!";
    }

    // Иначе победа компьютера
    else {
      return "Computer wins!";
    }
  }
}

export default GameLogic;
