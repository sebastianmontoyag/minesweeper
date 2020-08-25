

const game = 64; //Tamaño del campo
const set = 16; //dificultad
let bombSet = [];

// boton "NEW GAME"
function createTable(){
    reset();
    bombGenerator(game);
    var theGame = populateField();
    var theTable = checkBomb(theGame);
    var theField = document.getElementById('field').innerHTML = theTable;
    
    return theField;
}

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

// colocar las bombas en un array con "0" como celda vacia

function populateField() {
    var mineField = [];
    for (let i = 0; i < game; i++){
  
    if(i == bombSet.find(isBomb => isBomb == i)){        
        mineField.push(i);        
    }else   
        mineField.push("0");
}
    console.log(mineField);
    return mineField;

}



//resetea el juego
function reset(){
    var clearField = document.getElementById('field').innerHTML = "";
    bombSet = [];
    return clearField;

}


//crear el html
//contruye una string con etiquetas html de tabla.

function checkBomb(arr){
    var bombCount = 0;
    var mineTable = "<tr>";
    var rowBreak = 0;
    for (let i = 0; i < arr.length; i++){
        bombCount =0;
        if (rowBreak == 8){mineTable+="</tr><tr>"; rowBreak=0;}
        
        if (arr[i] != "0"){
            mineTable += `<td class="cell" id=${i}>*</td>`;
        }else if (arr[i] =="0"){
        if(Number.isInteger(arr[i-9]) == true && rowBreak != 0){bombCount++;}
        if(Number.isInteger(arr[i-8]) == true){bombCount++}
        if(Number.isInteger(arr[i-7]) == true && rowBreak != 7){bombCount++;}
        if(Number.isInteger(arr[i-1]) == true && rowBreak != 0){bombCount++;}
        if(Number.isInteger(arr[i+1]) == true && rowBreak != 7){bombCount++;}
        if(Number.isInteger(arr[i+7]) == true && rowBreak != 0){bombCount++;}
        if(Number.isInteger(arr[i+8]) == true ){bombCount++;}
        if(Number.isInteger(arr[i+9]) == true && rowBreak != 7){bombCount++;}
        if(bombCount == 0) {mineTable += `<td class="cell" id=${i}></td>`;}
        else mineTable += `<td class="cell" id=${i}>${bombCount}</td>`;
        }
        
        rowBreak ++;
}
  
     mineTable += "</tr>";
    
    return mineTable;
}

