class MemoryGame {
    constructor(size, colors) {
        this.size = size;
        this.colors = [...colors, ...colors].sort(() => Math.random() - 0.5);
        this.selectedBoxes = [];
        this.createGrid();
    }

    createGrid() {
        const app = document.getElementById('app');
        const tiles = new Array(this.size).fill(null).map(() => new Array(this.size).fill(null));

        for (let row = 0; row < tiles.length; row++) {
            for (let col = 0; col < tiles[row].length; col++) {
                const color = this.colors.pop();
                const box = new Box(row, col, color);

                let boxElement = document.createElement('div');
                boxElement.id = `box-${row}-${col}`;
                boxElement.classList = "box";
                app.appendChild(boxElement);

                boxElement.addEventListener('click', () => {
                    this.handleBoxClick(boxElement, box);
                });

                boxElement.addEventListener('touchstart', (event) => {
                    event.preventDefault(); 
                    this.handleBoxClick(boxElement, box);
                });
            }
        }
    }

    handleBoxClick(boxElement, box) {
        if (this.selectedBoxes.length < 2 && !this.isBoxSelected(box)) {
            this.selectedBoxes.push({ element: boxElement, box: box });
            boxElement.style.backgroundColor = box.getColor();

            if (this.selectedBoxes.length === 2) {
                this.checkSelectedBoxes();
            }
        }
    }

    isBoxSelected(box) {
        return this.selectedBoxes.some(selected => selected.box === box);
    }

    checkSelectedBoxes() {
        if (this.selectedBoxes[0].box.getColor() === this.selectedBoxes[1].box.getColor()) {
            setTimeout(() => {
                this.selectedBoxes.forEach(selected => {
                    selected.element.style.opacity = 0;
                });
                this.selectedBoxes = [];
            }, 800);
        } else {
            setTimeout(() => {
                this.selectedBoxes.forEach(selected => {
                    selected.element.style.backgroundColor = "black";
                });
                this.selectedBoxes = [];
            }, 800);
        }
    }
}

class Box {
    constructor(row, col, color) {
        this.row = row;
        this.col = col;
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    getPos() {
        return [this.row, this.col];
    }
}

const size = 4;
const colors = ['darkgreen', 'darkmagenta', 'darkred', 'dodgerblue', 'lawngreen', 'orchid', 'sienna', 'saddlebrown'];
const game = new MemoryGame(size, colors);
