var form = document.querySelector(".inputForm");
var input = form.querySelector("input");
var resultValue = [];


function result(){

    var first = Math.ceil(Math.random()*9)
    var second = Math.ceil(Math.random()*9)
    var third = Math.ceil(Math.random()*9)
 
    for(;;){
        if(first !== second) {
        break;   
        } else{
           second = Math.ceil(Math.random()*9)
        }
    }
    for(;;){
        if( first !== third && second !== third ){
          break;
        } else {
          third = Math.ceil(Math.random()*9)
        }
      }
      resultValue = [first,second,third];
  }

function corretCheck(value){
  var arrayValue = value.split("")
  var s = 0;
  var b = 0;
  for(var i = 0; i < arrayValue.length; i++){
    for(var g= 0; g < arrayValue.length; g++){
      if(resultValue[i] == arrayValue[g]){
        if(i == g){
          s++;
        } else if(i !== g){
          b++;
        }
      }
    } 
  }
  var howManyCorret = document.createElement("span")
  howManyCorret.innerText = `${s}S${b}B`;
  answerBox.appendChild(howManyCorret)
  winner(s);
}

function inputValue(text){
  var writeValue = document.createElement("span");
  writeValue.innerText = text;
  answerBox.appendChild(writeValue)
}

function winner(s){
  if(s==3){
    alert("정답입니다.")
  }
}

function handleSubmit(event){
  event.preventDefault();
  var currentValue = input.value;
  inputValue(currentValue) + corretCheck(currentValue)
  input.value = "";
}

function init(){
  form.addEventListener("submit",handleSubmit)
}

init();