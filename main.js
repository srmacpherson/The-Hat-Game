const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field) {
        this._field = field;
    }

    // Static method to generate a new field with given height, width, and number of holes
    static generateField(height, width, holeCount) {
        let newField = [];
        for (let i = 0; i < height; i++) {
            newField.push([]);
        for (let j = 0; j < width; j++) {
            newField[i].push(fieldCharacter);
            };
        };
        newField[0][0] = pathCharacter;
        let hatX = Math.floor(Math.random() * height);
        let hatY = Math.floor(Math.random() * width);
        newField[hatX][hatY] = hat;

        for (let k = holeCount; k > 0; k--) {
            let holeX = Math.floor(Math.random() * height);
            let holeY = Math.floor(Math.random() * width);
            if (newField[holeX][holeY] === fieldCharacter) {
                newField[holeX][holeY] = hole;
            } else {
                k++;
            }
        }
        return newField;  
    }

    // Method to print the field to the console
    print() {
    for (let row of this._field){
      console.log(row.join(' '));
    }
  }

    // Method to play the game and deal with user input + game logic
    playGame() {
        let x = 0;
        let y = 0;
        let gameOver = false;
        console.log("Welcome to the Hat Game!");
        console.log("You are on a quest to find your hat. Be careful not to fall!");
        console.log("You can move using 'W' for UP, 'A' for LEFT, 'S' for DOWN, and 'D' for RIGHT.");
        console.log("Let's begin!");
        
        this.print(this._field);

        while (!gameOver) {
            const direction = prompt(`Which way? Enter W/A/S/D...`).toLowerCase();
            switch (direction) {
                case 'w':
                    if (y > 0) {
                        y--;
                    } else {
                        console.log("You can't go up!");
                    }
                    break;
                case 'a':
                    if (x > 0) {
                        x--;
                    } else {
                        console.log("You can't go left!");
                    }
                    break;
                case 's':
                    if (y < this._field.length - 1) {
                        y++;
                    } else {
                        console.log("You can't go down!");
                    }
                    break;
                case 'd':
                    if (x < this._field[0].length - 1) {
                        x++;
                    } else {
                        console.log("You can't go right!");
                    }
                    break;
                default:
                    console.log("Invalid direction! Please enter 'W', 'A', 'S', or 'D'...");
            }
            if (this._field[y][x] === hole) {
                console.log("You fell into a hole! Game over.");
                gameOver = true;
            } else if (this._field[y][x] === hat) {
                console.log("Congratulations! You found your hat!");
                gameOver = true;
            } else {
                this._field[y][x] = pathCharacter;
                this.print(this._field);
            }
        }
    }

}

// Generate a new field with specified dimensions and number of holes
const newField = Field.generateField(20, 20, 80);

// Create a new Field instance with the generated field
myField = new Field(newField);

// Start the game
myField.playGame();