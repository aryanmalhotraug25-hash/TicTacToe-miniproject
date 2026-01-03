let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');

const winPatterns =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let mode = null;
document.querySelector("#humanMode").addEventListener("click", () => {
    mode = "human";
    alert("Human vs Human mode selected");
    resetGame();
});
document.querySelector("#computerMode").addEventListener("click", () => {
    mode = "computer";
    alert("Human vs Computer mode selected");
    resetGame();
});


let turn0=true;
let winner=false;
let count=0;

function checkWinner(){
    for(let pattern of winPatterns){
        let pos1Val= boxes[pattern[0]].innerText     // most important lines
        let pos2Val= boxes[pattern[1]].innerText
        let pos3Val= boxes[pattern[2]].innerText

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner is " + pos1Val);
                alert("Winner is " + pos1Val);
                winner=true;
        for(let box of boxes){
            box.disabled=true;
            }
        }
    }
}}

function computerMove() {
    let emptyBoxes = [];
    boxes.forEach((box) => {
        if (box.innerText === "") {
            emptyBoxes.push(box);
        }
    });

    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.innerText = "X";
        randomBox.style.color = "teal";
        randomBox.disabled = true;
        turn0 = true;
        count++;
        checkWinner();
    }
}

boxes.forEach((box) => {
   box.addEventListener("click", () => {
    if (!mode) {
        alert("Select Human or Computer mode first!");
        return;
    }

    if (mode === "human") {
        if (turn0) {
            box.innerText = "O";
            box.style.color = "brown";
            turn0 = false;
        } else {
            box.innerText = "X";
            box.style.color = "teal";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    }

    if (mode === "computer" && turn0) {
        // Human O move
        box.innerText = "O";
        box.style.color = "brown";
        box.disabled = true;
        turn0 = false;
        count++;
        checkWinner();

        if (!winner && count < 9) {
            computerMove();
        }
    }

    if (!winner && count === 9) {
        alert("Game Drawn");
    }
});
});

const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText="";
        box.disabled=false;
    });
    turn0=true;
    count=0;
    winner=false;
}
resetBtn.addEventListener("click", resetGame);


