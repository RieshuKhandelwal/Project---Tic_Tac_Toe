let boxes = document.querySelectorAll(".box");
let resetBTN = document.querySelector("#resetBTN");
let newGameBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let poster = document.querySelector("img");

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let count = 0;
let turnX = true;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        count+=1;
        if(turnX === true){
            box.innerText = "X";
            box.style.color = "red";
            turnX = false;
        }else{
            box.innerText = "O";
            box.style.color = "yellow";
            turnX = true;
        }
        box.disabled = true;
        //to keep checking winner on every click we are calling winner function
        checkWinner();
        if(count === 9 && checkWinner() !== true){
            showDraw();
        }
    });
    
});

const showWinner = (winner) => {
    msg.innerText = `CONGRATULATIONS!!! WINNER IS ${winner}`;
    msgContainer.classList.remove("hide");
    resetBTN.classList.add("hide");
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let position1Val = boxes[pattern[0]].innerText;
        let position2Val = boxes[pattern[1]].innerText;
        let position3Val = boxes[pattern[2]].innerText;

        if(position1Val != "" && position2Val != "" && position3Val != ""){
            if(position1Val === position2Val && position2Val === position3Val){
                console.log(`winner ${position1Val}`);
                showWinner(position1Val);
                for(let box of boxes ){
                    box.disabled = true;
                }
                return true;
            }
        }
    }
}

const showDraw = () => {
    msg.innerText = `Sorry for the, DRAW!!!`;
    poster.classList.add("hide");
    msgContainer.classList.remove("hide");
    resetBTN.classList.add("hide");
}

const reset = () => {
    msgContainer.classList.add("hide");
    turnX = true;
    count = 0;
    boxes.forEach((box) => {
        box.innerText=" ";
        box.disabled = false;
    });
}
//function of reset btn is when clicked then it will call reset() function
resetBTN.addEventListener("click",reset);

//function of new game button is defined below
newGameBtn.addEventListener("click", () =>{
    reset();
    resetBTN.classList.remove("hide");
    poster.classList.remove("hide");
});
