var MyBoard = document.getElementById("myboard");
var OpBoard = document.getElementById("opboard");
var BoardSize = 10;
var ShipType; //number of spaces it takes
var Rotation = false;
var SelectShipType = new Array(0, 0, 0); //indices correspond to ships sizes respectively. 1 is used ship.
var BlocksLocation = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0); //blocks locations which have ships

var MyScore = 0;
var OpScore = 0;

function PaintBlueorRed(_eventType, _myID, _direction /*Ship's alignment*/) {

    if (SelectShipType[ShipType - 2] == 0) { //if ship of this type is alredy deployed, do nothing

        if (_eventType == "click") { //check if there is a conflict in location
            for (let i = 0; i < ShipType; i++) {
                if (document.getElementById(parseInt(_myID) + i * _direction).style.backgroundColor == "red")
                    return alert("Your Ships Will Crash!")
            }
        }

        for (let i = 0; i < ShipType; i++) {
            if (_eventType == "mouseover") { //Shows where the ship would be deployed if clicked
                if (MyArray[parseInt(_myID) + i * _direction] == 1)
                    document.getElementById(parseInt(_myID) + i * _direction).style.backgroundColor = "red";
                else
                    document.getElementById(parseInt(_myID) + i * _direction).style.backgroundColor = "blue";
            } else if (_eventType == "mouseout") { //returns the blocks color to normal
                if (MyArray[parseInt(_myID) + i * _direction] == 1)
                    document.getElementById(parseInt(_myID) + i * _direction).style.backgroundColor = "blue";
                else
                    document.getElementById(parseInt(_myID) + i * _direction).style.backgroundColor = "aqua";
            } else { //deploy ship when clicked
                MyArray[parseInt(_myID) + i * _direction] = 1;
                document.getElementById(parseInt(_myID) + i * _direction).style.backgroundColor = "blue";

                if (ShipType == 2) { //store blocks locations
                    BlocksLocation[i] = parseInt(_myID) + i * _direction;
                } else if (ShipType == 3) {
                    BlocksLocation[i + 2] = parseInt(_myID) + i * _direction;
                } else {
                    BlocksLocation[i + 5] = parseInt(_myID) + i * _direction;
                }

                if (i == ShipType - 1) { //mark ship type so it isn't used again
                    SelectShipType[ShipType - 2] = 1;

                    if (ShipType == 2) {
                        document.getElementById("ss").style.borderColor = "red";
                    } else if (ShipType == 3) {
                        document.getElementById("ms").style.borderColor = "red";
                    } else {
                        document.getElementById("bs").style.borderColor = "red";
                    }
                }
            }
        }
    }
}

function ShowandHideLocation(event) {   //this function chooses which blocks to be highlighted
    if (!Rotation) {
        if (this.id % 10 == 9) {
            PaintBlueorRed(event.type, this.id, -1);
        } else if (this.id % 10 == 8 && (ShipType == 3 || ShipType == 4)) {
            PaintBlueorRed(event.type, this.id, -1);
        } else if (this.id % 10 == 7 && ShipType == 4) {
            PaintBlueorRed(event.type, this.id, -1);
        } else {
            PaintBlueorRed(event.type, this.id, 1);
        }
    } else {
        if (this.id >= 90) {
            PaintBlueorRed(event.type, this.id, -10)
        } else if (this.id >= 80 && (ShipType == 3 || ShipType == 4)) {
            PaintBlueorRed(event.type, this.id, -10)
        } else if (this.id >= 70 && ShipType == 4) {
            PaintBlueorRed(event.type, this.id, -10)
        } else {
            PaintBlueorRed(event.type, this.id, 10)
        }
    }
}

