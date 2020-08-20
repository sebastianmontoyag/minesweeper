

const game = 64; //Tamaño del campo
const set = 16; //dificultad
let bombSet = [];

//genera las bombas del juego en un array aleatorio
//comprobando si existe con cada iteracion
function bombGenerator(game){

    for (let i = 0; i < set; i++){ 
        
        var bomb = Math.floor(Math.random() * game);
        
        if (bombSet.includes(bomb)){
            bomb = Math.floor(Math.random() * game);
            bombSet.push(bomb);
            
        }else
        bombSet.push(bomb);

    }
    
    return bombSet;

}

// colocar las bombas en sus casillas

function populateField() {
    var isBomb;
    var bombCell, emptyCell;
    var tableArr = [];

    console.log(bombSet.find(isBomb => isBomb == 0));
    if (bombSet.find(isBomb => isBomb == 0) == 0){
        tableArr.push("BOMB");
    }else 
    tableArr.push("NOPE");
    

    //     for(let i = 0; i < game; i++){
    //     if ( i == bombSet.find(isBomb => isBomb == i)) {
    //     bombCell = `<li id="${i}">*</li>`;
    //     tableArr.push(bombCell);
    //     }else        
    //     emptyCell = `<li id="${i}"></li>`;
     
    //     tableArr.push(emptyCell);
    // }
    
   return tableArr;
}



function createTable(){
    bombGenerator(game);
    theGame = populateField();

    for (let i = 0; i < set; i++){
    
    }
    return theGame;
}


console.log(bombGenerator(game));


console.log(createTable());