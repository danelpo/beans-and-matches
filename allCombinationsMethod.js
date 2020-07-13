function auto() {
    myJSON = {
        "000000000" : {
            "id":"000000000",
            "next":["000000001", "000000010", "000000100", "000001000", "000010000", "000100000", "001000000", "010000000", "100000000"],
            "beans":[1,1,1,1,1,1,1,1,1]
        }
    };

    let lastUniversalPosition = "000000000";

    for(let move1 = 0; move1 < 9; move1++) {
        
        let id = lastUniversalPosition.substring(0, move1) + "1" + lastUniversalPosition.substring(move1 + 1, 10);
        
        let next = findNext(id, 2);
        
        let beans = [];
            for(let i = 0; i < next.length; i++) {
                beans.push(1);
            }
        
        let newAddition = {
            "id":id,
            "next":next,
            "beans":beans
        };

        myJSON[id] = newAddition;

        for (move2 of next) {
            let next2 = findNext(move2, 1);

            let beans2 = [];
                for(let i = 0; i < next2.length; i++) {
                    beans2.push(1);
                }
            
            let newAddition2 = {
                "id":move2,
                "next":next2,
                "beans":beans2
            };

            myJSON[move2] = newAddition2;

            for(move3 of next2) {
                if(!myJSON[move3]) {//new
                    let next3 = findNext(move3, 2);

                    let beans3 = [];
                        for(let i = 0; i < next3.length; i++) {
                            beans3.push(1);
                        }
                    
                    let newAddition3 = {
                        "id":move3,
                        "next":next3,
                        "beans":beans3
                    };

                    myJSON[move3] = newAddition3;

                    for(move4 of next3) {
                        if(!myJSON[move4]) {//new
                            let next4 = findNext(move4, 1);

                            let beans4 = [];
                                for(let i = 0; i < next4.length; i++) {
                                    beans4.push(1);
                                }
                            
                            let newAddition4 = {
                                "id":move4,
                                "next":next4,
                                "beans":beans4
                            };

                            myJSON[move4] = newAddition4;

                            for(move5 of next4) {
                                if(!myJSON[move5]) {
                                    let next5 = findNext(move5, 2);

                                    let beans5 = [];
                                        for(let i = 0; i < next5.length; i++) {
                                            beans5.push(1);
                                        }
                                    
                                    let newAddition5 = {
                                        "id":move5,
                                        "next":next5,
                                        "beans":beans5
                                    };

                                    myJSON[move5] = newAddition5;

                                    if(!isWinner(move5)) {
                                        for(move6 of next5) {
                                            if(!myJSON[move6]) {
                                                let next6 = findNext(move6, 1);

                                                let beans6 = [];
                                                    for(let i = 0; i < next6.length; i++) {
                                                        beans6.push(1);
                                                    }
                                                
                                                let newAddition6 = {
                                                    "id":move6,
                                                    "next":next6,
                                                    "beans":beans6
                                                };

                                                myJSON[move6] = newAddition6;

                                                if(!isWinner(move6)) {
                                                    for(move7 of next6) {
                                                        if(!myJSON[move7]) {
                                                            let next7 = findNext(move7, 2);

                                                            let beans7 = [];
                                                                for(let i = 0; i < next7.length; i++) {
                                                                    beans7.push(1);
                                                                }
                                                            
                                                            let newAddition7 = {
                                                                "id":move7,
                                                                "next":next7,
                                                                "beans":beans7
                                                            };

                                                            myJSON[move7] = newAddition7;

                                                            if(!isWinner(move7)) {
                                                                for(move8 of next7) {
                                                                    if(!myJSON[move8]) {
                                                                        let next8 = findNext(move8, 1);

                                                                        let beans8 = [];
                                                                            for(let i = 0; i < next8.length; i++) {
                                                                                beans8.push(1);
                                                                            }
                                                                        
                                                                        let newAddition8 = {
                                                                            "id":move8,
                                                                            "next":next8,
                                                                            "beans":beans8
                                                                        };
            
                                                                        myJSON[move8] = newAddition8;

                                                                        if(!isWinner(move8)) {
                                                                            for(move9 of next8) {
                                                                                if(!myJSON[move9]) {
                                                                                    let next9 = findNext(move9, 2);

                                                                                    let beans9 = [];
                                                                                        for(let i = 0; i < next9.length; i++) {
                                                                                            beans9.push(1);
                                                                                        }
                                                                                    
                                                                                    let newAddition9 = {
                                                                                        "id":move9,
                                                                                        "next":next9,
                                                                                        "beans":beans9
                                                                                    };
                        
                                                                                    myJSON[move9] = newAddition9;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(myJSON);
    console.log(Object.keys(myJSON).length);

    return myJSON;
}

function findNext(id, nextDigit) {
    let next = [];
    
    for(let i = 0; i < id.toString().length; i++) {
        if(id.substring(i, i+1) == '0') {
            next.push("" + id.substring(0, i) + nextDigit.toString() + id.substring(i+1, 10));
        }
    }
    return next;
}

function isWinner(id) {
    let win = false;
    if(id.substring(0, 1) == "1" && id.substring(1, 2) == "1" && id.substring(2, 3) == "1")
        win = true;
    else if(id.substring(0, 1) == "2" && id.substring(1, 2) == "2" && id.substring(2, 3) == "2")
        win = true;
    else if(id.substring(3, 4) == "1" && id.substring(4, 5) == "1" && id.substring(5, 6) == "1")
        win = true;
    else if(id.substring(3, 4) == "2" && id.substring(4, 5) == "2" && id.substring(5, 6) == "2")
        win = true;
    else if(id.substring(6, 7) == "1" && id.substring(7, 7) == "1" && id.substring(8, 9) == "1")
        win = true;
    else if(id.substring(6, 7) == "2" && id.substring(7, 7) == "2" && id.substring(8, 9) == "2")
        win = true;
    else if(id.substring(0, 1) == "1" && id.substring(3, 4) == "1" && id.substring(6, 7) == "1")
        win = true;
    else if(id.substring(0, 1) == "2" && id.substring(3, 4) == "2" && id.substring(6, 7) == "2")
        win = true;
    else if(id.substring(1, 2) == "1" && id.substring(4, 5) == "1" && id.substring(7, 7) == "1")
        win = true;
    else if(id.substring(1, 2) == "2" && id.substring(4, 5) == "2" && id.substring(7, 7) == "2")
        win = true;
    else if(id.substring(2, 3) == "1" && id.substring(5, 6) == "1" && id.substring(8, 9) == "1")
        win = true;
    else if(id.substring(2, 3) == "2" && id.substring(5, 6) == "2" && id.substring(8, 9) == "2")
        win = true;
    else if(id.substring(0, 1) == "2" && id.substring(4, 5) == "2" && id.substring(8, 9) == "2")
        win = true;
    else if(id.substring(0, 1) == "1" && id.substring(4, 5) == "1" && id.substring(8, 9) == "1")
        win = true;
    else if(id.substring(2, 3) == "2" && id.substring(4, 5) == "2" && id.substring(6, 7) == "2")
        win = true;
    else if(id.substring(2, 3) == "1" && id.substring(4, 5) == "1" && id.substring(6, 7) == "1")
        win = true;

    return win;
}