function SmallShipDepoly() {
    if (SelectShipType[0] == 0) {
        ShipType = 2;

        document.getElementById("ss").style.borderColor = "grey";

        if (SelectShipType[1] == 0)
            document.getElementById("ms").style.borderColor = "black";

        if (SelectShipType[2] == 0)
            document.getElementById("bs").style.borderColor = "black";
    } else {
        for (let i = 0; i < 2; i++) {
            MyArray[BlocksLocation[i]] = 0;
            document.getElementById(BlocksLocation[i]).style.backgroundColor = "aqua";
        }
        SelectShipType[0] = 0;
        SmallShipDepoly()
    }
}

function MediumShipDepoly() {
    if (SelectShipType[1] == 0) {
        ShipType = 3;

        if (SelectShipType[0] == 0)
            document.getElementById("ss").style.borderColor = "black";

        document.getElementById("ms").style.borderColor = "grey";

        if (SelectShipType[2] == 0)
            document.getElementById("bs").style.borderColor = "black";
    } else {
        for (let i = 0; i < 3; i++) {
            MyArray[BlocksLocation[i + 2]] = 0;
            document.getElementById(BlocksLocation[i + 2]).style.backgroundColor = "aqua";
        }
        SelectShipType[1] = 0;
        MediumShipDepoly()
    }
}

function BigShipDepoly() {
    if (SelectShipType[2] == 0) {
        ShipType = 4;

        if (SelectShipType[0] == 0)
            document.getElementById("ss").style.borderColor = "black";

        if (SelectShipType[1] == 0)
            document.getElementById("ms").style.borderColor = "black";

        document.getElementById("bs").style.borderColor = "grey";
    } else {
        for (let i = 0; i < 4; i++) {
            MyArray[BlocksLocation[i + 5]] = 0;
            document.getElementById(BlocksLocation[i + 5]).style.backgroundColor = "aqua";
        }
        SelectShipType[2] = 0;
        BigShipDepoly()
    }
}

function Rotate() {
    Rotation = !Rotation;
    if (Rotation)
        this.style.borderColor = "grey";
    else
        this.style.borderColor = "black";
}

var loadMyBoard = function () { //sets up the game 

    var sizePercent = 100 / BoardSize;
    var count = 0;
    MyArray = new Array(BoardSize * BoardSize);
    MyArray.fill(0);

    for (var i = 0; i < BoardSize; i++) {
        var Row = document.createElement('div')
        Row.style.width = "100%";
        Row.style.height = sizePercent + '%';

        for (var j = 0; j < BoardSize; j++) {

            var button = document.createElement('button');
            button.addEventListener("click", ShowandHideLocation);
            button.addEventListener("mouseover", ShowandHideLocation);
            button.addEventListener("mouseout", ShowandHideLocation);
            button.style.backgroundColor = "aqua";
            button.style.width = sizePercent + '%';
            button.style.height = "100%";
            button.id = count;
            count++;
            button.className = "btn";
            Row.appendChild(button);
        }
        MyBoard.appendChild(Row);
    }

    for (var i = 0; i < BoardSize; i++) {
        var Row = document.createElement('div')
        Row.style.width = "100%";
        Row.style.height = sizePercent + '%';

        for (var j = 0; j < BoardSize; j++) {

            var button = document.createElement('button');
            button.style.backgroundColor = "aqua";
            button.style.width = sizePercent + '%';
            button.style.height = "100%";
            button.id = count;
            count++;
            button.className = "btn2";
            Row.appendChild(button);
        }
        OpBoard.appendChild(Row);
    }
    document.getElementById("ss").addEventListener("click", SmallShipDepoly);
    document.getElementById("ms").addEventListener("click", MediumShipDepoly);
    document.getElementById("bs").addEventListener("click", BigShipDepoly);
    document.getElementById("rotate").addEventListener("click", Rotate);
    document.getElementById("start").addEventListener("click", Prepare);

    SmallShipDepoly() //just for initialization
}

