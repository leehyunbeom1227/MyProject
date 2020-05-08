const calculator = document.getElementById("calculator");
const number = document.getElementsByClassName("number");
const sign = document.getElementsByClassName("sign");
var value = "";
var max_len = 14;
var b = value.substring(value.length-1,value.length)

function handleNumberClick(event){
    if(value.length <= max_len){
        value = value + event.target.innerText;
        calculator.innerText = value;
    } else {
        alert("최대" + max_len + "글자 이상 쓸수 없습니다!");
        lmt_str = value.substring(0, max_len);
        value = lmt_str;
    }
}

function handleSignClick(event){
    if(value.length <= max_len){
       if(b !== "+"|| b !== "-"|| b !== "*" || b !== "÷" ){
           calculator.innerText = event;
       } else {
           var signeraser = calculator
           calculator.substring(0,signeraser.length-1)
           calculator.innerText = event;           
       }
    } else {
        alert("최대" + max_len + "글자 이상 쓸수 없습니다!");
        lmt_str = value.substring(0, max_len);
        value = lmt_str;
    }
}

function init(){
    Array.from(number).forEach(number => number.addEventListener("click", handleNumberClick));
    Array.from(sign).forEach(sign => sign.addEventListener("click", handleNumberClick));
}

init();