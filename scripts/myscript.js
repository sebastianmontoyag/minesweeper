

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
    var mineField = "<tr>";
    var rowBreak = 0;
    for (let i = 0; i < game; i++){
    if (rowBreak == 8){mineField+="</tr><tr>"; rowBreak=0;}
    rowBreak ++;
    if(i == bombSet.find(isBomb => isBomb == i)){
        
        mineField += `<td id=${i}>*</td>`;

        
    }else   
        mineField += `<td id=${i}></td>`;
    
}
    mineField += "</tr>";
    
    return mineField;

}

function createTable(){
    
    bombGenerator(game);
    var theGame = populateField();
    var theField = document.getElementById('field').innerHTML = theGame;
    
    return theField;
}

//Necesito un array antes de mostrar la tabla, comprobar numeros y despues 
//crear el html

// function checkBomb(){
//     var isBomb;
    
//     for (){

//     }

// }