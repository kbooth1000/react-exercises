const h = React.createElement;

let checkNeighbors = function (props) {
    let neighborsAlive = 0;
    let gridArray = props.gridArray;
    let gridYLength = gridArray.length - 1,
        gridXLength = gridArray[0].length - 1;
    let x = props.x,
        y = props.y;
    let isValid = function (newx, newy) {
        if (newx >= 0 && newx <= gridXLength &&
            newy >= 0 && newy <= gridYLength) {
            return true;
        } else return false;
    }
    if (isValid(x - 1, y) && gridArray[y][x - 1] === 'a') {
        neighborsAlive++;
    }
    if (isValid(x + 1, y) && gridArray[y][x + 1] === 'a') {
        neighborsAlive++;
    }
    if (isValid(x, y - 1) && gridArray[y - 1][x] === 'a') {
        neighborsAlive++;
    }
    if (isValid(x, y + 1) && gridArray[y + 1][x] === 'a') {
        neighborsAlive++;
    }
    if (isValid(x - 1, y - 1) && gridArray[y - 1][x - 1] === 'a') {
        neighborsAlive++;
    }
    if (isValid(x + 1, y + 1) && gridArray[y + 1][x + 1] === 'a') {
        neighborsAlive++;
    }
    if (isValid(x - 1, y + 1) && gridArray[y + 1][x - 1] === 'a') {
        neighborsAlive++;
    }
    if (isValid(x + 1, y - 1) && gridArray[y - 1][x + 1] === 'a') {
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
        updatedGrid[y] = [];
        for (let x = 0; x < props[0].length; x++) {
            updatedGrid[y][x] = aliveNextRound({
                gridArray: props,
                alive: props[y][x],
                x: x,
                y: y
            });
        }
    }
    console.log('' + updatedGrid);
    return updatedGrid;
}

//  GRID CLASS
class Grid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: props.theGrid
        };
    }

    render() {

        let Cell = cellProps =>
            h('div', {
                className: cellProps.className,
                style: {
                    flex: '0 0 ' + 100 / this.state.grid[0].length + '%',
                    height: 100 / this.state.grid.length + '%'
                },
                onClick: () =>
                    this.setState({
                        grid: getUpdatedGrid(this.state.grid)
                    })
            });

        let cells = [];
        for (let i = 0; i < this.state.grid.length; i++) {
            for (let j = 0; j < this.state.grid.length; j++) {
                let statusClass = this.state.grid[i][j]; // 'a' or 'd'
                cells.push(h(Cell, {
                    className: 'cell ' + statusClass
                }))
            }
        }

        return ( <div className = {
                'grid'
            }
            style = {
                {
                    padding: '10px'
                }
            } >
            <p> This is the Game of Life! </p> 
            </div>, 
            cells
        )
    }
}

ReactDOM.render(
    h(Grid, {
        theGrid: [
            ['d', 'd', 'd', 'd'],
            ['a', 'a', 'a', 'd'],
            ['a', 'd', 'a', 'd'],
            ['d', 'd', 'd', 'd']
        ]
    }), document.querySelector('.container')
);