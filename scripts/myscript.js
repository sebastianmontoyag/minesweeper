

const game = 64; //Tamaño del campo
const set = 8; //dificultad
let bombSet = [];
let emptyCell = [];
let numberCell = [];
let bombCell = [];

// boton "NEW GAME"
function createTable(){
    reset();
    bombGenerator(game);
    var theGame = populateField();
    
    var theTable = checkBomb(theGame);
    console.log(numberCell);
    console.log(bombCell);
    console.log(emptyCell);
    var theField = document.getElementById('field').innerHTML = theTable;
    for (let i = 0; i < theGame.length; i++){
    document.getElementsByClassName("innerCell")[i].style.visibility = "hidden";
    }

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
    return mineField;

}



//resetea el juego
function reset(){
    var clearField = document.getElementById('field').innerHTML = "";
    bombSet = [];
    emptyCell = [];
    numberCell = [];
    bombCell = [];
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
            mineTable += `<td onclick="showCell(${i})" class="cell" id=${i}><span class="innerCell">*</span></td>`;
            bombCell.push(i);
        }else if (arr[i] =="0"){
        if(Number.isInteger(arr[i-9]) == true && rowBreak != 0){bombCount++;}
        if(Number.isInteger(arr[i-8]) == true){bombCount++}
        if(Number.isInteger(arr[i-7]) == true && rowBreak != 7){bombCount++;}
        if(Number.isInteger(arr[i-1]) == true && rowBreak != 0){bombCount++;}
        if(Number.isInteger(arr[i+1]) == true && rowBreak != 7){bombCount++;}
        if(Number.isInteger(arr[i+7]) == true && rowBreak != 0){bombCount++;}
        if(Number.isInteger(arr[i+8]) == true ){bombCount++;}
        if(Number.isInteger(arr[i+9]) == true && rowBreak != 7){bombCount++;}
        if(bombCount == 0) {
            mineTable += `<td onclick="showCell(${i})" class="cell" id=${i}><span class="innerCell"></span></td>`;
            emptyCell.push(i);
        }
        else mineTable += `<td onclick="showCell(${i})" class="cell" id=${i}><span class="innerCell">${bombCount}</span></td>`;
            numberCell.push(i);
        }
        
        rowBreak ++;
}
  
     mineTable += "</tr>";
    return mineTable;
}

function showCell(cellId){
    console.log("clicked" + cellId);
    console.log(bombSet);
    checkCells(bombSet, cellId);
    

}

function checkCells(arr, n){
  
    var innerCell = document.getElementsByClassName("innerCell");
    var cell = document.getElementsByClassName("cell");

    
    if (arr.includes(n)){
        console.log(innerCell.length);
        for (let i = 0; i < cell.length; i++){
         
             cell[i].style.visibility = "visible";
            
        }
    }else if (emptyCell.includes(n)){
        console.log("Empty");
        
        for (let j = 0; j < emptyCell.length; j++){
            innerCell[emptyCell[j]].style.visibility = "visible";
            cell[emptyCell[j]].style.background = "grey";
           
        }
    }else {
        innerCell[n].style.visibility = "visible";
    }
 
    
}
