var bfs_btn = document.getElementsByClassName("bfs")[0];
var dfs_btn = document.getElementsByClassName("dfs")[0];
var search_input = document.getElementsByClassName("search-input")[0];
var search_btn = document.getElementsByClassName("search")[0];
var view = document.getElementsByClassName("view")[0];
var animate_list = [];

function animate_reset(){
    for (animate_list_cnt in animate_list){
      animate_list[animate_list_cnt].style.background = "#fff";
    }
    animate_list = [];
}
function animate() {
  function animate_frame() {
    if (frame < animate_list.length){
      animate_list[frame].style.background = "#abc";
      frame++;
    } else {
      animate_reset();
      clearInterval(timer);
    }
  }
  var frame = 0;
  var timer = setInterval(animate_frame,100);
}
function BFS(){
  console.log("BFS");
  var queue =[];
  queue.unshift(view.firstElementChild);
  var currentNode = queue.shift();
  while (currentNode){
    for (var i=0,length = currentNode.childNodes.length;i<length;i++){
      if (currentNode.childNodes[i].tagName == "DIV"){
        queue.push(currentNode.childNodes[i]);
      }
    }
    animate_list.push(currentNode);
    currentNode= queue.shift();
  }
  animate();
}
function DFS(){
  console.log("DFS");
  (function dfs_traversal(currentNode){
    for(var i=0,length = currentNode.childNodes.length;i<length;i++){
      if (currentNode.childNodes[i].tagName == "DIV"){
        dfs_traversal(currentNode.childNodes[i]);
      }
    }
    animate_list.push(currentNode);
  })(view.firstElementChild);
  console.log(animate_list);
  animate();
}
function search(){
  console.log(search_input.value);
  var queue =[];
  queue.unshift(view.firstElementChild);
  var currentNode = queue.shift();
  while (currentNode){
    for (var i=0,length = currentNode.childNodes.length;i<length;i++){
      if (currentNode.childNodes[i].tagName == "DIV"){
        queue.push(currentNode.childNodes[i]);
      }
    }
    if(currentNode.firstElementChild.innerHTML.match(search_input.value) != null){
      animate_list.push(currentNode);
    }
    currentNode= queue.shift();
  }
  animate();
  console.log(animate_list);
}
function init(){
  bfs_btn.addEventListener("click",BFS);
  dfs_btn.addEventListener("click",DFS);
  search_btn.addEventListener("click",search);
}
init();
