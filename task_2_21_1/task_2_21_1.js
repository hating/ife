var tag_input = document.getElementsByClassName("tag-input")[0];
var tag_submit = document.getElementsByClassName("tag-submit")[0];
var hobby_input = document.getElementsByClassName("hobby-input")[0];
var hobby_submit = document.getElementsByClassName("hobby-submit")[0];
var tag_view = document.getElementsByClassName("tag-view")[0];
var hobby_view = document.getElementsByClassName("hobby-view")[0];
var tag_data =[];
var hobby_data =[];
var patt = new RegExp("[,，、   \n]");
function delTag (){
  var node = window.event.srcElement ;
  for(tag_data_cnt in tag_data){
    if (node.innerHTML.match(tag_data[tag_data_cnt]) ){
      tag_data.splice(tag_data_cnt,1);
    }
  }
  tag_render();
}
function confirmDelete(){
  var node = window.event.srcElement ;
  node.style.background = "#ff0709";
  node.innerHTML = "点击删除  "+node.innerHTML;
  node.addEventListener("click",delTag);
}
function tag_render(){
  while(tag_view.hasChildNodes()){
    tag_view.removeChild(tag_view.firstChild);
  }
  console.log(tag_data);
  for (tag_data_cnt in tag_data){
    var view_node = document.createElement("div");
    view_node.innerHTML = tag_data[tag_data_cnt];
    view_node.addEventListener("mouseover",confirmDelete);
    view_node.addEventListener("mouseout",tag_render);
    tag_view.appendChild(view_node);
  }
}
function tagInput(){
  var fragment = tag_input.value.split(patt);
  for (fragment_cnt in fragment){
    if (fragment[fragment_cnt] == ""){
      continue ;
    }
    if (tag_data.length != 0){
      var isExist = false ;
      for (tag_data_cnt in tag_data){
        if (tag_data[tag_data_cnt] == fragment[fragment_cnt]){
          isExist = true ;
        }
      }
      if (isExist == false ){
        if (tag_data.length >= 10){
          tag_data.pop();
        }
        tag_data.unshift(fragment[fragment_cnt]);
      }
    } else {
      tag_data.unshift(fragment[fragment_cnt]);
    }
  }
  tag_input.value = "";
  tag_render();
}
function hobby_render(){
  while(hobby_view.hasChildNodes()){
    hobby_view.removeChild(hobby_view.firstChild);
  }
  console.log(hobby_data);
  for (hobby_data_cnt in hobby_data){
    var view_node = document.createElement("div");
    view_node.innerHTML = hobby_data[hobby_data_cnt];
    hobby_view.appendChild(view_node);
  }
}
function hobbyInput(){
  var fragment = hobby_input.value.split(patt);
  for (fragment_cnt in fragment){
    if (fragment[fragment_cnt] == ""){
      continue ;
    }
    if (hobby_data.length != 0){
      var isExist = false ;
      for (hobby_data_cnt in hobby_data){
        if (hobby_data[hobby_data_cnt] == fragment[fragment_cnt]){
          isExist = true ;
        }
      }
      if (isExist == false ){
        if (hobby_data.length >= 10){
          hobby_data.pop();
        }
        hobby_data.unshift(fragment[fragment_cnt]);
      }
    } else {
      hobby_data.unshift(fragment[fragment_cnt]);
    }
  }
  hobby_input.value = "";
  hobby_render();
}
function bind(){
  tag_submit.addEventListener("click",tagInput);
  hobby_submit.addEventListener("click",hobbyInput);
}
function init(){
  bind();
}
init();
