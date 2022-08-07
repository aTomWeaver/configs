import { gameboardFactory } from "../gameboardFactory.js";

test("generates a blank gameboard", () => {
  const newBoard = gameboardFactory();
  let testArr = [];
  for (let i = 0; i < 100; i++) testArr.push({ ship: null, isHit: false });
  expect(newBoard.spaces).toStrictEqual(testArr);
});

test("gameboard can place a ship", () => {
  const firstPlayer = gameboardFactory();
  firstPlayer.placeShip("cruiser", "vertical", 24);
  expect(firstPlayer.spaces[24].ship).toBe("cruiser");
  expect(firstPlayer.spaces[34].ship).toBe("cruiser");
  expect(firstPlayer.spaces[44].ship).toBe("cruiser");
  firstPlayer.placeShip("destroyer", "horizontal", 7);
  expect(firstPlayer.spaces[7].ship).toBe("destroyer");
  expect(firstPlayer.spaces[8].ship).toBe("destroyer");
});

test("spaces can receive a hit once and pass it to the ship", () => {
  const playerOne = gameboardFactory();
  playerOne.placeShip("destroyer", "horizontal", 1);
  playerOne.receiveHit(1);
  playerOne.receiveHit(1);
  // a hit in the same location is not passed to ship hit() function
  expect(playerOne.spaces[1].ship).toBe("destroyer");
  expect(playerOne.ships["destroyer"].isSunk()).not.toBe(true);
  playerOne.receiveHit(2);
  expect(playerOne.spaces[1].isHit).toBe(true);
  expect(playerOne.ships["destroyer"].isSunk()).toBe(true);
});

test("cannot place ship with inadequate space", () => {
  const newPlayer = gameboardFactory();
  // cannot place a ship that overhangs a row
  newPlayer.placeShip("carrier", "horizontal", 7);
  expect(newPlayer.spaces[7].ship).not.toBe("carrier");
  // cannot place a ship that overhangs a column
  newPlayer.placeShip("cruiser", "l", 89);
  expect(newPlayer.spaces[99].ship).not.toBe("cruiser");
});

test("cannot place a ship on top of an existing ship", () => {
  const newPlayer = gameboardFactory();
  newPlayer.placeShip("carrier", "horizontal", 94);
  newPlayer.placeShip("destroyer", "horizontal", 93);
  expect(newPlayer.spaces[94].ship).toBe("carrier");
  newPlayer.placeShip("destroyer", "horizontal", 92);
  expect(newPlayer.spaces[93].ship).toBe("destroyer");
});

test("reports whether or not all ships have sunk", () => {
  const newPlayer = gameboardFactory();
  newPlayer.placeShip("destroyer", "horizontal", 94);
  newPlayer.placeShip("submarine", "l", 71);
  newPlayer.receiveHit(94);
  newPlayer.receiveHit(95);
  console.log(newPlayer.spaces);
  expect(newPlayer.sunkenShips).toEqual(expect.arrayContaining(["destroyer"]));
  newPlayer.receiveHit(71);
  newPlayer.receiveHit(81);
  newPlayer.receiveHit(91);
  expect(newPlayer.sunkenShips).toEqual(
    expect.arrayContaining(["destroyer", "submarine"])
  );
});
