let gridArray = [
    ['d', 'd', 'd'],
    ['a', 'a', 'a'],
    ['d', 'd', 'd']
];

let checkNeighbors = function (thisCell) {
    let neighborsAlive = 0;
    let gridLength = gridArray.length - 1;
    let x = thisCell.x, y = thisCell.y;
    // console.log(x,y);
    let isValid = function (newx, newy) {
        if (newx >= 0 && newx <= gridLength && 
            newy >= 0 && newy <= gridLength) {
            return true;
        } else return false;
    }
    if (isValid(x - 1, y) && gridArray[ y][ x - 1] === 'a') {
        neighborsAlive++;
    }
    if (isValid(x + 1, y) && gridArray[ y] [ x + 1]=== 'a') {
        neighborsAlive++;
    }
    if (isValid(x, y - 1) && gridArray[ y - 1] [ x]=== 'a') {
        neighborsAlive++;
    }
    if (isValid(x, y + 1) && gridArray[ y + 1][ x] === 'a') {
        neighborsAlive++;
    }
    if (isValid(x - 1, y - 1) && gridArray[ y - 1][ x - 1] === 'a') {
        neighborsAlive++;
    }
    if (isValid(x + 1, y + 1) && gridArray[ y + 1][ x + 1] === 'a') {
        neighborsAlive++;
    }
    if (isValid(x - 1, y + 1) && gridArray[ y + 1][ x - 1] === 'a') {
        neighborsAlive++;
    }
    if (isValid(x + 1, y - 1) && gridArray[ y - 1] [x + 1] === 'a') {
        neighborsAlive++;
    }
    return neighborsAlive;
}

let aliveNextRound = function (thisCell) {
    if (thisCell.alive === 'a') {
        if (checkNeighbors(thisCell) < 2 || checkNeighbors(thisCell) > 3) {
            thisCell.alive = 'd';
        }
    } else if (checkNeighbors(thisCell) === 3) {
        thisCell.alive = 'a';
    }
    return thisCell.alive;
}

let getUpdatedGrid = (props) => {
    console.log('###');
    let updatedGrid = [];
    for (let y = 0; y < props.length; y++) {
        updatedGrid[y]=[];
            for (let x = 0; x < props[0].length; x++) { 
                updatedGrid[y][x]= aliveNextRound({alive:props[y][x], x:x, y:y});
                console.log(updatedGrid[y][x]);
        }
    }
    gridArray = updatedGrid;
    // console.log('grid:'+ updatedGrid);
    return updatedGrid;
}
let body = document.querySelector('body');
body.addEventListener('click', (event) => 
    getUpdatedGrid(gridArray) );


// let Cell = props =>
//     h('div', {
//         className: isCellAlive(props)
//     });

// //  GRID CLASS
// class Grid extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             grid: gridArray
//         };
//     };
//     let _this = this.state;


//     let updatedGrid = getUpdatedGrid(_this.grid);
// };



// ReactDOM.render(
//     h(Grid), document.querySelector('.react-root')
// );