function Prepare() { //remove events listeners
    for (let i = 0; i < SelectShipType.length; i++) {
        if (SelectShipType[i] == 0) {
            return alert("not all ships were deployed!")
        }
    }

    document.getElementById("ss").removeEventListener("click", SmallShipDepoly);
    document.getElementById("ms").removeEventListener("click", MediumShipDepoly);
    document.getElementById("bs").removeEventListener("click", BigShipDepoly);
    document.getElementById("rotate").removeEventListener("click", Rotate);
    document.getElementById("start").removeEventListener("click", Prepare);

    document.getElementById("ss").style.borderColor = "grey";
    document.getElementById("ms").style.borderColor = "grey";
    document.getElementById("bs").style.borderColor = "grey";
    document.getElementById("rotate").style.borderColor = "grey";

    for (let i = 0; i < BoardSize * BoardSize; i++) {
        document.getElementById(i).removeEventListener("click", ShowandHideLocation);
        document.getElementById(i).removeEventListener("mouseover", ShowandHideLocation);
        document.getElementById(i).removeEventListener("mouseout", ShowandHideLocation);
    }

    loadOpBoard()
}

function ShipsLocalizer(i) { //Chooses locations in random
    var _rotation = Math.round(Math.random()); //orientation
    var _opShip = Math.round(Math.random() * 99); //random block

    if (_rotation == 1) {
        var _dir = (Math.floor(_opShip / 10) <= 8 - i) ? 1 : -1; //put blocks down or up

        for (let j = 0; j < 2 + i; j++)
            if (OpArray[_opShip + 10 * j * _dir] == 1) //checks if decided blocks locations are empty
                return ShipsLocalizer(i)

        for (let j = 0; j < 2 + i; j++) //fill blocks locations
            OpArray[_opShip + 10 * j * _dir] = 1;

    } else {
        var _dir = (_opShip % 10 <= 8 - i) ? 1 : -1; //put blocks right or left

        for (let j = 0; j < 2 + i; j++)
            if (OpArray[_opShip + j * _dir] == 1)
                return ShipsLocalizer(i)

        for (let j = 0; j < 2 + i; j++)
            OpArray[_opShip + j * _dir] = 1;
    }
}

function MyTurn() {
    if (OpArray[this.id - 100] == 1) {
        this.style.backgroundColor = "red";
        MyScore++;
        document.getElementById("myscore").innerText = "My Score: " + MyScore;
        WinningCondition()
    } else {
        this.style.backgroundColor = "grey";
    }
    OpTurn(OpNextTarget)
    this.removeEventListener("click", MyTurn)
}

function OpTurn(_nextTarget) {

    if (OpTargetsArray[_nextTarget] != 0) {
        return OpTurn(Math.round(Math.random() * 99))
    }

    if (HitorMiss(_nextTarget)) {
        OpNextTarget = PredictNextTarget(_nextTarget);
    } else {
        OpNextTarget = Math.round(Math.random() * 99);
    }

}

