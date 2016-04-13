/*
因为在后面很多函数都会用到这些元素，干脆直接提取出来了
*/
var inputbox = document.getElementsByClassName("inputbox")[0];
var left_input = document.getElementsByClassName("left-input")[0];
var right_input = document.getElementsByClassName("right-input")[0];
var left_out = document.getElementsByClassName("left-out")[0];
var right_out = document.getElementsByClassName("right-out")[0];
var view = document.getElementsByClassName("view")[0];
var sort_btn = document.getElementsByClassName("sort")[0];
var current_data = document.getElementsByClassName("current-data")[0];
var data = [10,90,20,80,30,40,80,60];
/*
#269228 被选中的颜色
#2ddffa 比较的颜色
*/
function currentData(){
  data = [10,90,20,80,30,40,80,60,65,21,46,12,97,35,46,95,23];
  render();
}
// 参考共产主义的前端接班人sort代码
function sort(){
  var i = 0;
  var j = 1;
  var len = data.length;
  var timer = setInterval(run,60);
  function run() {
    if (i < len) {
      if (j < len) {
        if (data[i] > data[j]) {
          var temp = data[i];
          data[i] = data[j];
          data[j] = temp;
          render();
        }
        j++;
      } else {
        i++;
        j = i + 1;
      }
    } else {
      clearInterval(timer);
      return;
    }
  }
}
function render(){
  while (view.hasChildNodes()){
    view.removeChild(view.firstChild);
  }
  for (data_item in data){
    var num_box = document.createElement("div");
    num_box.style.height = data[data_item]+"px";
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
  if(data.length > 60){
    alert("Too many numbers!");
  }
  else if (!isNaN(parseInt(inputbox.value)) && inputbox.value <=100 && inputbox.value >=10) {
    data.unshift(parseInt(inputbox.value));
    render();
  } else {
    alert("You must input number that is between 10 to 100!");
  }
  inputbox.value = "";
}
function rightInput(){
  if(data.length > 60){
    alert("Too many numbers!");
  }
  else if (!isNaN(parseInt(inputbox.value))  && inputbox.value <=100 && inputbox.value >=10) {
    data.push(parseInt(inputbox.value));
    render();
  } else {
    alert("You must input number that is between 10 to 100!");
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
  left_input.addEventListener("click",leftInput);
  right_input.addEventListener("click",rightInput);
  left_out.addEventListener("click",leftOut);
  right_out.addEventListener("click",rightOut);
  sort_btn.addEventListener("click",sort);
  current_data.addEventListener("click",currentData);
}
/*
从前面的任务学到的架构，事件响应应该放在init里面
*/
function init(){
  bind();

}
 init();
