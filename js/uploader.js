// make dataset globally available
var dz;
var GLOBAL_SPEED = 2500
var GLOBAL_BARS = 50

// load dataset and create table
function load_dataset(csv) {
  var data = d3.csvParse(csv)
  // create_table(data);
  // console.log(GLOBAL_BARS, data.length)
  if(92-GLOBAL_BARS > data.length){
    d3.select("#warning").style("display", "block")
    d3.select("#s1").text(92-GLOBAL_BARS + 1)
    d3.select("#s2").text(92-data.length)
  }else{
    d3.select("#instructions").style("display","none")
    d3.select("#refreshNote").style("display","block")
    d3.select("#lineChart").style("display","block")
    drawIntro(data, GLOBAL_SPEED, 92-GLOBAL_BARS)  
  }
  
}

var updateSpeed = function(speed){
  document.querySelector('#speedVal').value = (9000-speed)/1000
  GLOBAL_SPEED = 9000-speed
}


var updateBars = function(bars){
  document.querySelector('#barsVal').value = bars
  GLOBAL_BARS = bars
}

// create a table with column headers, types, and data
function create_table(data) {
  // table stats
  var keys = d3.keys(data[0]);

  var stats = d3.select("#stats")
    .html("")

  stats.append("div")
    .text("Columns: " + keys.length)

  stats.append("div")
    .text("Rows: " + data.length)

  d3.select("#table")
    .html("")
    .append("tr")
    .attr("class","fixed")
    .selectAll("th")
    .data(keys)
    .enter().append("th")
      .text(function(d) { return d; });

  d3.select("#table")
    .selectAll("tr.row")
      .data(data)
    .enter().append("tr")
      .attr("class", "row")
      .selectAll("td")
      .data(function(d) { return keys.map(function(key) { return d[key] }) ; })
      .enter().append("td")
        .text(function(d) { return d; });
}

// handle upload button
function upload_button(el, callback) {
  var uploader = document.getElementById(el);  
  var reader = new FileReader();

  reader.onload = function(e) {
    var contents = e.target.result;
    callback(contents);
  };

  uploader.addEventListener("change", handleFiles, false);  

  function handleFiles() {
    // d3.select("#table").text("loading...");
    var file = this.files[0];
    reader.readAsText(file);
  };
};