function PredictNextTarget(_shipPart) {
    OpLocatedShipArray[0] = 1; //We got a ship let's find its parts
    var _dir = (OpLocatedShipArray[1] == 0) ? 1 : 10; //Check if we are searching for a horizontal ship or vertical

    if (IsBounded(_shipPart) == 0 || (IsBounded(_shipPart) == 2 && _dir == 10)
        || (IsBounded(_shipPart) == 3 && _dir == 1) || (IsBounded(_shipPart) == 4 && _dir == 10)
        || (IsBounded(_shipPart) == 1 && _dir == 1)) { //check if we are in a boundry block

        if (_shipPart == OpLocatedShipArray[OpLocatedShipArray.length - 1]) { //checks if we have a part of the ship or not
            if (OpTargetsArray[_shipPart + _dir] == 0) { // Check next block state
                return _shipPart + _dir;
            } else if (OpTargetsArray[_shipPart + _dir] == 2) {//same
                if (OpTargetsArray[_shipPart - _dir] == 0) {//checks previous block state
                    return _shipPart - _dir;
                } else if (OpTargetsArray[_shipPart - _dir] == 2) {//checks previous block state
                    OpLocatedShipArray[1] = 1; //if a red block is surounded with grey blocks so the ship is vertical
                    return PredictNextTarget(_shipPart);
                } else {
                    OpLocatedShipArray.push(-1); //we found right edge of ship
                    return PredictNextTarget(_shipPart - _dir)
                }
            } else {
                OpLocatedShipArray.push(_shipPart + _dir); //we found a ship part
                return PredictNextTarget(_shipPart + _dir); //propagate right(up)
            }
        }

        else if (OpLocatedShipArray[OpLocatedShipArray.length - 1] == -1) { //if the ship right side was aleady found, it's time to find the left side
            if (OpTargetsArray[_shipPart - _dir] == 2 || OpTargetsArray[_shipPart] == 2) {//same
                OpLocatedShipArray.splice(2, OpLocatedShipArray.length - 2); //we found left boundry of ship so we found the ship. Reset Array...
                OpLocatedShipArray[0] = 0;//reset
                OpLocatedShipArray[1] = 0;//reset
                return Math.round(Math.random() * 99);
            } else if (OpTargetsArray[_shipPart - _dir] == 0) { // Check next block state
                return _shipPart - _dir;
            }
            else {
                return PredictNextTarget(_shipPart - _dir);
            }
        }

        else {
            return PredictNextTarget(OpLocatedShipArray[OpLocatedShipArray.length - 1]);//if we have grey block get the last red one
        }

    } else if ((IsBounded(_shipPart) == 2 && _dir == 1) || (IsBounded(_shipPart) == 3 && _dir == 10)
        || IsBounded(_shipPart) == 99 || (IsBounded(_shipPart) == 9 && _dir == 1)
        || (IsBounded(_shipPart) == 90 && _dir == 10)) {//if block at right boundry or down boundry

        if (_shipPart == OpLocatedShipArray[OpLocatedShipArray.length - 1]) { //checks if we have a part of the ship or not
            if (OpTargetsArray[_shipPart - _dir] == 0) {//checks previous block state
                return _shipPart - _dir;
            } else if (OpTargetsArray[_shipPart - _dir] == 2) {//checks previous block state
                OpLocatedShipArray[1] = 1; //if a red block is surounded with grey blocks so the ship is vertical
                return PredictNextTarget(_shipPart);
            } else {
                OpLocatedShipArray.push(-1); //we found right edge of ship
                return PredictNextTarget(_shipPart - _dir)
            }
        }

        else if (OpLocatedShipArray[OpLocatedShipArray.length - 1] == -1) { //if the ship right side was aleady found, it's time to find the left side
            if (OpTargetsArray[_shipPart - _dir] == 2 || OpTargetsArray[_shipPart] == 2) {//same
                OpLocatedShipArray.splice(2, OpLocatedShipArray.length - 2); //we found left boundry of ship so we found the ship. Reset Array...
                OpLocatedShipArray[0] = 0;//reset
                OpLocatedShipArray[1] = 0;//reset
                return Math.round(Math.random() * 99);
            } else if (OpTargetsArray[_shipPart - _dir] == 0) { // Check next block state
                return _shipPart - _dir;
            }
            else {
                return PredictNextTarget(_shipPart - _dir);
            }
        }

        else {
            return PredictNextTarget(OpLocatedShipArray[OpLocatedShipArray.length - 1]);//if we have grey block get the last red one
        }


    } else if ((IsBounded(_shipPart) == 4 && _dir == 1) || (IsBounded(_shipPart) == 1 && _dir == 10)
        || IsBounded(_shipPart) == -1 || (IsBounded(_shipPart) == 9 && _dir == 10)
        || (IsBounded(_shipPart) == 90 && _dir == 1)) {// if block is at left boundry or up boundry
        if (_shipPart == OpLocatedShipArray[OpLocatedShipArray.length - 1]) { //checks if we have a part of the ship or not
            if (OpTargetsArray[_shipPart + _dir] == 0) { // Check next block state
                return _shipPart + _dir;
            } else if (OpTargetsArray[_shipPart + _dir] == 2) {//same
                OpLocatedShipArray[1] = 1; //if a red block is surounded with grey blocks so the ship is vertical
                return PredictNextTarget(_shipPart);
            } else {
                OpLocatedShipArray.push(_shipPart + _dir); //we found a ship part
                return PredictNextTarget(_shipPart + _dir); //propagate right(up)
            }
        }

        else if (OpLocatedShipArray[OpLocatedShipArray.length - 1] == -1) { //if the ship right side was aleady found, it's time to find the left side
            if (OpTargetsArray[_shipPart] == 2) {//same
                OpLocatedShipArray.splice(2, OpLocatedShipArray.length - 2); //we found left boundry of ship so we found the ship. Reset Array...
                OpLocatedShipArray[0] = 0;//reset
                OpLocatedShipArray[1] = 0;//reset
                return Math.round(Math.random() * 99);
            }
        }

        else {
            return PredictNextTarget(OpLocatedShipArray[OpLocatedShipArray.length - 1]);//if we have grey block get the last red one
        }
    }

    OpLocatedShipArray.splice(2, OpLocatedShipArray.length - 2); //we lost ship... Reset Array...
    OpLocatedShipArray[0] = 0;//reset
    OpLocatedShipArray[1] = 0;//reset
    return Math.round(Math.random() * 99);
}

