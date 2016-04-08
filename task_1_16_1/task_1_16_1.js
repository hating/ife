/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
 var city = document.getElementById("aqi-city-input").value ;
 var value = parseInt(document.getElementById("aqi-value-input").value);
 if (value <= 100 && value >= 0) {
   //判断条件是看value是否在0到100之间
    aqiData[city] = parseInt(value) ;
 } else {
   alert("输入的空气质量指数有误！");
 }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var aqi_table = document.getElementById("aqi-table");
  //清空现有表格
  while(aqi_table.hasChildNodes()){
    aqi_table.removeChild(aqi_table.firstChild);
  }
  //生成节点
  var tr_node0 = document.createElement("tr");
  tr_node0.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
  aqi_table.appendChild(tr_node0);
  for(aqi_item in aqiData){
    var tr_node = document.createElement("tr");
    var td_node1 = document.createElement("td");
    td_node1.innerHTML = aqi_item;
    var td_node2 = document.createElement("td");
    td_node2.innerHTML = aqiData[aqi_item];
    var td_node3 = document.createElement("td");
    td_node3.innerHTML = "删除";
    td_node3.onclick = delBtnHandle;
    tr_node.appendChild(td_node1);
    tr_node.appendChild(td_node2);
    tr_node.appendChild(td_node3);
    aqi_table.appendChild(tr_node);
    console.log(tr_node);
  }

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  //通过window.event获得点击事件，再获得该元素的父节点的第一个儿子节点的HTML内容，再删除
  console.log((window.event.srcElement).parentNode.firstChild.innerHTML);
  delete aqiData[(window.event.srcElement).parentNode.firstChild.innerHTML];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var add_btn = document.getElementById("add-btn");
  add_btn.onclick = function () {
   addBtnHandle();
  };
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  
 //删除按钮的实现在插入节点的时候完成比较好
}

init();
