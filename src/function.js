const TypeChecker = (width, height) => {
  const cellType = {
    size: "",
    type: ""
  };
  if (width >= 600) {
    cellType.size = "셀 가로 600이상";
    if (height > 400) {
      cellType.type = "C";
    } else if (height > 165) {
      cellType.type = "B";
    } else if (height > 65) {
      cellType.type = "A";
    } else {
      cellType.type = "noneType";
    }
  } else if (width >= 500) {
    cellType.size = "셀 가로 500이상 600미만";
    if (height > 340) {
      cellType.type = "C";
    } else if (height > 135) {
      cellType.type = "B";
    } else if (height > 65) {
      cellType.type = "A";
    } else {
      cellType.type = "noneType";
    }
  } else if (width >= 400) {
    cellType.size = "셀 가로 400이상 500미만";
    if (height > 300) {
      cellType.type = "C";
    } else if (height > 135) {
      cellType.type = "B";
    } else if (height > 65) {
      cellType.type = "A";
    } else {
      cellType.type = "noneType";
    }
  } else {
    cellType.size = "셀 가로 400 미만";
    if (height > 250) {
      cellType.type = "C";
    } else if (height > 80) {
      cellType.type = "B";
    } else if (height > 65) {
      cellType.type = "A";
    } else {
      cellType.type = "noneType";
    }
  }
  return cellType.size + " / " + cellType.type;
};

const CellPositioner = (
  row,
  column,
  gutter,
  connectKitList,
  elfeedbackBoard
) => {
  const {
    offsetWidth: feedbackWidth,
    offsetHeight: feedbackHeight
  } = elfeedbackBoard;

  if (connectKitList.length) {
    console.log("Success : There is cell");

    let cellWidth;
    let cellHeight;

    /* 
    1. 셀 생성규칙 알고리즘
    아래의 알고리즘을 통해 셀 테이블의 행,열과 개별 셀의 높이와 너비를 구한다.
    
    -셀 가로: [(피드백영역 가로)-{(n-1)*(거터)}]/n 
    -셀 세로: [(피드백영역 세로)-{(m-1)*(거터)}]/m
    */
    while (column * row < connectKitList.length) {
      column++;
      cellWidth = (feedbackWidth - (column - 1) * gutter) / column;
      cellHeight = (feedbackHeight - (row - 1) * gutter) / row;
      if (cellHeight / cellWidth < 1.5) {
        continue;
      } else {
        row++;
        column = 1;
      }
    }

    /*------------------cell style 할당------------------*/

    // gutter는 default이기 때문에 할당
    elfeedbackBoard.style.gridGap = `${gutter}px`;

    //하단에 빈 셀의 유무판단
    const isEmptyCell = feedbackHeight / cellHeight > 6;

    //빈셀이 있다면 1열로 변경
    if (isEmptyCell) {
      row = connectKitList.length;
      column = 1;
      cellWidth = elfeedbackBoard.firstChild.offsetWidth;
      cellHeight = elfeedbackBoard.firstChild.offsetHeight;
      elfeedbackBoard.style.gridTemplateRows = `repeat(${row},1fr)`;
    } else {
      elfeedbackBoard.style.gridTemplateRows = `repeat(${row},1fr)`;
      elfeedbackBoard.style.gridTemplateColumns = `repeat(${column},1fr)`;
    }

    return {
      isEmptyCell: isEmptyCell,
      row: row,
      column: column,
      cellWidth: cellWidth,
      cellHeight: cellHeight
    };
  } else {
    console.log("Error : There is no cell");
  }
};

module.exports = { TypeChecker, CellPositioner };