function IsBounded(_block) {
    if (_block == 0) { //left up corner
        return -1;
    } else if (_block == 9) {//right up corner
        return 9;
    } else if (_block == 90) {//down left corner
        return 90;
    } else if (_block == 99) {//down right corner
        return 99;
    } else if (_block % 10 == 9) { //right boundry
        return 2;
    } else if (Math.floor(_block / 10) == 9) { //down boundry
        return 3;
    } else if (_block % 10 == 0) { //left boundry
        return 4;
    } else if (Math.floor(_block / 10) == 0) { //up boundry
        return 1;
    } else {
        return 0; //not bounded
    }
}

function HitorMiss(_target) {
    if (MyArray[_target] == 1) {
        document.getElementById(parseInt(_target)).style.backgroundColor = "red";
        OpScore++;
        document.getElementById("opscore").innerText = "Oponent Score: " + OpScore;
        WinningCondition()
        OpTargetsArray[parseInt(_target)] = 1;
        if (OpLocatedShipArray[OpLocatedShipArray.length - 1] == -1) {
            OpLocatedShipArray.splice(2, 0, _target);
        } else {
            OpLocatedShipArray.push(_target);
        }
        return true
    } else {
        document.getElementById(_target).style.backgroundColor = "grey";
        OpTargetsArray[parseInt(_target)] = 2;
        if (OpLocatedShipArray[0] == 0)
            return false
        else
            return true
    }
}

function WinningCondition() {
    if (MyScore == 9) {
        alert("You Won!")
        document.getElementById("loading").innerText = "You Won!";
        EndGame()
    } else if (OpScore == 9) {
        alert("Opponent Won!")
        document.getElementById("loading").innerText = "Opponent Won!";
        EndGame()
    }
}

function EndGame() {
    for (let i = 0; i < OpArray.length; i++) {
        document.getElementById(100 + i).removeEventListener("click", MyTurn);
    }
}

function loadOpBoard() { //setup op board
    OpArray = new Array(BoardSize * BoardSize);
    OpArray.fill(0);
    OpTargetsArray = new Array(BoardSize * BoardSize);
    OpTargetsArray.fill(0);
    OpLocatedShipArray = [0, 0];
    /*
        0 index indicates whether to predict next block or choose randomly.
        1 index for ship orientation 
    */
    OpNextTarget = Math.round(Math.random() * 99);


    for (let i = 0; i < 3; i++) //i=0 is 2-block ship, i=1 is 3-block-ship, i=....
        ShipsLocalizer(i)

    for (let i = 0; i < OpArray.length; i++) {
        document.getElementById(100 + i).addEventListener("click", MyTurn);
    }

    document.getElementById("loading").innerText = "Game Started!";
}

loadMyBoard()