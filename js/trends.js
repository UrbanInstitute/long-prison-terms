/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function() {
  var pageSize;
  if(IS_PHONE()){
    pageSize = "small"
  }
  else if(IS_TABLET()){
    pageSize = "medium"
  }else{
    pageSize = "large"
  }
  var mapSizes = {
    "large": { "width": 750, "height": 600, "scale": 3100, "translate": [300,200], "chartWidth": 62, "chartMargin": 5},
    "medium": { "width": 750*.666666, "height": 500, "scale": 3100*.666666, "translate": [300*.666666,200*.666666], "chartWidth": 62*.666666, "chartMargin": 5*.666666},
    "small": { "width": 750*.42666, "height": 500, "scale": 3100*.42666, "translate": [300*.42666,200*.42666], "chartWidth": 62*.42666, "chartMargin": 5*.42666}
  }

  var mapMargins = {
    "large": {top: 30, right: 20, bottom: 30, left: 50},
    "medium": {top: 30, right: 20, bottom: 30, left: 50},
    "small": {top: 30, right: 20, bottom: 30, left: 20}
  } 
  var mapMargin = mapMargins[pageSize]
    mapWidth = mapSizes[pageSize]["width"] - mapMargin.left - mapMargin.right,
    mapHeight = mapSizes[pageSize]["height"] - mapMargin.top - mapMargin.bottom;

  // Keep track of which visualization
  // we are on and which was the last
  // index activated. When user scrolls
  // quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // sizing constants for intro track

  var mapSvg = null;
  // When scrolling to a new section
  // the activation function for that
  // section is called.
  var activateFunctions = [];
  // If a section has an update function
  // then it is called while scrolling
  // through the section with the current
  // progress through the section.
  var updateFunctions = [];
  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function(selection) {
    selection.each(function(rawData) {
      // create svg and give it a width and height

      mapSvg = d3.select("#vis")
        .append("svg")
            .attr("width", mapWidth + mapMargin.left + mapMargin.right)
            .attr("height", mapHeight + mapMargin.top + mapMargin.bottom)
        .append("g")
            .attr("transform", 
                  "translate(" + mapMargin.left + "," + mapMargin.top + ")");

      var chartWidth = mapSizes[pageSize]["chartWidth"]
      var chartMargin = mapSizes[pageSize]["chartMargin"]

  
      var defs = mapSvg.append("defs");
      var filterLeft = defs.append("filter")
        .attr("id", "drop-shadow-left")
        .attr("height", "130%");
      filterLeft.append("feGaussianBlur")
          .attr("in", "SourceAlpha")
          .attr("stdDeviation", 5)
      filterLeft.append("feOffset")
          .attr("dx", -5)
          .attr("dy", 5)
      filterLeft.append("feComponentTransfer")
          .append("feFuncA")
          .attr("type", "linear")
          .attr("slope",.2)

      var feMergeLeft = filterLeft.append("feMerge");

      feMergeLeft.append("feMergeNode")
      feMergeLeft.append("feMergeNode")
          .attr("in", "SourceGraphic");

      var filterRight = defs.append("filter")
        .attr("id", "drop-shadow-right")
        .attr("height", "130%");
      filterRight.append("feGaussianBlur")
          .attr("in", "SourceAlpha")
          .attr("stdDeviation", 5)
      filterRight.append("feOffset")
          .attr("dx", 5)
          .attr("dy", 5)
      filterRight.append("feComponentTransfer")
          .append("feFuncA")
          .attr("type", "linear")
          .attr("slope",.2)

      var feMergeRight = filterRight.append("feMerge");

      feMergeRight.append("feMergeNode")
      feMergeRight.append("feMergeNode")
          .attr("in", "SourceGraphic");


      var filterBoth = defs.append("filter")
        .attr("id", "drop-shadow-both")
        .attr("height", "160%");
      filterBoth.append("feGaussianBlur")
          .attr("in", "SourceAlpha")
          .attr("stdDeviation", 5)
      filterBoth.append("feOffset")
          .attr("dx", 2)
          .attr("dy", 2)
      filterBoth.append("feComponentTransfer")
          .append("feFuncA")
          .attr("type", "linear")
          .attr("slope",.6)

      var feMergeBoth = filterBoth.append("feMerge");

      feMergeBoth.append("feMergeNode")
      feMergeBoth.append("feMergeNode")
          .attr("in", "SourceGraphic");




      // perform some preprocessing on raw data
      var trendsData = rawData[0]
      mapSvg.data([trendsData])
      setupVis(trendsData);

      setupSections();

    });
  };


  var NUMERIC = d3.format(".1f")
  var PERCENT = d3.format(".1%")
  var PEOPLE = d3.format(",.0f")
  function selectState(obj, d, action){
    d.values = d.values.filter(function(o){ return parseInt(o.Year) >= 2000})
    var scalar = (IS_TABLET()) ? 1.2 : 1
    var chartWidth = mapSizes["large"]["chartWidth"] * scalar
    var chartMargin = mapSizes["large"]["chartMargin"] * scalar
    
    var state = d.values[0]["State"]

    var ttX,
        ttY,
        filter;
    if(action == "click"){
      ttX = 0;
      ttY = 0;
      filter = "url(#drop-shadow-both)"
    }
    else if(state == "ME" || state == "NH" || state == "RI" || state == "MA" || state == "DE" || state == "NY" || state == "NJ" || state == "MD" || state == "DC" || state == "FL" ){
      if(activeIndex == 1 ){ ttX = -1*(chartWidth *2)  -2 }
      else if(activeIndex == 3 || activeIndex == 2){ ttX = -1*(chartWidth *3)  -2 }
      else if(activeIndex == 4){ ttX = -1*(chartWidth *2.5)  -2 }
      else{ ttX = -1*(chartWidth *2.7) -2 } 
      filter = "url(#drop-shadow-left)"
    }else{
      ttX = chartMargin -2
      filter = "url(#drop-shadow-right)"
    }
    if(state == "CA" || state == "UT" || state == "CO" || state == "NE" || state == "MO" || state == "KY" || state == "WV" || state == "MD" || state == "DE" || state == "AZ" ||  state == "NM" || state == "KS" || state == "TN" || state == "NC" || state == "SC" || state == "DC" || state == "OK" || state == "MS" || state == "AL" || state == "GA" || state == "TX" || state == "FL"){
      // ttY = -1*(chartWidth *4)  -2
      if(activeIndex == 1 ){ ttY = -1*(chartWidth *3)  -2 }
      else if(activeIndex == 3 || activeIndex == 2){ ttY = -1*(chartWidth *4)  -2 }
      else if(activeIndex == 4){ ttY = -1*(chartWidth *2.5)  -2 }
      else{ ttY = -1*(chartWidth *3.7) -2 } 
    }else{
      ttY = chartMargin + chartWidth-3;
    }

    var tt;
    var ttWidth;
    if (activeIndex == 1) { ttWidth = chartWidth *3 }
    else if (activeIndex == 2) { ttWidth = chartWidth *4 }
    else if (activeIndex == 3) { ttWidth = chartWidth *4 }
    else if (activeIndex == 4) { ttWidth = chartWidth *3.5 }
    else if (activeIndex == 5) { ttWidth = chartWidth *3.7 }
    ttWidth = ttWidth/scalar

    var ttHeight;
    if (activeIndex == 1) { ttHeight = chartWidth *3 }
    else if (activeIndex == 2) { ttHeight = chartWidth *4 }
    else if (activeIndex == 3) { ttHeight = chartWidth *4 }
    else if (activeIndex == 4) { ttHeight = chartWidth *2.5 }
    else if (activeIndex == 5) { ttHeight = chartWidth *3.7 }



    if(action == "hover"){
      tt = mapSvg.append("g")
        .attr("transform", d3.select(obj).attr("transform") + " translate(" + (ttX) + " , " + (ttY) + ")")
        .attr("id", "mapTooltip")
    }
    else if(action == "click"){
      if(IS_PHONE()){
        tt = mapSvg.append("g")
          // .attr("transform", d3.select(obj).attr("transform") + " translate(0,0)")
          .attr("id", "mapTooltip") 
      }else{
        var w;
        tt = mapSvg.append("g")
          .style("transform", "translate("  +  (mapWidth + 18 -ttWidth)*.5 + "px," + (mapHeight - 50 - ttHeight)*.5 + "px)")
          .attr("id", "mapTooltip");
      }
    }



    // var keys = [null, "LOS_Mean",""]
    if(activeIndex == 1){
      tt.append("rect")
        .attr("width", ttWidth)
        .attr("height", ttHeight)
        .style("fill","#fff")
        .style("filter",filter)

      tt.append("text")
        .attr("class","tt-statename")
        .attr("x",(15)*scalar)
        .attr("y",(25)*scalar)
        .text(STATE_NAMES[d.key])

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45)*scalar)
        .text(d.values[0]["Year"] + " time served")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15)*scalar)
        .text(NUMERIC(d.values[0]["LOS_Mean"]) + " years")
      
      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*2.5)*scalar)
        .text(d.values[d.values.length - 1]["Year"] + " time served")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*3.5)*scalar)
        .text(NUMERIC(d.values[d.values.length - 1]["LOS_Mean"]) + " years")

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*5)*scalar)
        .text("Absolute change")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*6)*scalar)
        .text(NUMERIC(d.values[d.values.length - 1]["LOS_Mean"] - d.values[0]["LOS_Mean"]) + " years")

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*7.5)*scalar)
        .text("Percent change")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*8.5)*scalar)
        .text(function(){
          var change = d.values[d.values.length - 1]["LOS_Mean"] - d.values[0]["LOS_Mean"];
          var percent = change/ d.values[0]["LOS_Mean"];
          var changeWord = (percent < 0) ? "decrease" : "increase";

          return PERCENT(Math.abs(percent)) + " " + changeWord;
        })
    }
    else if(activeIndex == 2){
      tt.append("rect")
        .attr("width", ttWidth)
        .attr("height", ttHeight)
        .style("fill","#fff")
        .style("filter",filter)
      
      tt.append("text")
        .attr("class","tt-statename")
        .attr("x",(15)*scalar)
        .attr("y",(25)*scalar)
        .text(STATE_NAMES[d.key])

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45)*scalar)
        .text(d.values[0]["Year"] + " time served")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15)*scalar)
        .text("Violent: " + NUMERIC(d.values[0]["LOS_MeanViolent"]) + " years")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*2)*scalar)
        .text("All except violent: " + NUMERIC(d.values[0]["LOS_MeanAllExceptViol"]) + " years")

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*3.5)*scalar)
        .text(d.values[d.values.length - 1]["Year"] + " time served")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*4.5)*scalar)
        .text("Violent: " + NUMERIC(d.values[d.values.length - 1]["LOS_MeanViolent"]) + " years")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*5.5)*scalar)
        .text("All except violent: " + NUMERIC(d.values[d.values.length - 1]["LOS_MeanAllExceptViol"]) + " years")

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*7)*scalar)
        .text("Absolute change")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*8)*scalar)
        .text("Violent: " + NUMERIC(d.values[d.values.length - 1]["LOS_MeanViolent"] - d.values[0]["LOS_MeanViolent"]) + " years")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*9)*scalar)
        .text("All except violent: " + NUMERIC(d.values[d.values.length - 1]["LOS_MeanAllExceptViol"] - d.values[0]["LOS_MeanAllExceptViol"]) + " years")

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*10.5)*scalar)
        .text("Percent change")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*11.5)*scalar)
        .text(function(){
          var change = d.values[d.values.length - 1]["LOS_MeanViolent"] - d.values[0]["LOS_MeanViolent"];
          var percent = change/ d.values[0]["LOS_MeanViolent"];
          var changeWord = (percent < 0) ? "decrease" : "increase";

          return "Violent: " + PERCENT(Math.abs(percent)) + " " + changeWord;
        })
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*12.5)*scalar)
        .text(function(){
          var change = d.values[d.values.length - 1]["LOS_MeanAllExceptViol"] - d.values[0]["LOS_MeanAllExceptViol"];
          var percent = change/ d.values[0]["LOS_MeanViolent"];
          var changeWord = (percent < 0) ? "decrease" : "increase";

          return "All except violent: " + PERCENT(Math.abs(percent)) + " " + changeWord;
        })

    }
    else if(activeIndex == 3){
      tt.append("rect")
        .attr("width", ttWidth)
        .attr("height", ttHeight)
        .style("fill","#fff")
        .style("filter",filter)

      tt.append("text")
        .attr("class","tt-statename")
        .attr("x",(15)*scalar)
        .attr("y",(25)*scalar)
        .text(STATE_NAMES[d.key])

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45)*scalar)
        .text(d.values[0]["Year"] + " time served")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15)*scalar)
        .text("Top 10%: " + NUMERIC(d.values[0]["LOS_MeanTop10"]) + " years")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*2)*scalar)
        .text("Bottom 90%: " + NUMERIC(d.values[0]["LOS_MeanBottom90"]) + " years")

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*3.5)*scalar)
        .text(d.values[d.values.length - 1]["Year"] + " time served")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*4.5)*scalar)
        .text("Top 10%: " + NUMERIC(d.values[d.values.length - 1]["LOS_MeanTop10"]) + " years")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*5.5)*scalar)
        .text("Bottom 90%: " + NUMERIC(d.values[d.values.length - 1]["LOS_MeanBottom90"]) + " years")

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*7)*scalar)
        .text("Absolute change")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*8)*scalar)
        .text("Top 10%: " + NUMERIC(d.values[d.values.length - 1]["LOS_MeanTop10"] - d.values[0]["LOS_MeanTop10"]) + " years")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*9)*scalar)
        .text("Bottom 90%: " + NUMERIC(d.values[d.values.length - 1]["LOS_MeanBottom90"] - d.values[0]["LOS_MeanBottom90"]) + " years")

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*10.5)*scalar)
        .text("Percent change")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*11.5)*scalar)
        .text(function(){
          var change = d.values[d.values.length - 1]["LOS_MeanTop10"] - d.values[0]["LOS_MeanTop10"];
          var percent = change/ d.values[0]["LOS_MeanTop10"];
          var changeWord = (percent < 0) ? "decrease" : "increase";

          return "Top 10%: " + PERCENT(Math.abs(percent)) + " " + changeWord;
        })
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*12.5)*scalar)
        .text(function(){
          var change = d.values[d.values.length - 1]["LOS_MeanBottom90"] - d.values[0]["LOS_MeanBottom90"];
          var percent = change/ d.values[0]["LOS_MeanTop10"];
          var changeWord = (percent < 0) ? "decrease" : "increase";

          return "Bottom 90%: " + PERCENT(Math.abs(percent)) + " " + changeWord;
        })
    }
    else if(activeIndex == 4){
      tt.append("rect")
        .attr("width", ttWidth)
        .attr("height", ttHeight)
        .style("fill","#fff")
        .style("filter",filter)

      tt.append("text")
        .attr("class","tt-statename")
        .attr("x",(15)*scalar)
        .attr("y",(25)*scalar)
        .text(STATE_NAMES[d.key])

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45)*scalar)
        .text(d.values[0]["Year"] + " share of population")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15)*scalar)
        .text(PERCENT(d.values[0]["LOS_10plus_Pct"]/100))
      
      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*2.5)*scalar)
        .text(d.values[d.values.length - 1]["Year"] + " share of population")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*3.5)*scalar)
        .text(PERCENT(d.values[d.values.length - 1]["LOS_10plus_Pct"]/100))

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*5)*scalar)
        .text("Absolute change")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*6)*scalar)
        .text(NUMERIC(d.values[d.values.length - 1]["LOS_10plus_Pct"] - d.values[0]["LOS_10plus_Pct"]) + " percentage points")
    }
    else if(activeIndex == 5){
      tt.append("rect")
        .attr("width", ttWidth)
        .attr("height", ttHeight)
        .style("fill","#fff")
        .style("filter",filter)

      tt.append("text")
        .attr("class","tt-statename")
        .attr("x",(15)*scalar)
        .attr("y",(25)*scalar)
        .text(STATE_NAMES[d.key])

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45)*scalar)
        .text("Y-axis maximum")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15)*scalar)
        .text(PEOPLE(Math.ceil(1.1* d3.max(d.values, function(d) { return d["LOS_10plus_Num"]; }))) + " people")

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*2.5)*scalar)
        .text(d.values[0]["Year"] + " population")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*3.5)*scalar)
        .text(PEOPLE(d.values[0]["LOS_10plus_Num"]) + " people")
      
      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*5)*scalar)
        .text(d.values[d.values.length - 1]["Year"] + " population")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*6)*scalar)
        .text(PEOPLE(d.values[d.values.length - 1]["LOS_10plus_Num"]) + " people")

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*7.5)*scalar)
        .text("Absolute change")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*8.5)*scalar)
        .text(PEOPLE(d.values[d.values.length - 1]["LOS_10plus_Num"] - d.values[0]["LOS_10plus_Num"]) + " people")

      tt.append("text")
        .attr("class","tt-header")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*10)*scalar)
        .text("Percent change")
      tt.append("text")
        .attr("class","tt-value")
        .attr("x",(15)*scalar)
        .attr("y",(45+15*11)*scalar)
        .text(function(){
          var change = d.values[d.values.length - 1]["LOS_10plus_Num"] - d.values[0]["LOS_10plus_Num"];
          var percent = change/ d.values[0]["LOS_10plus_Num"];
          var changeWord = (percent < 0) ? "decrease" : "increase";

          return PERCENT(Math.abs(percent)) + " " + changeWord;
        })
    }

    if(IS_TABLET()){
      tt.append("svg:image")
         .attr('x',ttWidth - 25)
         .attr('y',12)
         .attr('width', 13)
         .attr('height', 13)
         .attr("xlink:href","img/close-button.png")
         .on("click", function(){ deselectState()})
    }

    d3.select(obj)
      .selectAll("rect")
      .style("fill", "#fdbf11")
    d3.select(obj)
      .selectAll(".mapLable")
      .transition()
      .style("opacity",0)
  }
  function deselectState(){
    d3.select("#mapTooltip").remove()
    d3.selectAll(".state")
      .selectAll("rect")
      .style("fill", "#1696d2")
    d3.selectAll(".state")
      .selectAll(".mapLable")
      .transition()
      .style("opacity",1)
  }
  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   *
   * @param allData - data object for each word.
   * @param fillerCounts - nested data that includes
   *  element for each filler word type.
   * @param histData - binned histogram data
   */
  setupVis = function(trendsData) {
    //temp line

    //map
    trendsData = trendsData.filter(function(o){
    return +o.Year >= 2000
    })
    trendsData.forEach(function(d) {
      d.LOS_Mean = +d.LOS_Mean
      d.LOS_MeanViolent = +d.LOS_MeanViolent
      d.Year = +d.Year;
      d.LOS_10plus_Num =  +d.LOS_10plus_Num
      d.LOS_MeanAllExceptViol = +d.LOS_MeanAllExceptViol
      d.LOS_MeanTop10 = +d.LOS_MeanTop10
      d.LOS_10plus_Pct = +d.LOS_10plus_Pct
      d.LOS_10plus_Num = +d.LOS_10plus_Num
      d.LOS_MeanBottom90 = +d.LOS_MeanBottom90;
    });


  var trendsDataNest = d3.nest()
    .key(function(d) {return d.State;})
    .entries(trendsData);

  var tmpKeys = []
  for(var i = 0; i < trendsDataNest.length; i++){
    var obj = trendsDataNest[i]
    if(obj.hasOwnProperty("key")){
      tmpKeys.push(obj.key)
    }
  }





  var blankStateData = stateData.features.filter(function(o) { return tmpKeys.indexOf(o.properties.abbr) == -1})



        var projection = d3.geoEquirectangular()
        .scale(mapSizes[pageSize]["scale"])
        .center([-96.03542,41.69553])
        .translate(mapSizes[pageSize]["translate"]);

      var geoPath = d3.geoPath()
        .projection(projection);
  var chartWidth = mapSizes[pageSize]["chartWidth"]
  var chartMargin = mapSizes[pageSize]["chartMargin"]

  var infoR = 9;
  var infoX = -22;
  var infoY = 13;
  var info = mapSvg.append("g")
    .attr("id", "infoGroup")
    .attr("transform", "translate(" + infoX + "," + infoY  + ")")
    .style("opacity",0)
    .on("mouseover", function(){
      d3.selectAll(".explainer span").classed("active",true)
    })
    .on("mouseout", function(){
      d3.selectAll(".explainer span").classed("active",false)      
    })

  info.append("circle")
    .attr("r", infoR)
    .attr("cx",0)
    .attr("cy", 0)
    .style("fill","#fdbf11")

  info.append("text")
    .attr("x",-3)
    .attr("y",5)
    .text("i")


  var explainerX = 120;
  var explainerY = 38;

  var titleX = 40;
  var titleY = 0;

  var noteX = 40;
  var noteY = mapHeight;

  var legendX = explainerX;
  var legendY = 100;

  d3.select("#vis")
    .append("div")
    .attr("class","chartNote visElement")
    .style("position", "absolute")
    .style("top",noteY + "px")
    .style("left",noteX + "px")
    .html("States shown in gray did not report complete data.")

  var legend =   d3.select("#vis")
    .append("div")
    .attr("class","legendContainer legendContainerA visElement")
    .style("position", "absolute")
    .style("top",legendY + "px")
    .style("left",legendX + "px")

  legend.append("span")
    .attr("class", "legendKey alt")

  legend.append("div")
    .attr("class", "legendText")
    .html("Violent")

  legend.append("span")
    .attr("class", "legendKey")

  legend.append("div")
    .attr("class", "legendText")
    .html("All except violent")


  var legendB =   d3.select("#vis")
    .append("div")
    .attr("class","legendContainer legendContainerB")
    .style("position", "absolute")
    .style("top",legendY + "px")
    .style("left",legendX + "px")
    .style("opacity",0)

  legendB.append("span")
    .attr("class", "legendKey alt")

  legendB.append("div")
    .attr("class", "legendText")
    .html("Top 10%")

  legendB.append("span")
    .attr("class", "legendKey")

  legendB.append("div")
    .attr("class", "legendText")
    .html("Bottom 90%")




  d3.select("#vis")
    .append("div")
    .attr("class","chartTitle chartTitleA visElement")
    .style("position", "absolute")
    .style("top",titleY + "px")
    .style("left",titleX + "px")
    .html("Average time served for all offense categories")

  d3.select("#vis")
    .append("div")
    .attr("class","chartTitle chartTitleB visElement")
    .style("position", "absolute")
    .style("top",titleY + "px")
    .style("left",titleX + "px")
    .html("Average time served by offense type")
    .style("opacity",0)

  var actionWords = (IS_TABLET()) ? "Touch a" : "Hover on a"
  d3.select("#vis")
    .append("div")
    .attr("class","explainer explainerA visElement")
    .style("position", "absolute")
    .style("top",explainerY + "px")
    .style("left",explainerX + "px")
    .html("Data for all line charts on the same x- and y-axis scales.<br/>" + actionWords + " state for detailed data.")
  
  d3.select("#vis")
    .append("div")
    .attr("class","explainer explainerB visElement")
    .style("position", "absolute")
    .style("top",explainerY + "px")
    .style("left",explainerX + "px")
    .style("opacity",0)
    .html("<div id = \"expl1\">Data for all states on the same x-axis scale.</div><div id = \"expl2\"><span>Y-axis scales differ for each state.</span></div id = \"expl3\"><div>" + actionWords + " state for detailed data.</div>")


  var map = mapSvg
    .selectAll(".state")
    .data(trendsDataNest)
    .enter()
    .append("g")
    .attr("class","state")
        .attr("transform", function(d,i){
            var tmp = stateData.features.filter(function(o) { return o.properties.abbr == d.key} )
            return "translate(" + geoPath.centroid(tmp[0]) + ")"

        })
    .on("mouseover", function(d){
      if(IS_TABLET()){
        return false
      }else{
        selectState(this, d, "hover")
      }
    })
    .on("mouseout", function(d){
      if(IS_TABLET()){
        return false;
      }else{
        deselectState()
      }
    })
    .on("click", function(d){
      if(IS_TABLET()){
        deselectState()
        selectState(this, d, "click")
      }else{
        return false;
      }
    })
    var blank = mapSvg
    .selectAll(".blank")
    .data(blankStateData)
    .enter()
    .append("g")
    .attr("class","blank")
        .attr("transform", function(d,i){
            // var tmp = stateData.features.filter(function(o) { return o.properties.abbr == d.key} )
            return "translate(" + geoPath.centroid(d) + ")"

        })

    blank.append("rect")
      .attr("width",chartWidth-2*chartMargin + 2)
      .attr("height",chartWidth-2*chartMargin + 2)
      .attr("x",chartMargin )
      .attr("y",chartMargin -1)
      .style("fill","#b3b3b3") 

    map.append("rect")
      .attr("width",chartWidth-2*chartMargin + 2)
      .attr("height",chartWidth-2*chartMargin +2)
      .attr("x",chartMargin )
      .attr("y",chartMargin -1)
      .style("fill","#1696d2") 

 


    var mapX = d3.scaleLinear().range([chartMargin, chartWidth-chartMargin]);
    var mapY = d3.scaleLinear().range([chartWidth-chartMargin, chartMargin]);


    mapX.domain([2000,2014]);
    mapY.domain([0, 10]); 




    var mapXAxis = d3.axisBottom(mapX)
            // .outerTickSize(0);

    var mapYAxis = d3.axisLeft(mapY)
        // .outerTickSize(0);

    var mapline = d3.line()
        .x(function(d) { return mapX(d.Year); })
        .y(function(d) { return mapY(d.LOS_Mean); });

    map.append("path")
      .attr("class", function(d){ return "standard line " + d.key })
          .attr("d", function(d){  return mapline(d.values)})
    map.append("path")
      .attr("class", "alt line")
          .attr("d", function(d){  return mapline(d.values)})
          .style("opacity",0)


      map.append("rect")
       .attr("class","mapCurtain")
       .attr("width",chartWidth-2*chartMargin + 2)
       .attr("height",chartWidth-2*chartMargin + 2)
       .attr("x",chartMargin)
       .attr("y",chartMargin -1)
       .style("fill","#1696d2")

    map.append("text")
      .text(function(d){ return d.key })
      .attr("class", "mapLable standard")
      .attr("text-anchor", "end")
      .attr("x",chartWidth+chartMargin - 14)
      .attr("y",chartWidth+chartMargin - 14)
    
    blank.append("text")
      .text(function(d){ return d.properties.abbr })
      .attr("class", "mapLable blank")
      .attr("text-anchor", "end")
      .attr("x",chartWidth+chartMargin - 14)
      .attr("y",chartWidth+chartMargin - 14)

    map.append("g")
        .attr("class", function(d){ return "x axis " + d.key})
        .attr("transform", "translate(0," + (chartWidth-chartMargin) + ")")
        .call(mapXAxis.tickValues([2000,2014]).tickFormat(
          // d3.format(".0f")) 
          function(t){
            if(t == 2000){ return "'00"}
            else{ return "'14"}
          }
        ));

    // Add the Y Axis
    map.append("g")
        .attr("class", function(d){ return "y axis " + d.key})
      .attr("transform", "translate(" + chartMargin + ",0)")
        .call(mapYAxis.ticks(2,"s"));





  };

  function drawMapLine(variable, alt, hide){
    var bottom = (alt == 2) 
    var alt = (typeof(alt) == "undefined") ? "standard" : "alt"
    var hide = (typeof(hide) == "undefined") ? "show" : hide
    var opacity = (hide == "hide") ? 0 : 1
    var trendsData = d3.select("#vis").data()[0][0]

    var trendsDataNest = d3.nest()
      .key(function(d) {return d.State;})
      .entries(trendsData);

    var chartWidth = mapSizes[pageSize]["chartWidth"]
    var chartMargin = mapSizes[pageSize]["chartMargin"]

    d3.select("#vis svg")
      .selectAll(".state")
      .data(trendsDataNest)

    var mapX = d3.scaleLinear().range([chartMargin, chartWidth-chartMargin]);

    var mapY = d3.scaleLinear().range([chartWidth-chartMargin, chartMargin]);

    mapX.domain([2000,2014]);
    // var mapYs = {}
    var mlines = {}
    var yaxes = {}
    var mapY;
    var mapline;
    var mapYAxis
    var altvar;
    if(variable == "LOS_10plus_Pct"){
      altvar = variable;
    }
    else if(bottom == false && hide == "show"){
      altvar = "LOS_MeanViolent";
    }
    else if(bottom == true && hide == "show"){
      altvar = "LOS_MeanTop10";
    }else{
      altvar = variable;
    }
    if(variable == "LOS_10plus_Num"){
      for(var i = 0; i < trendsDataNest.length; i++){
        var max = Math.ceil(1.1* d3.max(trendsDataNest[i].values, function(d) { return d[variable]; }))
        var min = Math.floor(d3.min(trendsDataNest[i].values, function(d) { return d[variable]; }))

        var my = d3.scaleLinear().range([chartWidth-chartMargin, chartMargin])
          .domain([0, max]);

        var state = trendsDataNest[i].key

        mlines[state] = d3.line()
          .x(function(d) { return mapX(d.Year); })
          .y(function(d) { return my(d[variable]); });

        yaxes[state] = d3.axisLeft(my)
          // .orient("left")
          // .tickValues([max])
          // .outerTickSize(0);

      d3.selectAll("#vis .y.axis." + state)
        .transition()
        .call(yaxes[state].tickValues([0,max]).tickFormat(function(d){
          if(d == 0) return 0
          else return ""
        }))

        d3.selectAll("#vis svg ." + alt + ".line." + state)
          .transition()
          .style("opacity", opacity)
          .transition()
          .duration(1200)
          .attr("d", function(d){ return mlines[state](d.values)})

      }

    }else{
      mapY = d3.scaleLinear().range([chartWidth-chartMargin, chartMargin]);
      var max = Math.ceil(d3.max(trendsData, function(d) { return d[altvar]; }))
      var min = Math.floor(d3.min(trendsData, function(d) { return d[altvar]; }))
      mapY.domain([0 , max]); 
      mapline = d3.line()
          .x(function(d) { return mapX(d.Year); })
          .y(function(d) { return mapY(d[variable]); });
      mapYAxis = d3.axisLeft(mapY)


      d3.selectAll("#vis .y.axis")
        .transition()
        .call(mapYAxis.tickValues([0,max]).tickFormat(d3.format(".0f")))
      d3.selectAll("#vis svg ." + alt + ".line")
          .transition()
          .style("opacity", opacity)
          .transition()
          .duration(1200)
          .attr("d", function(d){ return mapline(d.values)})

    }
    var mapXAxis = d3.axisBottom(mapX)
        // .outerTickSize(0);

  }





  function drawBackMapCurtain(delay){
    var chartWidth = mapSizes[pageSize]["chartWidth"]
    var chartMargin = mapSizes[pageSize]["chartMargin"]

    d3.selectAll(".mapCurtain")
      .transition()
      .duration(0)
      .attr("width",chartWidth-2*chartMargin)
      .attr("x",chartMargin)
      .transition()
      .delay(delay + 200)
      .duration(1200)
      .attr("width",0)
      .attr("x", chartWidth - chartMargin)
       //    map.append("rect")
       // .attr("class","mapCurtain")
       // .attr("width",chartWidth-2*chartMargin)
       // .attr("height",chartWidth-2*chartMargin)
       // .attr("x",chartMargin)
       // .attr("y",chartMargin)
       // .style("fill","#ffffff")
  }

  /**
   * setupSections - each section is activated
   * by a separate function. Here we associate
   * these functions to the sections based on
   * the section's index.
   *
   */
  setupSections = function() {
    // activateFunctions are called each
    // time the active section changes
    activateFunctions[0] = hideMap;
    activateFunctions[1] = mapTimeServed;
    activateFunctions[2] = mapTimeServedByOffense
    activateFunctions[3] = mapTimeServedTop10Percent;
    activateFunctions[4] = map10YearsPercent;
    activateFunctions[5] = map10YearsNumber;
    activateFunctions[6] = hideMap;

    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    for(var i = 0; i < 5; i++) {
      updateFunctions[i] = function() {};
    }
  };

  /**
   * ACTIVATE FUNCTIONS
   *
   * These will be called their
   * section is scrolled to.
   *
   * General pattern is to ensure
   * all content for the current section
   * is transitioned in, while hiding
   * the content for the previous section
   * as well as the next section (as the
   * user may be scrolling up or down).
   *
   */

  /**
   * introLineChart - initial title
   *
   * hides: count title
   * (no previous step to hide)
   * shows: intro title
   *
   */

  function hideMap(){
    d3.select("#vis")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)    
  }
  function mapTimeServed(){
    d3.select("#vis")
      .transition()
      .style("opacity",1)
      .style("z-index",1)

    d3.select(".chartTitleA")
      .text("Average time served for all offense categories")
      .transition()
      .style("opacity",1)
    d3.select(".chartTitleB")
      .transition()
      .style("opacity",0)
      .on("end", function(){ d3.select(this).html("Average time served by offense type") })

    d3.select(".legendContainerA").transition().style("opacity",0)
    d3.select(".legendContainerB").transition().style("opacity",0)

    drawMapLine("LOS_Mean")
    drawMapLine("LOS_Mean", 1, "hide")
    drawBackMapCurtain(0);
  }
  function mapTimeServedByOffense(){
    d3.select(".chartTitleB")
      .text("Average time served by offense type")
      .transition()
      .style("opacity",1)
    d3.select(".chartTitleA")
      .transition()
      .style("opacity",0)
      .on("end", function(){ d3.select(this).html("Average time served for all offense categories") })


    d3.select(".legendContainerA").transition().style("opacity",1)
    d3.select(".legendContainerB").transition().style("opacity",0)

    drawMapLine("LOS_MeanAllExceptViol")
    drawMapLine("LOS_MeanViolent", 1, "show")

  }
  function mapTimeServedTop10Percent(){
    d3.select(".chartTitleA")
      .text("Average time served")
      .transition()
      .style("opacity",1)
    d3.select(".chartTitleB")
      .transition()
      .style("opacity",0)
      .on("end", function(){ d3.select(this).html("Share of population serving 10 or more years") })

    d3.select(".legendContainerA").transition().style("opacity",0)
    d3.select(".legendContainerB").transition().style("opacity",1)

    drawMapLine("LOS_MeanBottom90")
    drawMapLine("LOS_MeanTop10", 2, "show")

  }
  function map10YearsPercent(){
    d3.select(".chartTitleB")
      .text("Share of population serving 10 or more years")
      .transition()
      .style("opacity",1)
    d3.select(".chartTitleA")
      .transition()
      .style("opacity",0)
      .on("end", function(){ d3.select(this).html("People serving 10 or more years") })

    d3.select("#infoGroup")
      .transition()
      .style("opacity",0)
    d3.select(".explainerB")
      .transition()
      .style("opacity",0)
    d3.select(".explainerA")
      .transition()
      .style("opacity",1)
    drawBackMapCurtain(0);

    d3.select(".legendContainerA").transition().style("opacity",0)
    d3.select(".legendContainerB").transition().style("opacity",0)

    drawMapLine("LOS_10plus_Pct", 1, "hide")
    drawMapLine("LOS_10plus_Pct")


  }
  function map10YearsNumber(){
    d3.select("#vis")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
      
    d3.select(".chartTitleA")
      .text("People serving 10 or more years")
      .transition()
      .style("opacity",1)
    d3.select(".chartTitleB")
      .transition()
      .style("opacity",0)
      .on("end", function(){ d3.select(this).html("People serving 10 or more years") })

    d3.select("#infoGroup")
      .transition()
      .style("opacity",1)
    d3.select(".explainerB")
      .transition()
      .style("opacity",1)
    d3.select(".explainerA")
      .transition()
      .style("opacity",0)
    drawMapLine("LOS_10plus_Num")

  }

  /**
   * UPDATE FUNCTIONS
   *
   * These will be called within a section
   * as the user scrolls through it.
   *
   * We use an immediate transition to
   * update visual elements based on
   * how far the user has scrolled
   *
   */

  /**
   * updateCough - increase/decrease
   * cough text and color
   *
   * @param progress - 0.0 - 1.0 -
   *  how far user has scrolled in section
   */

   function updateAdmissionsText(progress){
   }




  /**
   * DATA FUNCTIONS
   *
   * Used to coerce the data into the
   * formats we need to visualize
   *
   */

  /**
   * cleanData - maps raw data to
   * array of data objects. There is
   * one data object for each word in the speach
   * data.
   *
   * This function converts some attributes into
   * numbers and adds attributes used in the visualization
   *
   * @param rawData - data read in from file


  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function (index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      deselectState();
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };
  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function(index, progress) {
    updateFunctions[index](progress);
  };

  // return chart function
  return chart;
};


/**
 * display - called once data
 * has been loaded.
 * sets up the scroller and
 * displays the visualization.
 *
 * @param data - loaded tsv data
 */
