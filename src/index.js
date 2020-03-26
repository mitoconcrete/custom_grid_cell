const { TypeChecker, CellPositioner } = require("./function");
const elfeedbackBoard = document.querySelector("#feedback-board");

const defaultGutter = 8;
const initialRow = 1;
const initialColumn = 1;
const connectKitNumber = 10;

/* 
1. 셀 추가
연결된 키트 수 만큼 셀을 표시할 div tag를 생성한다. 
*/
let connectKitList = [];
for (let i = 0; i < connectKitNumber; i++) {
  connectKitList.push(i);
}

for (let i = 0; i < connectKitList.length; i++) {
  const elDiv = document.createElement("div");
  elDiv.className = "cell";
  elfeedbackBoard.appendChild(elDiv);
}

const cellPostionResult = CellPositioner(
  initialRow,
  initialColumn,
  defaultGutter,
  connectKitList,
  elfeedbackBoard
);

const { isEmptyCell, row, column, cellWidth, cellHeight } = cellPostionResult;

console.log("==========결정==========");
console.log("빈 row 생김 현상 : ", isEmptyCell);
console.log("행 :", row);
console.log("열 :", column);
console.log("단일 셀 가로 :", cellWidth + "px");
console.log("단일 셀 세로 :", cellHeight + "px");
console.log("셀 타입 :", TypeChecker(cellWidth, cellHeight));
console.log("========================");
//setInterval(() => {
//  window.location.reload();
//}, 2000);
