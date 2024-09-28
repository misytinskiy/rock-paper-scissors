import HMACGenerator from "./HMACGenerator.js";
import GameLogic from "./GameLogic.js";
import HelpTable from "./HelpTable.js";
import readline from "readline";
import chalk from "chalk";

// Получаем аргументы командной строки
const moves = process.argv.slice(2);

// Проверка на корректность аргументов (нечетное количество уникальных ходов >= 3)
if (moves.length < 3 || moves.length % 2 === 0) {
  console.log(
    chalk.red(
      "Error: Please provide an odd number of unique moves (at least 3). Example: node game.js rock paper scissors"
    )
  );
  process.exit(1);
}

const uniqueMoves = new Set(moves);
if (uniqueMoves.size !== moves.length) {
  console.log(chalk.red("Error: Moves must be unique."));
  process.exit(1);
}

// Генерация ключа и выбор хода компьютера
const key = HMACGenerator.generateKey();
const computerMoveIndex = Math.floor(Math.random() * moves.length);
const computerMove = moves[computerMoveIndex];

// Генерация HMAC для хода компьютера
const hmac = HMACGenerator.createHMAC(key, computerMove);
console.log(chalk.blue("HMAC:"), hmac);

// Отображение доступных ходов
console.log(chalk.yellow("Available moves:"));
moves.forEach((move, index) => {
  console.log(`${index + 1} - ${move}`);
});
console.log(chalk.yellow("0 - exit"));
console.log(chalk.yellow("? - help"));

// Создание интерфейса для чтения ввода пользователя
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Функция для запроса хода пользователя
const askForMove = () => {
  rl.question(chalk.green("Enter your move: "), (userInput) => {
    if (userInput === "0") {
      console.log(chalk.cyan("Exiting game."));
      rl.close();
      return;
    } else if (userInput === "?") {
      const helpTable = new HelpTable(moves);
      helpTable.generateHelpTable();
      rl.close();
      return;
    }

    const userMoveIndex = parseInt(userInput) - 1;

    // Проверка на корректный ввод
    if (
      isNaN(userMoveIndex) ||
      userMoveIndex < 0 ||
      userMoveIndex >= moves.length
    ) {
      console.log(chalk.red("Invalid move. Try again."));
      askForMove(); // Повторный запрос хода
    } else {
      const gameLogic = new GameLogic(moves);
      const result = gameLogic.determineWinner(
        userMoveIndex,
        computerMoveIndex
      );

      console.log(chalk.green(`Your move: ${moves[userMoveIndex]}`));
      console.log(chalk.green(`Computer move: ${computerMove}`));

      // Цветной вывод для результата
      if (result === "Draw") {
        console.log(chalk.yellow(result));
      } else if (result === "You win!") {
        console.log(chalk.green(result));
      } else {
        console.log(chalk.red(result));
      }

      console.log(chalk.blue("HMAC key:"), key);
      rl.close();
    }
  });
};

// Запуск функции запроса хода
askForMove();
