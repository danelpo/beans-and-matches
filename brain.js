let current = "000000000";
let data = null;
let victory = 0;
let AIPastMoves = [];

fetch('newData.json').then(response => response.json()).then(jsonResponse => data=jsonResponse);

function play(cell) {//user action. user is X
    if(victory == 0 && current.substring(cell, cell+1) == "0") {
        current = current.substring(0, cell) + "1" + current.substring(cell+1, 10);
        draw(current);
        checkWin();
        if(victory == 0) {
            current = AImove(current);
            draw(current);
            checkWin();
        }
    } else if(victory != 0) {
        victory = 0;
        current = "000000000";
        draw(current);
        AIPastMoves = [];
    }
}

function draw(current) {
    for(let i = 0; i < 9; i++) {
        if(current.substring(i, i+1) == "1") {
            document.getElementById("cell" + i).innerHTML = "x";
        } else if(current.substring(i, i+1) == "2") {
            document.getElementById("cell" + i).innerHTML = "o";
        } else {
            document.getElementById("cell" + i).innerHTML = "";
        }
    }
}

function AImove(current) {
    let myMove = data[`${current}`];
    let beans = Object.assign([], myMove.beans);
    let arrayOfNextMoves = [];

    for(let i = 0; i < beans.length; i++) {
        for(let j = 0; j < beans[i]; j++) {
            arrayOfNextMoves.push(myMove.next[i]);
        }
    }

    arrayOfNextMoves = shuffle(arrayOfNextMoves);
    arrayOfNextMoves = shuffle(arrayOfNextMoves);
    arrayOfNextMoves = shuffle(arrayOfNextMoves);

    AIPastMoves.push([myMove.id, arrayOfNextMoves[0]]);
    if(arrayOfNextMoves[0]) {
        return arrayOfNextMoves[0];
    }
    return current;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function checkWin() {
    if(whichWinner(current) == 1) {//AI win (o won)
        victory = 1;
        //giftAI
        for(let i = 0; i < AIPastMoves.length; i++) {
            let winnerMove = data[`${AIPastMoves[i][0]}`];
            for(let j = 0; j < winnerMove.next.length; j++) {//find the move
                if(winnerMove.next[j] == AIPastMoves[i][1]) {
                    winnerMove.beans[j]++;
                }
            }
        }

    } else if(whichWinner(current) == -1) {//AI lost (x won)
        victory = -1;
        //punishAI
        for(let i = 0; i < AIPastMoves.length; i++) {
            let higherThanOne = true;
            let loserMove = data[`${AIPastMoves[i][0]}`];
            for(let j = 0; j < loserMove.next.length; j++) {//find the move
                if(loserMove.next[j] == AIPastMoves[i][1]) {
                    if(AIPastMoves.length == 2 && loserMove.beans[j] > 3) {
                        loserMove.beans[j]-=3;
                    } else if(AIPastMoves.length == 3 && loserMove.beans[j] > 2) {
                        loserMove.beans[j]-=2;
                    } else if(AIPastMoves.length == 4 && loserMove.beans[j] > 1) {
                        loserMove.beans[j]--;
                    }
                    else {
                        higherThanOne = false;
                    }
                    break;
                }
            }
            if(higherThanOne == false) {
                for(let j = 0; j < loserMove.next.length; j++) {//find the move
                    if(loserMove.next[j] != AIPastMoves[i][1]) {
                        if(AIPastMoves.length == 2) {
                            loserMove.beans[j]+=3;
                        } else if(AIPastMoves.length == 3) {
                            loserMove.beans[j]+=2;
                        } else if(AIPastMoves.length == 4) {
                            loserMove.beans[j]++;
                        }
                    }
                }
            }
        }
    } else if(whichWinner(current) == 10) {
        victory = 10;
    }
}

function whichWinner(id) {
    let win = 0;
    if(id.substring(0, 1) == "1" && id.substring(1, 2) == "1" && id.substring(2, 3) == "1")
        win = -1;
    else if(id.substring(0, 1) == "2" && id.substring(1, 2) == "2" && id.substring(2, 3) == "2")
        win = 1;
    else if(id.substring(3, 4) == "1" && id.substring(4, 5) == "1" && id.substring(5, 6) == "1")
        win = -1;
    else if(id.substring(3, 4) == "2" && id.substring(4, 5) == "2" && id.substring(5, 6) == "2")
        win = 1;
    else if(id.substring(6, 7) == "1" && id.substring(7, 8) == "1" && id.substring(8, 9) == "1")
        win = -1;
    else if(id.substring(6, 7) == "2" && id.substring(7, 8) == "2" && id.substring(8, 9) == "2")
        win = 1;
    else if(id.substring(0, 1) == "1" && id.substring(3, 4) == "1" && id.substring(6, 7) == "1")
        win = -1;
    else if(id.substring(0, 1) == "2" && id.substring(3, 4) == "2" && id.substring(6, 7) == "2")
        win = 1;
    else if(id.substring(1, 2) == "1" && id.substring(4, 5) == "1" && id.substring(7, 8) == "1")
        win = -1;
    else if(id.substring(1, 2) == "2" && id.substring(4, 5) == "2" && id.substring(7, 8) == "2")
        win = 1;
    else if(id.substring(2, 3) == "1" && id.substring(5, 6) == "1" && id.substring(8, 9) == "1")
        win = -1;
    else if(id.substring(2, 3) == "2" && id.substring(5, 6) == "2" && id.substring(8, 9) == "2")
        win = 1;
    else if(id.substring(0, 1) == "2" && id.substring(4, 5) == "2" && id.substring(8, 9) == "2")
        win = 1;
    else if(id.substring(0, 1) == "1" && id.substring(4, 5) == "1" && id.substring(8, 9) == "1")
        win = -1;
    else if(id.substring(2, 3) == "2" && id.substring(4, 5) == "2" && id.substring(6, 7) == "2")
        win = 1;
    else if(id.substring(2, 3) == "1" && id.substring(4, 5) == "1" && id.substring(6, 7) == "1")
        win = -1;
    else if(id.replace("0", "").length == 9)
        win = 10;
    return win;
}

function saveBrain() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "newData" + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
/*
setTimeout(function(){
    setInterval(function(){playTester()}, 10);
}, 1000);
//*/
function playTester() {
        let emptyBoxes = [];

        for(let i = 0; i < current.length; i++) {
            if(current.substring(i, i+1) == '0')
                emptyBoxes.push(i);
        }

        if(emptyBoxes.length == 0) {
            document.getElementById("cell1").click();
        } else {
            emptyBoxes = shuffle(emptyBoxes);
            emptyBoxes = shuffle(emptyBoxes);
            emptyBoxes = shuffle(emptyBoxes);

            let testerCell = emptyBoxes[0];
            document.getElementById("cell" + `${testerCell}`).click();
        }
}