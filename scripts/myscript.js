

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

//cambiar td por div y css grid

function populateField() {
    var mineField = "";
    
    for (let i = 0; i < game; i++){
    
    if(i == bombSet.find(isBomb => isBomb == i)){
        
        mineField += `<td id=${i}>*</td>`;

        
    }else   
        mineField += `<td id=${i}></td>`;

}
    
    return mineField;

}

function createTable(){
    
    bombGenerator(game);
    var theGame = populateField();
    var theField = document.getElementById('field').innerHTML = theGame;
    
    return theField;
}
