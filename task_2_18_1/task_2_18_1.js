/*
因为在后面很多函数都会用到这些元素，干脆直接提取出来了
*/
var inputbox = document.getElementsByClassName("inputbox")[0];
var left_input = document.getElementsByClassName("left-input")[0];
var right_input = document.getElementsByClassName("right-input")[0];
var left_out = document.getElementsByClassName("left-out")[0];
var right_out = document.getElementsByClassName("right-out")[0];
var view = document.getElementsByClassName("view")[0]
var data = [];
function render(){
  while (view.hasChildNodes()){
    view.removeChild(view.firstChild);
  }
  for (data_item in data){
    var num_box = document.createElement("div");
    num_box.innerHTML = data[data_item];
    num_box.className = data_item;
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
  if (!isNaN(parseInt(inputbox.value))) {
    data.unshift(parseInt(inputbox.value));
    render();
  } else {
    alert("Not A Number!")
  }
  inputbox.value = "";
}
function rightInput(){
  if (!isNaN(parseInt(inputbox.value))) {
    data.push(parseInt(inputbox.value));
    render();
  } else {
    alert("Not A Number!")
  }
  inputbox.value = "";
}
function leftOut(){
  data.shift(inputbox.value);
  render();
}
function rightOut(){
  data.pop(inputbox.value);
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

}
/*
从前面的任务学到的架构，事件响应应该放在init里面
*/
function init(){
  bind();

}
init();
