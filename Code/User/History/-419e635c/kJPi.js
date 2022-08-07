import { Player } from "./player.js";

const _defaultSetup = (p1, cpu) => {
  p1.board.placeShip("carrier", "horizontal", 0); //       [0, 1, 2, 3, 4]
  p1.board.placeShip("battleship", "vertical", 14); //     [14, 24, 34, 44]
  p1.board.placeShip("cruiser", "horizontal", 45); //      [45, 46, 47]
  p1.board.placeShip("submarine", "vertical", 9); //       [9, 19, 29]
  p1.board.placeShip("destroyer", "horizontal", 90); //    [90, 91, 92]

  cpu.board.placeShip("carrier", "vertical", 0); //        [0, 10, 20, 30, 40]
  cpu.board.placeShip("battleship", "vertical", 8); //     [8, 18, 28, 38]
  cpu.board.placeShip("cruiser", "horizontal", 45); //     [45, 46, 47]
  cpu.board.placeShip("submarine", "vertical", 9); //      [9, 19, 29]
  cpu.board.placeShip("destroyer", "horizontal", 90); //   [90, 91]
};

const game = () => {
  // helpers

  const checkWin = () => {
    if (playerOne.board.allSunken() || cpu.board.allSunken()) gameIsOver = true;
  };

  const playerMakeMove = () => {
    let choice = parseInt(prompt("What space?"));
    if (!cpu.board.totalHits.includes(choice) && choice >= 0 && choice < 100) {
      console.log(choice);
      playerOne.attack(cpu, choice);
      console.log(cpu.board.ships)
    } else {
      alert("invalid choice; try again");
      playerMakeMove();
    }
  };

  const cpuMakeMove = () => {
    let choice = Math.floor(Math.random() * 100);
    console.log(`cpu choice: ${choice}`);
  };

  // setup
  const playerOne = new Player("Player 1");
  const cpu = new Player("CPU");
  _defaultSetup(playerOne, cpu);
  let gameIsOver = false;
  let turn = playerOne.name;

  // loop
  for (let i = 0; i < 200; i++) {
    if (!gameIsOver) {
      if (turn === playerOne.name) {
        playerMakeMove();
        turn = cpu.name;
      } else if (turn === cpu.name) {
        cpuMakeMove();
        turn = playerOne.name;
      }
      checkWin();
    }
  }
};

export { game };

/*
Game loop: 
1 get player choice
  a. if player has not chosen this before (should be checked on gameboard?)
2 player attacks
3 checkWin()
3.5 update DOM
4 cpu attacks
  a. if cpu has not chosen.. etc.
5 checkWin()
5.5 update DOM
*/
