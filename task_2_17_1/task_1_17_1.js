/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var aqi_chart_wrap = document.getElementsByClassName("aqi-chart-wrap")[0];
  while (aqi_chart_wrap.hasChildNodes()){
    aqi_chart_wrap.removeChild(aqi_chart_wrap.firstChild);
  }
  for(little_content in chartData[pageState["nowSelectCity"]][pageState["nowGraTime"]]){
    var little_div = document.createElement("div");
    if (pageState["nowGraTime"] == "day"){
      little_div.style.width = "4px";
    } else if (pageState["nowGraTime"] == "week"){
      little_div.style.width = "20px";
    } else{
      little_div.style.width = "30px";
    }
    little_div.style.height = chartData[pageState["nowSelectCity"]][pageState["nowGraTime"]][little_content].value+"px";
    little_div.title = chartData[pageState["nowSelectCity"]][pageState["nowGraTime"]][little_content].date;
    if (chartData[pageState["nowSelectCity"]][pageState["nowGraTime"]][little_content].value > 400){
      little_div.style.background = "#000";
    } else if (chartData[pageState["nowSelectCity"]][pageState["nowGraTime"]][little_content].value >300){
      little_div.style.background = "#808";
    } else if (chartData[pageState["nowSelectCity"]][pageState["nowGraTime"]][little_content].value >200){
      little_div.style.background = "#f00";
    } else if (chartData[pageState["nowSelectCity"]][pageState["nowGraTime"]][little_content].value >100){
      little_div.style.background = "#00f";
    } else {
      little_div.style.background = "#0f0";
    }
    aqi_chart_wrap.appendChild(little_div);
  }
  aqi_chart_wrap.style.background = "#ccc";

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  var nowGraTime = window.event.srcElement.value;
  if (nowGraTime != pageState["nowGraTime"] && nowGraTime != undefined){
    pageState["nowGraTime"] = nowGraTime;
    console.log(nowGraTime);
  }
  // 设置对应数据

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  var nowSelectCity = window.event.srcElement.value;
  if (nowSelectCity != pageState["nowSelectCity"] && pageState != undefined){
    pageState["nowSelectCity"] = nowSelectCity;
    console.log(pageState);
  }
  // 设置对应数据

  // 调用图表渲染函数
  renderChart()
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
 var gra_time = document.getElementById("form-gra-time");
 gra_time.onclick = graTimeChange;

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  city_select = document.getElementById("city-select");
  while (city_select.hasChildNodes()){
    city_select.removeChild(city_select.firstChild);
  }
  for (aqi_item in aqiSourceData) {
    var city_select_option = document.createElement("option");
    city_select_option.innerHTML = aqi_item;
    city_select.appendChild(city_select_option);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  city_select.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for(aqiSourceData_item in aqiSourceData){
    chartData[aqiSourceData_item] = {};
    chartData[aqiSourceData_item]["day"] = {};
    var i =0;
    for (aqiSourceData_item_item in aqiSourceData[aqiSourceData_item]) {
      chartData[aqiSourceData_item]["day"][i] = {};
      chartData[aqiSourceData_item]["day"][i]["value"] = aqiSourceData[aqiSourceData_item][aqiSourceData_item_item];
      chartData[aqiSourceData_item]["day"][i]["date"] = aqiSourceData_item_item;
      i++;
//      console.log(aqiSourceData_item_item);
//      console.log(aqiSourceData[aqiSourceData_item][aqiSourceData_item_item]);
    }
    chartData[aqiSourceData_item]["week"] = {};
    i =0;
    var cnt = 0;
    var weekSum = 0;
    for (aqiSourceData_item_item in aqiSourceData[aqiSourceData_item]) {
      weekSum+= aqiSourceData[aqiSourceData_item][aqiSourceData_item_item];
      cnt++;
      if (cnt%7 == 0){
        chartData[aqiSourceData_item]["week"][i] = {};
        chartData[aqiSourceData_item]["week"][i]["value"] = weekSum/7;
        chartData[aqiSourceData_item]["week"][i]["date"] = aqiSourceData_item_item;
        i++;
        weekSum =0;
      }
    }
    if (cnt%7 != 0){
      chartData[aqiSourceData_item]["week"][i] = {};
      chartData[aqiSourceData_item]["week"][i]["value"] = weekSum/(cnt%7);
      chartData[aqiSourceData_item]["week"][i]["date"] = aqiSourceData_item_item;
    }
    chartData[aqiSourceData_item]["month"] = {};
    i = 0;
    var monthSum = 0;
    var dateDiv = 0;
    for (aqiSourceData_item_item in aqiSourceData[aqiSourceData_item]){
      monthSum+= aqiSourceData[aqiSourceData_item][aqiSourceData_item_item];
      if (new Date(aqiSourceData_item_item).getMonth() == i){
        dateDiv = new Date(aqiSourceData_item_item);
      }
//      console.log(new Date(aqiSourceData_item_item).getMonth());
      if (new Date(aqiSourceData_item_item).getMonth() >i){
        chartData[aqiSourceData_item]["month"][i] = {};
        chartData[aqiSourceData_item]["month"][i]["value"] = w=monthSum/dateDiv.getDate();
        console.log(monthSum);
        chartData[aqiSourceData_item]["month"][i]["date"] = aqiSourceData_item_item;
        i++;
        monthSum =0;
      }
    }
    if (monthSum!=0) {
      chartData[aqiSourceData_item]["month"][i] = {};
      chartData[aqiSourceData_item]["month"][i]["value"] = monthSum/dateDiv.getDate();
      chartData[aqiSourceData_item]["month"][i]["date"] = aqiSourceData_item_item;
    }
  }
  console.log(chartData);
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}
init();
