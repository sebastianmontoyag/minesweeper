

const game = 64; //Tamaño del campo
const set = 16; //dificultad
var bombSet = [];

//genera las bombas del juego en un array aleatorio
//comprobando si existe con cada iteracion
function bombGenerator(game){

    for (var i = 0; i < set; i++){ 
        
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

console.log(bombGenerator(game));

console.log(bombSet.length);