document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const reset = document.getElementById('reset');
    const bombs = document.getElementById('bombsLeft');
    let width = 10;
    let bombAmount = 10;
    let flags = 0;
    let squares = [];
    let isGameOver = false;
    let bombsArray = [];
    let numArray = [];

    //create board
    function createBoard() {
        //create game with random bombs
        bombsArray = generateBombs(width*width);
        bombs.innerHTML = bombAmount - flags;
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            grid.appendChild(square);
            squares.push(square);
            
            //normal click
            square.addEventListener('click', function(e){
                click(square);
            })

            //cntrl and left click
            square.oncontextmenu = function(e) {
                e.preventDefault();
                addFlag(square);
            }
        }


        //add numbers
        for (let i = 0; i < squares.length; i++){
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width -1);
            if (!bombsArray.includes(parseInt(i))) {
                if (i > 0 && !isLeftEdge && bombsArray.includes(parseInt(i) - 1)) total ++;
                if (i > 9 && !isRightEdge && bombsArray.includes(parseInt(i) + 1 - width)) total++;
                if (i >= 10 && bombsArray.includes(parseInt(i) - width)) total++;
                if (i >= 11 && !isLeftEdge && bombsArray.includes(parseInt(i)- 1 - width)) total++;
                if (i < 98 && !isRightEdge && bombsArray.includes(parseInt(i) + 1)) total++;
                if (i < 90 && !isLeftEdge && bombsArray.includes(parseInt(i) - 1 + width)) total++;
                if (i < 88 && !isRightEdge && bombsArray.includes(parseInt(i) + 1 + width)) total++;
                if (i < 89 && bombsArray.includes(parseInt(i) + width)) total++;
                numArray[i] = total;
                
             
            }
        }


    }

    createBoard();
    //add flag
    function addFlag(square) {
        if (isGameOver) return;
        if (!square.classList.contains('checked') && (flags < bombAmount)) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag');
                square.innerHTML = '🚩';
                flags++;
                checkForWin();                
                bombs.innerHTML = bombAmount - flags;
            }else{
                square.classList.remove('flag');
                square.innerHTML = '';
                flags--;
                bombs.innerHTML = bombAmount - flags;
            }
        }
    }

    // click on square actions
    function click(square) {
        let currentId = square.id;
        if (isGameOver) return;
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;
            if (bombsArray.includes(parseInt(currentId))){
            gameOver(square);
        }else {
            
            let total = numArray[parseInt(currentId)];
            if (total !=0) {
                square.classList.add('checked');
                square.innerHTML = total;
                return;
            }
            checkSquare(square, currentId);
        }
        square.classList.add('checked');
    }


    //check neighboring square once clicked
    function checkSquare(square, currentId) {
        const isLeftEdge = (currentId % width === 0);
        const isRightEdge = (currentId % width === width -1);
        
        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 10) {
                const newId = squares[parseInt(currentId) - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 -width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId <= 98 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            
            }
            if (currentId < 90 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 88 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 89) {
                const newId = squares[parseInt(currentId) + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }


        }, 10);

    }

    //game over
    function gameOver(square) {
        
        isGameOver = true;

        //show all bombs
        squares.forEach(square => {
            if (bombsArray.includes(parseInt(square.id))) {
                square.innerHTML = '💣';
                reset.innerHTML = '💀';
                reset.style.background = "red";
            }
        })
    }

    //check for win
    function checkForWin() {
        let matches = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains('flag') && bombsArray.includes(parseInt(i))) {
                matches++;
            }

            if (matches === bombAmount) {
                isGameOver = true;
                reset.innerHTML = '😃';
                reset.style.background = "green";
            }
        }
    }

    //reset game
    reset.onclick = function() {
        window.location.reload(); 
    }

    //geneate the bombs
    function generateBombs(game){
        
        var bombSet = [];
    for (let i = 0; i < bombAmount; i++){ 
        
        var bomb = Math.floor(Math.random() * game);
       
        if (bombSet.includes(bomb)){
            bomb = Math.floor(Math.random() * game);
            bombSet.push(bomb);

        }else
        bombSet.push(bomb);

    }    
    return bombSet;
}

})