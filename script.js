// DOM Elements
const allCells = document.querySelectorAll(".cell:not(.row-top)");
const topCells = document.querySelectorAll(".cell.row-top");
const resetButton = document.querySelector(".reset");
const statusSpan = document.querySelector(".status");

// Columns
const column0 = [
  allCells[35],
  allCells[28],
  allCells[21],
  allCells[14],
  allCells[7],
  allCells[0],
  topCells[0],
];
const column1 = [
  allCells[36],
  allCells[29],
  allCells[22],
  allCells[15],
  allCells[8],
  allCells[1],
  topCells[1],
];
const column2 = [
  allCells[37],
  allCells[30],
  allCells[23],
  allCells[16],
  allCells[9],
  allCells[2],
  topCells[2],
];
const column3 = [
  allCells[38],
  allCells[31],
  allCells[24],
  allCells[17],
  allCells[10],
  allCells[3],
  topCells[3],
];
const column4 = [
  allCells[39],
  allCells[32],
  allCells[25],
  allCells[18],
  allCells[11],
  allCells[4],
  topCells[4],
];
const column5 = [
  allCells[40],
  allCells[33],
  allCells[26],
  allCells[19],
  allCells[12],
  allCells[5],
  topCells[5],
];
const column6 = [
  allCells[41],
  allCells[34],
  allCells[27],
  allCells[20],
  allCells[13],
  allCells[6],
  topCells[6],
];
const columns = [column0, column1, column2, column3, column4, column5, column6];

// Rows
const topRow = [
  topCells[0],
  topCells[1],
  topCells[2],
  topCells[3],
  topCells[4],
  topCells[5],
  topCells[6],
];
const row0 = [
  allCells[0],
  allCells[1],
  allCells[2],
  allCells[3],
  allCells[4],
  allCells[5],
  allCells[6],
];
const row1 = [
  allCells[7],
  allCells[8],
  allCells[9],
  allCells[10],
  allCells[11],
  allCells[12],
  allCells[13],
];
const row2 = [
  allCells[14],
  allCells[15],
  allCells[16],
  allCells[17],
  allCells[18],
  allCells[19],
  allCells[20],
];
const row3 = [
  allCells[21],
  allCells[22],
  allCells[23],
  allCells[24],
  allCells[25],
  allCells[26],
  allCells[27],
];
const row4 = [
  allCells[28],
  allCells[29],
  allCells[30],
  allCells[31],
  allCells[32],
  allCells[33],
  allCells[34],
];
const row5 = [
  allCells[35],
  allCells[36],
  allCells[37],
  allCells[38],
  allCells[39],
  allCells[40],
  allCells[41],
];
const rows = [row0, row1, row2, row3, row4, row5, topRow];

//Global Variables
let gameOn = true;
let yellowTurn = true; //If it is true then it is yellows turn otherwise it is red

//Functions
//Turns the DOM token into an array
const getClassListArray = (cell) => {
  const classList = cell.classList;
  return [...classList];
};

//Gets the row and column of a cell
const getCellLocation = (cell) => {
  //gets the classList array
  const classList = getClassListArray(cell);

  //Get only row values for rows and column values for col
  const rowClass = classList.find((className) => className.includes("row"));
  const colClass = classList.find((className) => className.includes("col"));

  //gets the number from the rowClass which is in the 4th index of the string
  const rowIndex = rowClass[4];
  const colIndex = colClass[4];

  //Turns the index from string to an integer
  const rowNum = parseInt(rowIndex, 10);
  const colNum = parseInt(colIndex, 10);

  return [rowNum, colNum];
};

//To see if we can put the chip on the first row of that column
const getOpenCellForCol = (colIndex) => {
  const cols = columns[colIndex];
  const colWithoutTop = cols.slice(0, 6);

  for (const cell of colWithoutTop) {
    const classList = getClassListArray(cell);
    if (!classList.includes("yellow") && !classList.includes("red")) {
      return cell;
    }
  }

  return null;
};

//Clears the colors from the hover chip so it can alternate colors every turn
const clearColorFromTop = (colIndex) => {
  const topCell = topCells[colIndex];
  topCell.classList.remove("yellow");
  topCell.classList.remove("red");
};

//Gets the color of the cell were checking
const getColorOfCell = (cell) => {
  const classList = getClassListArray(cell);
  if (classList.includes("yellow")) return "yellow";
  if (classList.includes("red")) return "red";
  return null;
};

//Highlights the winning chips
const checkWinningCells = (cells) => {
  if (cells.length < 4) return false;

  gameOn = false;
  for (const cell of cells) {
    cell.classList.add("win");
  }
  statusSpan.textContent = `${yellowTurn ? "Yellow" : "Red"} has won the game!`;

  return true;
};

