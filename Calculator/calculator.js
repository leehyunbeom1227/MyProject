const calculator = document.getElementById("calculator");
const number = document.getElementsByClassName("number");
const sign = document.getElementsByClassName("sign");
const btn = document.getElementsByClassName("btn");
const eq = document.getElementsByClassName("eqaul")
const clear = document.getElementsByClassName("clear")
const allClear = document.getElementsByClassName("allClear")
const smallCalculator = document.getElementById("smallCalculator")
var value = "";
var smallValue = "";
var max_len = 14;

function handleNumberClick(event){
    if(String(value).length <= max_len){
        value = value + event.target.innerHTML;
        calculator.innerHTML = value;
    } else {
        alert("최대" + max_len + "글자 이상 쓸수 없습니다!");
        lmt_str = String(value).substring(0, max_len);
        value = lmt_str;
    }
}

function clickSign(event){
    for(var i = 0; i < 3; i ++){
        if( smallValue.substring(smallValue.length-1,smallValue.length) == sign[i].innerHTML){
            smallValue = smallValue.slice(0,-1);
            smallValue = smallValue + event.target.innerHTML;
            smallCalculator.innerHTML = smallValue;
        } else if(value == 0){  
            smallValue = smallValue;
        } else {
            smallValue = value + event.target.innerHTML;
            value = smallValue;
            smallCalculator.innerHTML = smallValue;
            value = "";
            calculator.innerHTML = ""; 
        }
    }
}

function  clickClear(){
    value= value.slice(0,-1);
    calculator.innerHTML = value;
}

Array.from(number).forEach(number => number.addEventListener("click", handleNumberClick));
eq[0].addEventListener("click", 
    function(){
      if(eval(smallValue.concat(value)) % 1 === 0 && String(eval(smallValue.concat(value))).length <= 14){
        calculator.innerHTML = eval(smallValue.concat(value));
        value = eval(smallValue.concat(value));
        smallValue ="";
        smallCalculator.innerHTML = smallValue;
        } else {
        calculator.innerHTML = eval(smallValue.concat(value)).toExponential(5);
        value = eval(smallValue.concat(value)).toExponential(5);
        smallValue ="";
        smallCalculator.innerHTML = smallValue;
      }
});
clear[0].addEventListener("click", clickClear);
allClear[0].addEventListener("click", 
    function(){
      value = "";
      smallValue = "";
      calculator.innerHTML = value;
      smallCalculator.innerHTML = smallValue;
});

Array.from(sign).forEach(sign => sign.addEventListener("click", clickSign));
