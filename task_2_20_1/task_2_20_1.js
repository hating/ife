/*
因为在后面很多函数都会用到这些元素，干脆直接提取出来了
*/
var inputbox = document.getElementsByClassName("inputbox")[0];
var left_input = document.getElementsByClassName("left-input")[0];
var right_input = document.getElementsByClassName("right-input")[0];
var left_out = document.getElementsByClassName("left-out")[0];
var right_out = document.getElementsByClassName("right-out")[0];
var view = document.getElementsByClassName("view")[0];
var search = document.getElementsByClassName("search")[0];
var search_input = document.getElementsByClassName("search-input")[0];
var data = [];
var patt = new RegExp("[,，、   \n]");
function searchItem(){
  for(data_item in data){
    if(data[data_item].match(search_input.value)){
      console.log(data[data_item]);
      view.childNodes[data_item].style.background ="#abc";
    }
  }
  var delay = setTimeout(render,5000);
}

function render(){
  while (view.hasChildNodes()){
    view.removeChild(view.firstChild);
  }
  for (data_item in data){
    var num_box = document.createElement("div");
    num_box.innerHTML = data[data_item];
    num_box.className = data_item;
    num_box.style.background = "red";
    num_box.addEventListener("click",clickDel);
    view.appendChild(num_box);
  }
  console.log(data);
}
function clickDel() {
  console.log(window.event.srcElement.className);
  data.splice(window.event.srcElement.className,1);
  render();
}
function leftInput(){
  var fragment = inputbox.value.split(patt);
  for (fragment_item in fragment){
    data.unshift(fragment[fragment_item]);
  }
  render();
  inputbox.value = "";
}
function rightInput(){
  var fragment = inputbox.value.split(patt);
  for (fragment_item in fragment){
    data.push(fragment[fragment_item]);
  }
  render();
  inputbox.value = "";
}
function leftOut(){
  data.shift();
  render();
}
function rightOut(){
  data.pop();
  render();
}
function bind(){
/*
  console.log(inputbox);
  console.log(left_input);
  console.log(right_input);
  console.log(left_out);
  console.log(right_out);
*/
  left_input.addEventListener("click",leftInput);
  right_input.addEventListener("click",rightInput);
  left_out.addEventListener("click",leftOut);
  right_out.addEventListener("click",rightOut);
  search.addEventListener("click",searchItem);
}
/*
从前面的任务学到的架构，事件响应应该放在init里面
*/
function init(){
  bind();

}
init();