//Checks if someone won or not
const checkStatusOfGame = (cell) => {
  const color = getColorOfCell(cell);
  if (!color) return;
  const [rowIndex, colIndex] = getCellLocation(cell);

  //Horizontal
  let winningCells = [cell];
  let rowCheck = rowIndex;
  let colCheck = colIndex - 1;

  //left side
  while (colCheck >= 0) {
    const cellCheck = rows[rowCheck][colCheck];
    if (getColorOfCell(cellCheck) === color) {
      winningCells.push(cellCheck);
      colCheck--;
    } else {
      break;
    }
  }

  //right side
  colCheck = colIndex + 1;
  while (colCheck <= 6) {
    const cellCheck = rows[rowCheck][colCheck];
    if (getColorOfCell(cellCheck) === color) {
      winningCells.push(cellCheck);
      colCheck++;
    } else {
      break;
    }
  }

  let isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return;

  //Vertical
  winningCells = [cell];
  rowCheck = rowIndex - 1;
  colCheck = colIndex;

  //bottom
  while (rowCheck >= 0) {
    const cellCheck = rows[rowCheck][colCheck];
    if (getColorOfCell(cellCheck) === color) {
      winningCells.push(cellCheck);
      rowCheck--;
    } else {
      break;
    }
  }

  //top
  rowCheck = rowIndex + 1;
  while (rowCheck <= 5) {
    const cellCheck = rows[rowCheck][colCheck];
    if (getColorOfCell(cellCheck) === color) {
      winningCells.push(cellCheck);
      rowCheck++;
    } else {
      break;
    }
  }

  isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return;

  //Diagonal "/"
  winningCells = [cell];
  rowCheck = rowIndex + 1;
  colCheck = colIndex - 1;
  while (colCheck >= 0 && rowCheck <= 5) {
    const cellCheck = rows[rowCheck][colCheck];
    if (getColorOfCell(cellCheck) === color) {
      winningCells.push(cellCheck);
      rowCheck++;
      colCheck--;
    } else {
      break;
    }
  }
  rowCheck = rowIndex - 1;
  colCheck = colIndex + 1;
  while (colCheck <= 6 && rowCheck >= 0) {
    const cellCheck = rows[rowCheck][colCheck];
    if (getColorOfCell(cellCheck) === color) {
      winningCells.push(cellCheck);
      rowCheck--;
      colCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return;

  //Diagonal "\"
  winningCells = [cell];
  rowCheck = rowIndex - 1;
  colCheck = colIndex - 1;
  while (colCheck >= 0 && rowCheck >= 0) {
    const cellCheck = rows[rowCheck][colCheck];
    if (getColorOfCell(cellCheck) === color) {
      winningCells.push(cellCheck);
      rowCheck--;
      colCheck--;
    } else {
      break;
    }
  }
  rowCheck = rowIndex + 1;
  colCheck = colIndex + 1;
  while (colCheck <= 6 && rowCheck <= 5) {
    const cellCheck = rows[rowCheck][colCheck];
    if (getColorOfCell(cellCheck) === color) {
      winningCells.push(cellCheck);
      rowCheck++;
      colCheck++;
    } else {
      break;
    }
  }
  isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return;

  //Check to see if we have a tie
  const rowsWithoutTop = rows.slice(0, 6);
  for (const row of rowsWithoutTop) {
    for (const cell of row) {
      const classList = getClassListArray(cell);

      if (!classList.includes("yellow") && !classList.includes("red")) {
        return;
      }
    }
  }

  gameOn = false;
  statusSpan.textContent = "It is a TIE!!!!";
};

//Event Handlers
//When you hover over a cell of that column, the chip will be shown of where it is going
const handleCellMouseOver = (e) => {
  if (!gameOn) return;

  const cell = e.target;
  const [rowIndex, colIndex] = getCellLocation(cell);

  const topCell = topCells[colIndex];
  topCell.classList.add(yellowTurn ? "yellow" : "red");
};

//When you not hover over a cell, the chip will dissapear.
const handleCellMouseOut = (e) => {
  const cell = e.target;
  const [rowIndex, colIndex] = getCellLocation(cell);
  clearColorFromTop(colIndex);
};

//Handles the logic of when you click on the cell
const handleCellClick = (e) => {
  if (!gameOn) return;

  const cell = e.target;
  const [rowIndex, colIndex] = getCellLocation(cell);
  const openCell = getOpenCellForCol(colIndex);

  //Do nothing when there is not an open cell
  if (!openCell) return;

  openCell.classList.add(yellowTurn ? "yellow" : "red");
  checkStatusOfGame(openCell);

  //After clicking on a cell it is "next" turn
  yellowTurn = !yellowTurn;
  clearColorFromTop(colIndex);
  if (gameOn) {
    const topCell = topCells[colIndex];
    topCell.classList.add(yellowTurn ? "yellow" : "red");
  }
};

//Event Listeners
for (const row of rows) {
  for (const cell of row) {
    cell.addEventListener("mouseover", handleCellMouseOver);
    cell.addEventListener("mouseout", handleCellMouseOut);
    cell.addEventListener("click", handleCellClick);
  }
}

//Resets everything
resetButton.addEventListener("click", () => {
  for (const row of rows) {
    for (const cell of row) {
      cell.classList.remove("yellow");
      cell.classList.remove("red");
      cell.classList.remove("win");
    }
  }

  gameOn = true;
  yellowTurn = true;
  statusSpan.textContent = "";
});