function display(trendsData) {
  // create a new plot and
  // display it
  var plot = scrollVis();
  d3.select("#vis")
    .datum([trendsData])
    .call(plot);

  // d3.select("#lineChart")
  //   .datum(lineData)


  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  scroll.on('resized', function(){
    d3.select("#vis svg").remove()
    d3.selectAll(".visElement").remove()
    // d3.selectAll(".scatterButton").remove()
    // d3.select("#buttonContainer").remove()
    // d3.selectAll(".mapImg").remove()
    display(trendsData)
  })

  // setup event handling
  scroll.on('active', function(index) {
    // highlight current step text
    d3.selectAll('.step')
      .transition()
      .style('opacity',  function(d,i) {
        if(IS_MOBILE()){
          return 1
        }else{
          return i == index ? 1 : .2;
        }
      });

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function(index, progress){
    plot.update(index, progress);
  });
}

// load data and display

    d3.csv("data/trendsData.csv", function(trendsData){
      display(trendsData)
    })

var nextpage = d3.select(".next-page-div")
nextpage
    .on("mouseover", function() {
        nextpage.select(".next-arrow")
            .attr("class", "next-arrow-hovered")
    })
    .on("mouseout", function() {
        nextpage.select(".next-arrow-hovered")
            .attr("class", "next-arrow")
    })


$(document).ready(function(){
    if(d3.select("section").node().getBoundingClientRect().top + 50 > window.innerHeight){
        d3.select(".introArrowWrapper")
            .transition()
            .duration(0)
            .style("opacity",1)
            .style("z-index",10)
    }    
})