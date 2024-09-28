import chalk from "chalk";

class HelpTable {
  constructor(moves) {
    this.moves = moves;
  }

  // Генерация таблицы помощи
  generateHelpTable() {
    const half = Math.floor(this.moves.length / 2);
    const table = [];

    // Заголовок таблицы
    let header = chalk.bold.blue("| v PC/User > |");
    this.moves.forEach((move) => {
      header += chalk.bold.blue(` ${move} |`);
    });
    table.push(header);

    // Разделитель строк
    let rowDivider = chalk.bold.blue("+");
    this.moves.forEach(() => {
      rowDivider += chalk.bold.blue("-------+");
    });

    // Генерация строк таблицы
    for (let i = 0; i < this.moves.length; i++) {
      let row = chalk.bold.blue(`| ${this.moves[i]} |`);
      for (let j = 0; j < this.moves.length; j++) {
        if (i === j) {
          row += chalk.yellow(" Draw |");
        } else if ((j > i && j - i <= half) || (i > j && i - j > half)) {
          row += chalk.green(" Win  |");
        } else {
          row += chalk.red(" Lose |");
        }
      }
      table.push(row);
    }

    // Вывод таблицы
    console.log(chalk.bold("\nHelp Table:"));
    console.log(rowDivider);
    table.forEach((line) => {
      console.log(line);
      console.log(rowDivider);
    });
  }
}

export default HelpTable;
