const title = document.querySelector("#title");

const CLICKED_CLASS = "clicked"

function handleClick(){
  const hasClass = title.classList.toggle(CLICKED_CLASS)
}

function init(){
title.addEventListener("click",handleClick);
}
init();