document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const reset = document.getElementById('reset');
    let width = 10;
    let bombAmount = 20;
    let flags = 0;
    let squares = [];
    let isGameOver = false;


    //create board
    function createBoard() {
        //create game with random bombs
        //const bombsArray = Array(bombAmount).fill('bomb');
        const bombsArray = generateBombs(width*width);
        // const emptyArray = Array(width*width - bombAmount).fill('valid'); 
        // const gameArray = emptyArray.concat(bombsArray);
        // const shuffledArray = gameArray.sort(() => Math.random() -0.5);
        
        console.log(bombsArray);
        

        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            // square.classList.add(shuffledArray[i]);
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

        // test: check current square in the array
            var currrent = squares[parseInt(10)].id; 
            console.log(currrent);
            console.log(bombsArray.includes(parseInt(currrent)));
        //add numbers
        for (let i = 0; i < squares.length; i++){
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width -1);

            // if (squares[i].classList.contains('valid')) {
            if (bombsArray.includes(parseInt(i))) {
                if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++;
                if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total++;
                if (i > 10 && squares[i - width].classList.contains('bomb')) total++;
                if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total++;
                if (i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb')) total++;
                if (i < 90 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total++;
                if (i < 88 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total++;
                if (i < 89 && squares[i +width].classList.contains('bomb')) total++;
                squares[i].setAttribute('data', total);
                
                
             
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
            }else{
                square.classList.remove('flag');
                square.innerHtml = '';
                flaggs--;
            }
        }
    }

    // click on square actions
    function click(square) {
        let currentId = square.id;
        if (isGameOver) return;
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;
            if (square.classList.contains('bomb')) {
            gameOver(square);
        }else {
            let total = square.getAttribute('data')
            if (total !=0) {
                square.classList.add('checked');
                square.innerHTML = total;
                return;
            }
            checkSquare(square, currentId);
        }
        square.classList.add('checked');
    }


    //check neighboring squaren once clicked
    function checkSquare(square, currentId) {
        const isLeftEdge = (currentId % width ===0);
        const isRightEdge = (currentId % width === width -1);

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 -width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 10) {
                const newId = squares[parseInt(currentId - width)].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 -width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 98 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 90 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 +width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 88 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 +width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 89) {
                const newId = squares[parseInt(currentId) +width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }


        }, 10);

    }

    //game over
    function gameOver(square) {
        console.log("game over");
        isGameOver = true;

        //show all bombs
        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '💣';
            }
        })
        
    }

    //check for win
    function checkForWin() {
        let matches = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
                matches++;
            }

            if (matches === bombAmount) {
                console.log('Win');
                isGameOver = true;
            }
        }
    }

    //reset game
    reset.onclick = function() {
        window.location.reload(); 
    }

    //generdor de bombas
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