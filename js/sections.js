
/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function() {
  // constants to define the size
  // and margins of the vis area.
  var WIDTH = 500,
    HEIGHT = 500,
    margin = {top: 2, right: 25, bottom: 10, left: 25},
    width = WIDTH - margin.left - margin.right,
    height = HEIGHT - margin.top - margin.bottom

  var lineMargin = {top: 30, right: 20, bottom: 30, left: 50},
    lineWidth = 300 - lineMargin.left - lineMargin.right,
    lineHeight = 270 - lineMargin.top - lineMargin.bottom;

  var pageSize = "large"
  var mapSizes = {
    "huge": { "width": 900, "height": 1270, "scale": 3800, "translate": [380,220], "chartWidth": 76, "chartMargin": 8},
    "large": { "width": 900, "height": 1270, "scale": 3100, "translate": [380,220], "chartWidth": 62, "chartMargin": 5},
    "medium": { "width": 900, "height": 1270, "scale": 3800, "translate": [380,220], "chartWidth": 76, "chartMargin": 8},
    "small": { "width": 900, "height": 1270, "scale": 3800, "translate": [380,220], "chartWidth": 76, "chartMargin": 8}
  }

  var mapMargin = {top: 30, right: 20, bottom: 30, left: 50},
    mapWidth = mapSizes[pageSize]["width"] - mapMargin.left - mapMargin.right,
    mapHeight = mapSizes[pageSize]["height"] - mapMargin.top - mapMargin.bottom;

  var YEAR_IN_MS = 2000,
    MAX_BARS = 40

  var FILLED_TRACK_COLOR = "#9d9d9d"
  var EMPTY_TRACK_COLOR = "#e3e3e3"
  var EXITING_TRACK_COLOR = "#ec008b"

  // Keep track of which visualization
  // we are on and which was the last
  // index activated. When user scrolls
  // quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // sizing constants for intro track
  var trackRatio = .4,
    dotRatio = .7
    


  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  var lineSvg = null;

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
    d3.selectAll(".lineLabel")
      .on("mouseover", function(){
        if(d3.select(this).style("opacity") == 0){
          return false;
        }else{
          d3.select(this)
            .classed("highlight", true)
          d3.select(".line.step_" + d3.select(this).attr("data-key"))
            .classed("highlight", true)
        }
      })
      .on("mouseout", function(){
        d3.selectAll(".highlight").classed("highlight", false)
      })
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
      svg = d3.select(this).selectAll("svg").data([allData]);
      svg.enter().append("svg").append("g");

      svg.attr("width", WIDTH);
      svg.attr("height", HEIGHT);


      // this group element will be used to contain all
      // other elements.
      g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      lineSvg = d3.select("#lineChart")
        .append("svg")
            .attr("class","introLineChart")
            .attr("width", lineWidth + lineMargin.left + lineMargin.right)
            .attr("height", lineHeight + lineMargin.top + lineMargin.bottom)
        .append("g")
            .attr("transform", 
                  "translate(" + lineMargin.left + "," + lineMargin.top + ")");

      mapSvg = d3.select("#map")
        .append("svg")
            .attr("width", mapWidth + mapMargin.left + mapMargin.right)
            .attr("height", mapHeight + mapMargin.top + mapMargin.bottom)
        .append("g")
            .attr("transform", 
                  "translate(" + mapMargin.left + "," + mapMargin.top + ")");




      // perform some preprocessing on raw data
      var allData = cleanData(rawData);
      var lineData = rawData[1]
      var trendsData = rawData[2]
      svg.data([allData])
      lineSvg.data([lineData])
      mapSvg.data([trendsData])
      setupVis(allData, lineData, trendsData);

      setupSections();

    });
  };


  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   *
   * @param allData - data object for each word.
   * @param fillerCounts - nested data that includes
   *  element for each filler word type.
   * @param histData - binned histogram data
   */
  setupVis = function(allData, lineData, trendsData) {
    //temp line
    var data = allData.filter(function(d){return d.step == 1});

    trackHeight = d3.max([height/data.length, height/MAX_BARS])

    //intro background
    g.append("rect")
      .attr("class","prisonBG")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      .attr("stroke", "#000000")
      .style("opacity",0)

    // count openvis title
    g.append("text")
      .attr("class", "title openvis-title")
      .attr("x", width / 2)
      .attr("y", height / 3)
      .text("Intro");

    g.append("text")
      .attr("class", "sub-title openvis-title")
      .attr("x", width / 2)
      .attr("y", (height / 3) + (height / 5) )
      .text("Area chart");

    g.selectAll(".openvis-title")
      .attr("opacity", 0);

    var singleTrack = g
      .append("g")
      .attr("class", "singleTrackGroup")
      .attr("transform", function(d, i){
        return "translate(0, " + (height-trackHeight) + ")"
      })
    var slowSingleTrack = g
      .append("g")
      .attr("class", "slowSingleTrackGroup")
      .attr("transform", function(d, i){
        return "translate(0, " + (height-2*trackHeight) + ")"
      })

    singleTrack.append("rect")
      .attr("class", "singleTrackEmpty")
      .attr("width", width + "px")
      .attr("height", (trackHeight*trackRatio) + "px")
      .attr("y",(1-trackRatio)*.5*trackHeight)
      .attr("fill", EMPTY_TRACK_COLOR)
      .style("opacity", 0)

    singleTrack.append("rect")
      .attr("class", "singleTrackFilled")
      .attr("width", "0px")
      .attr("height", (trackHeight*trackRatio) + "px")
      .attr("y",(1-trackRatio)*.5*trackHeight)
      .attr("fill", FILLED_TRACK_COLOR)
      .style("opacity", 0)

    singleTrack.append("circle")
      .attr("class","singleDot")
      .attr("cx", 0)
      .attr("cy", (1-trackRatio)*.5*trackHeight*1.5)
      .attr("r", trackHeight * dotRatio * .5)
      .style("fill", function(){ return dotColor(1) })
      .style("opacity", 0)

    slowSingleTrack.append("rect")
      .attr("class", "slowSingleTrackEmpty")
      .attr("width", width + "px")
      .attr("height", (trackHeight*trackRatio) + "px")
      .attr("y",(1-trackRatio)*.5*trackHeight)
      .attr("fill", EMPTY_TRACK_COLOR)
      .style("opacity", 0)

    slowSingleTrack.append("rect")
      .attr("class", "slowSingleTrackFilled")
      .attr("width", "0px")
      .attr("height", (trackHeight*trackRatio) + "px")
      .attr("y",(1-trackRatio)*.5*trackHeight)
      .attr("fill", FILLED_TRACK_COLOR)
      .style("opacity", 0)

    slowSingleTrack.append("circle")
      .attr("class","slowSingleDot")
      .attr("cx", 0)
      .attr("cy", (1-trackRatio)*.5*trackHeight*1.5)
      .attr("r", trackHeight * dotRatio * .5)
      .style("fill", function(){ return dotColor(1) })
      .style("opacity", 0)



    //track for all intro animations
    var track = g
      .selectAll(".trackGroup")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "trackGroup inactive visible")
      .attr("transform", function(d, i){
        return "translate(0,"  + ((i - (data.length  - MAX_BARS))*trackHeight) + ")"
      })

    track.append("rect")
      .attr("class", "introMotion trackEmpty")
      .attr("width", width + "px")
      .attr("height", (trackHeight*trackRatio) + "px")
      .attr("y",(1-trackRatio)*.5*trackHeight)
      .attr("fill", EMPTY_TRACK_COLOR)
      .style("opacity", 0)

    track.append("rect")
      .attr("class", "trackFilled")
      .attr("width", function(d){
        return (d3.min([0,d.admission]) * -1 / d.sentence)*width + "px"
      })
      .attr("height", (trackHeight*trackRatio) + "px")
      .attr("y",(1-trackRatio)*.5*trackHeight)
      .attr("fill", FILLED_TRACK_COLOR)
      .style("opacity", 0)

    var dot = track.append("circle")
      .attr("class","dot")
      .attr("cx", function(d){
        return (d3.min([0,d.admission]) * -1 / d.sentence)*width
      })
      .attr("cy", (1-trackRatio)*.5*trackHeight*1.5)
      .attr("r", trackHeight * dotRatio * .5)
      .style("fill", function(d){ return dotColor(d.sentence) })
      .style("opacity", 0)

    //line chart
    d3.select("#lineChart").style("opacity",0)

    var lineX = d3.scale.linear().range([0, lineWidth]);
    var lineY = d3.scale.linear().range([lineHeight, 0]);

    var lineXAxis = d3.svg.axis().scale(lineX)
        .orient("bottom").ticks(5);

    var lineYAxis = d3.svg.axis().scale(lineY)
        .orient("left").ticks(5);

    var countline = d3.svg.line()
        .x(function(d) { return lineX(d.time); })
        .y(function(d) { return lineY(d.count); });


    lineData.forEach(function(d) {
      d.time = +d.time
      d.count = +d.count;
    });

    // Scale the range of the data
    lineX.domain([0,8.7]);
    lineY.domain([0, d3.max(lineData, function(d) { return d.count; })]); 

    // Nest the entries by step
    var lineDataNest = d3.nest()
        .key(function(d) {return d.step;})
        .sortKeys(d3.descending)
        .entries(lineData);

    lineDataNest.forEach(function(d) {
        var key = d.key
        lineSvg.append("path")
            .attr("class", "line step_" + d.key)
            .attr("data-key", d.key)
            .attr("d", countline(d.values))
            .on("mouseover", function(){
                d3.select(this)
                  .classed("highlight", true)
                if(d3.select("#lineLabel_" + key).style("opacity") != 0){
                  d3.select("#lineLabel_" + key)
                    .classed("highlight", true)
                }
            })
            .on("mouseout", function(){
              d3.selectAll(".highlight").classed("highlight", false)
            })

    lineSvg.append("rect")
      .attr("x", 0)
      .attr("y", -2)
      .attr("width", lineWidth)
      .attr("height", lineHeight+2)
      .style("fill", "#ffffff")
      .attr("class", "curtain_" + d.key)

    });

    lineSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + lineHeight + ")")
        .call(lineXAxis);

    // Add the Y Axis
    lineSvg.append("g")
        .attr("class", "y axis")
        .call(lineYAxis);

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



        var projection = d3.geo.equirectangular()
        .scale(mapSizes[pageSize]["scale"])
        .center([-96.03542,41.69553])
        .translate(mapSizes[pageSize]["translate"]);

      var geoPath = d3.geo.path()
        .projection(projection);
  var chartWidth = mapSizes[pageSize]["chartWidth"]
  var chartMargin = mapSizes[pageSize]["chartMargin"]
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
      .attr("width",chartWidth-2*chartMargin)
      .attr("height",chartWidth-2*chartMargin)
      .attr("x",chartMargin)
      .attr("y",chartMargin)
      .style("fill","#e3e3e3") 

 


    var mapX = d3.scale.linear().range([chartMargin, chartWidth-chartMargin]);
    var mapY = d3.scale.linear().range([chartWidth-chartMargin, chartMargin]);


    mapX.domain([2000,2014]);
    mapY.domain([0, d3.max(trendsData, function(d) { return d.LOS_Mean; })]); 

    var mapXAxis = d3.svg.axis().scale(mapX)
        .orient("bottom").outerTickSize(0);

    var mapYAxis = d3.svg.axis().scale(mapY)
        .orient("left").outerTickSize(0);

    var mapline = d3.svg.line()
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
       .attr("width",chartWidth-2*chartMargin)
       .attr("height",chartWidth-2*chartMargin)
       .attr("x",chartMargin)
       .attr("y",chartMargin)
       .style("fill","#ffffff")

    map.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (chartWidth-chartMargin) + ")")
        .call(mapXAxis);

    // Add the Y Axis
    map.append("g")
        .attr("class", function(d){ return "y axis " + d.key})
      .attr("transform", "translate(" + chartMargin + ",0)")
        .call(mapYAxis);





  };

  function drawMapLine(variable, alt, hide){
    alt = (typeof(alt) == "undefined") ? "standard" : alt
    hide = (typeof(hide) == "undefined") ? "show" : hide
    var opacity = (hide == "hide") ? 0 : 1
    var trendsData = d3.select("#vis").data()[0][2]

    var trendsDataNest = d3.nest()
      .key(function(d) {return d.State;})
      .entries(trendsData);

    var chartWidth = mapSizes[pageSize]["chartWidth"]
    var chartMargin = mapSizes[pageSize]["chartMargin"]

    d3.select("#map svg")
      .selectAll(".state")
      .data(trendsDataNest)

    var mapX = d3.scale.linear().range([chartMargin, chartWidth-chartMargin]);

    var mapY = d3.scale.linear().range([chartWidth-chartMargin, chartMargin]);

    mapX.domain([2000,2014]);
    // var mapYs = {}
    var mlines = {}
    var yaxes = {}
    var mapY;
    var mapline;
    var mapYAxis
    var altvar = (alt == "alt" && hide == "show") ? "LOS_MeanViolent" : variable
    if(variable == "LOS_10plus_Num"){
      for(var i = 0; i < trendsDataNest.length; i++){
        var max = d3.max(trendsDataNest[i].values, function(d) { return d[variable]; })

        var my = d3.scale.linear().range([chartWidth-chartMargin, chartMargin])
          .domain([0, max]);

        var state = trendsDataNest[i].key

        mlines[state] = d3.svg.line()
          .x(function(d) { return mapX(d.Year); })
          .y(function(d) { return my(d[variable]); });

        yaxes[state] = d3.svg.axis().scale(my)
          .orient("left")
          .tickValues([max])
          .outerTickSize(0);

      d3.selectAll("#map .y.axis." + state)
        .transition()
        .call(yaxes[state])

        d3.selectAll("#map svg ." + alt + ".line." + state)
          .transition()
          .style("opacity", opacity)
          .transition()
          .duration(1200)
          .attr("d", function(d){ return mlines[state](d.values)})

      }

    }else{
      mapY = d3.scale.linear().range([chartWidth-chartMargin, chartMargin]);
      var max = d3.max(trendsData, function(d) { return d[altvar]; })
      mapY.domain([0, max]); 
      mapline = d3.svg.line()
          .x(function(d) { return mapX(d.Year); })
          .y(function(d) { return mapY(d[variable]); });
      mapYAxis = d3.svg.axis().scale(mapY)
        .orient("left")
        .tickValues([0, max])
        .outerTickSize(0);

      d3.selectAll("#map .y.axis")
        .transition()
        .call(mapYAxis)
      d3.selectAll("#map svg ." + alt + ".line")
          .transition()
          .style("opacity", opacity)
          .transition()
          .duration(1200)
          .attr("d", function(d){ return mapline(d.values)})

    }
    var mapXAxis = d3.svg.axis().scale(mapX)
        .orient("bottom").outerTickSize(0);

  }

  function resetIntro(step){
    var data = d3.select("#vis svg").data()[0].filter(function(d){return +d.step == +step})
    .sort(function(a, b) {
        return parseFloat(b.admission) - parseFloat(a.admission)
    });

    g
      .selectAll(".trackGroup")
      .data(data)
      .transition()
      .attr("transform", function(d, i){
        return "translate(0,"  + ((i - (data.length  - MAX_BARS))*trackHeight) + ")"
      })

    d3.selectAll(".trackEmpty")
      .transition()
      .style("opacity",0)
    d3.selectAll(".trackFilled")
    .data(data)
      .transition()
      .attr("width", function(d){
        return (d3.min([0,d.admission]) * -1 / d.sentence)*width + "px"
      })
      .style("opacity",0)

    d3.selectAll(".dot")
    .data(data)
      .transition()
      .attr("cx", function(d){
        return (d3.min([0,d.admission]) * -1 / d.sentence)*width
      })
      .style("fill", function(d){ return dotColor(d.sentence) })
      .style("opacity",0)
  }

  function animateIntro(step){
    // pauseAnimation()
    var data = d3.select("#vis svg").data()[0].filter(function(d){ return +d.step == +step})
    .sort(function(a, b) {
        return parseFloat(b.admission) - parseFloat(a.admission)
    });


    g.data(data)

    g.selectAll(".openvis-title")
      .transition()
      .duration(0)
      .style("opacity",0)

    g.select(".prisonBG")
      .transition()
      .style("opacity",1)

    g
      .selectAll(".trackGroup")
      .classed("visible",true)
      .style("opacity",1)
      .data(data)
      .transition("foo")
      .duration(350)
      .delay(400)
      .attr("transform", function(d, i){
        return "translate(0,"  + ((i - (data.length  - MAX_BARS))*trackHeight) + ")"
      })
      // .each("end", function(d, i){
      //   if(i == data.length-1){


d3.selectAll(".trackEmpty")
.data(data)
.transition()
.duration(350)
.style("opacity",0)
.transition()
.delay(function(d){ return yearsToMS(d.admission)}) 
.style("opacity", function(d){
  if(+d.sentence == 999){
    return 0
  }else{
    return 1
  }
})
.each("end", function(){
d3.select(this.parentNode).classed("inactive", false).classed("active", true)
})

d3.selectAll(".trackFilled")
.data(data)
.transition()
.duration(350)
.style("fill",FILLED_TRACK_COLOR)
.attr("width", "0px")
.style("opacity",0)

.transition()
.delay(function(d){ return yearsToMS(d.admission)}) 
.style("opacity", function(d){
  if(+d.sentence == 999){
    return 0
  }else{
    return 1
  }
})
.transition()
.ease("linear")
.duration(function(d){
// if(d.admission < 0){
// return yearsToMS((d.sentence -(-1 * d.admission)) * d.lengthOfStay/d.sentence)
// }else{
return yearsToMS(d.lengthOfStay)
// }
})

.attr("width", function(d){ return width * (d.lengthOfStay/d.sentence) + "px" })

d3.selectAll(".dot")
.data(data)
.transition()
.duration(350)
.attr("cx", function(d){
  // return (d3.min([0,d.admission]) * -1 / d.sentence)*width
  return 0
})
.style("fill", function(d){ return dotColor(d.sentence) })
.style("opacity",0)

.transition()
.delay(function(d){ return yearsToMS(d.admission)}) 
      .style("opacity", function(d){
        if(+d.sentence == 999){
          return 0
        }else{
          return 1
        }
      })
.attr("class", "dot active")
.transition()
.duration(function(d){
// if(d.admission < 0){
// return yearsToMS((d.sentence - (-1 * d.admission)) * d.lengthOfStay/d.sentence)
// }else{
return yearsToMS(d.lengthOfStay)
// }

})
.ease("linear")
.attr("cx", function(d){ return width * (d.lengthOfStay/d.sentence) })
.each("start",function(d,i){
if(i == 0){
pauseAnimation(width)
}
})
.each("end", function(d){
d3.select(this.parentNode)
.classed("inactive", true).classed("active", false)
.select(".trackFilled")
.transition("fade-out")
.duration(100)
.style("fill", EXITING_TRACK_COLOR)
d3.select(this.parentNode)
.selectAll("rect")
.transition("fade-out")
.delay(200)
.duration(100)
.ease("linear")
.style("opacity",0)
.each("end", function(){
// d3.select(this.parentNode).remove()
d3.select(this.parentNode)
.classed("visible",false)
.transition("fade-out")
.duration(0)
.style("opacity",0)

d3.selectAll(".trackGroup")
.transition()
.duration(200)
.attr("transform", function(){

var top = this.getBoundingClientRect().top
var count = 0;
var gs = d3.selectAll(".trackGroup.visible")
gs[0].forEach(function(g){

  // var g = g
  if(g.getBoundingClientRect().top > top){
    count += 1
  }
})
return "translate(0,"  + ((( MAX_BARS) - 1 -  count)*trackHeight) + ")"             
});
})

})

      //   }
      // })




  }



  function drawBackCurtain(key){
    for(var k = key-1; k >= 3; k--){
      d3.select(".curtain_" + k)
        .transition()
        .duration(0)
        .attr("width",0)
        .attr("x", lineWidth)
      d3.select(".line.step_" + k)
        .transition()
        .style("opacity",.5)
      d3.select("#lineLabel_" + k)
        .transition()
        .style("opacity",.5)
        .style("pointer-events","all")
    }
    for(var k = key+1; k < 8; k++){
      d3.select(".curtain_" + k)
        .transition()
        .duration(0)
        .attr("width",lineWidth)
        .attr("x", 0)
      d3.select("#lineLabel_" + k)
        .transition()
        .style("opacity",0)
        .style("pointer-events","none")
    }
    d3.select(".line.step_" + key)
        .transition()
        .style("opacity",1)
    d3.select(".curtain_" + key)
        .transition()
        .duration(10)
        .attr("width",lineWidth)
        .attr("x", 0)
        .transition()
        .duration(8.7*YEAR_IN_MS)
        .ease("linear")
        .attr("width",0)
        .attr("x", lineWidth)
      d3.select("#lineLabel_" + key)
        .transition()
        .duration(10)
        .style("opacity",0)
        .transition()
        .delay(8*YEAR_IN_MS)
        .style("opacity",1)
        .style("pointer-events","all")
  }
  function dotColor(sentence){
    if(sentence >= 5){
      return "#fdbf11"
    }else{
      return "#1696d2";
    }
    // var ramp=d3.scale.linear().domain([1,20]).range(["#1696d2","#fdbf11"]);
    // return ramp(sentence)
  }
  function yearsToMS(year){
    return d3.max([0,year]) * YEAR_IN_MS
  }

  function pauseAnimation(width){
    var bounceLength = 20,
        pauseDuration = 800;
    d3.selectAll(".dot")
      .transition()
      .ease("expOut")
      .duration(pauseDuration)
      .attr("cx", function(d){
        var cx = ( (width * (d.lengthOfStay/d.sentence)) - parseFloat(d3.select(this).attr("cx")) > bounceLength) ? parseFloat(d3.select(this).attr("cx")) + bounceLength : parseFloat(d3.select(this).attr("cx")) + .5*((width * (d.lengthOfStay/d.sentence)) - +d3.select(this).attr("cx"))
        return cx
      })
      .style("opacity",function(){
        var o = (d3.select(this).style("opacity") == 0) ? 0 : 1
        return o
      })

    d3.selectAll(".trackFilled")
    .transition()
    .ease("expOut")
    .duration(pauseDuration)
    .attr("width", function(d){
      var w = ( (width * (d.lengthOfStay/d.sentence)) - parseFloat(d3.select(this).attr("width").replace("px","")) > bounceLength) ? parseFloat(d3.select(this).attr("width").replace("px","")) + bounceLength : parseFloat(d3.select(this).attr("width").replace("px","")) + .5*((width * (d.lengthOfStay/d.sentence)) - +d3.select(this).attr("width").replace("px",""))
      return w  + "px"
    })
    .style("opacity",function(){
      var o = (d3.select(this).style("opacity") == 0) ? 0 : 1
      return o
    })  

    d3.selectAll(".introMotion")
    .transition()
    .style("opacity",function(){
      var o = (d3.select(this).style("opacity") == 0) ? 0 : 1
      return o
    })
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
    activateFunctions[0] = introAreaChart;
    activateFunctions[1] = showSingleDot;
    activateFunctions[2] = admissionsExample;
    activateFunctions[3] = lengthOfStayExample;
    activateFunctions[4] = oneYearSentences;
    activateFunctions[5] = longerSentences;
    activateFunctions[6] = longerSentencesFasterAdmission;
    activateFunctions[7] = fewerShortSentences;
    activateFunctions[8] = shortSentenceEarlyRelease;
    activateFunctions[9] = hideIntro;
    activateFunctions[10] = mapTimeServed;
    activateFunctions[11] = mapTimeServedByOffense
    activateFunctions[12] = mapTimeServedTop10Percent;
    activateFunctions[13] = map10YearsPercent;
    activateFunctions[14] = map10YearsNumber;

    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    for(var i = 0; i < 15; i++) {
      updateFunctions[i] = function() {};
    }
    updateFunctions[2] = updateAdmissionsText;
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

  function introAreaChart() {
    hideSingleDot()
    d3.select(".prisonBG")
      .transition()
      .style("opacity",0)

    g.selectAll(".count-title")
      .transition()
      .duration(0)
      .attr("opacity", 0);

    g.selectAll(".openvis-title")
      .transition()
      .duration(600)
      .attr("opacity", 1.0);
    
  }

  function hideSingleDot(){
    d3.select(".singleTrackEmpty")
      .transition()
      .style("opacity", 0)
      .style("color", EMPTY_TRACK_COLOR)

    d3.select(".singleTrackFilled")
      .transition()
      .attr("width", "0px")
      .transition()
      .style("opacity",0)
      .style("color", FILLED_TRACK_COLOR)

     d3.select(".singleDot")
      .transition()
      .attr("cx", 0)
      .transition()
      .style("opacity",0)

      d3.select(".slowSingleTrackGroup")
        .transition("reset-single")
          .attr("transform", function(d, i){
            return "translate(0, " + (height-2*trackHeight) + ")"
          })
      d3.select(".singleTrackGroup")
        .transition("reset-single")
          .attr("transform", function(d, i){
            return "translate(0, " + (height-trackHeight) + ")"
          })


    d3.select(".slowSingleTrackEmpty")
      .transition()
      .style("opacity", 0)
      .style("color", EMPTY_TRACK_COLOR)

    d3.select(".slowSingleTrackFilled")
      .transition()
      .attr("width", "0px")
      .transition()
      .style("opacity",0)
      .style("color", FILLED_TRACK_COLOR)

     d3.select(".slowSingleDot")
      .transition()
      .attr("cx", 0)
      .transition()
      .style("opacity",0)


  }

  function showSingleDot(){
    resetIntro(1)

    g.selectAll(".openvis-title")
      .transition()
      .duration(0)
      .attr("opacity", 0);

    g.select(".prisonBG")
      .transition()
      .style("opacity",1)


    d3.select(".singleTrackEmpty")
      .transition()
      .style("opacity", 1)

    d3.select(".singleTrackFilled")
      .transition()
      .style("opacity",1)
      .transition()
      .ease("linear")
      .delay(400)
      .duration(1500)
      .attr("width", function(){ return width + "px"})

     d3.select(".singleDot")
      .transition()
      .style("opacity",1)
      .transition()
      .delay(400)
      .duration(1500)
      .ease("linear")
      .attr("cx", function(){ return width + "px"})
      .each("end", function(){
        d3.select(".singleTrackFilled")
          .transition("fade-out")
            .duration(100)
            .style("fill", EXITING_TRACK_COLOR)
        d3.select(this)
          .transition()
            .delay(200)
            .duration(100)
            .ease("linear")
            .style("opacity",0)
        d3.select(this.parentNode)
          .selectAll("rect")
          .transition("fade-out")
            .delay(200)
            .duration(100)
            .ease("linear")
            .style("opacity",0)

        d3.select(".slowSingleTrackGroup")
          .transition()
            .attr("transform", function(d, i){
              return "translate(0, " + (height-trackHeight) + ")"
            })
      })

    d3.select(".slowSingleTrackEmpty")
      .transition()
      .style("opacity", 1)

    d3.select(".slowSingleTrackFilled")
      .transition()
      .style("opacity",1)
      .transition()
      .ease("linear")
      .delay(400)
      .duration(8500)
      .attr("width", function(){ return width + "px"})

     d3.select(".slowSingleDot")
      .transition()
      .style("opacity",1)
      .transition()
      .delay(400)
      .duration(8500)
      .ease("linear")
      .attr("cx", function(){ return width + "px"})
      .each("end", function(){
        d3.select(".slowSingleTrackFilled")
          .transition("fade-out")
            .duration(100)
            .style("fill", EXITING_TRACK_COLOR)
        d3.select(this)
          .transition()
            .delay(200)
            .duration(100)
            .ease("linear")
            .style("opacity",0)
        d3.select(this.parentNode)
          .selectAll("rect")
          .transition("fade-out")
            .delay(200)
            .duration(100)
            .ease("linear")
            .style("opacity",0)
      })
  }

  function admissionsExample(){
    d3.select("#admissionUpdateText")
      .transition()
      .delay(7000)
      .style("opacity",1)
    hideSingleDot()
    animateIntro(1)
  }
  function lengthOfStayExample(){
    animateIntro(2)
    d3.select("#lineChart")
      .transition()
      .style("opacity",0)
  }
  function oneYearSentences(){
    d3.select("#lineChart")
      .transition()
      .style("opacity",1)
    drawBackCurtain(3)
    animateIntro(3)
  }
  function longerSentences(){
    drawBackCurtain(4)
    animateIntro(4)
  }
  function longerSentencesFasterAdmission(){
    drawBackCurtain(5)
    animateIntro(5)
  }
  function fewerShortSentences(){
    drawBackCurtain(6)
    animateIntro(6)
  }
  function shortSentenceEarlyRelease(){
    drawBackCurtain(7)
    animateIntro(7)
    d3.select("#vis")
      .transition()
      .style("opacity",1)
    d3.select("#lineChart")
      .transition()
      .style("opacity",1)
  }
  function hideIntro(){
    d3.select("#vis")
      .transition()
      .style("opacity",0)
    d3.select("#lineChart")
      .transition()
      .style("opacity",0)
    d3.select("#map")
      .transition()
      .style("opacity",0)
  }
  function mapTimeServed(){
    d3.select("#map")
      .transition()
      .style("opacity",1)
    drawMapLine("LOS_Mean")
    drawMapLine("LOS_Mean", "alt", "hide")
    drawBackMapCurtain(0);
  }
  function mapTimeServedByOffense(){
    drawMapLine("LOS_MeanAllExceptViol", "alt", "show")
    drawMapLine("LOS_MeanViolent")

  }
  function mapTimeServedTop10Percent(){
    // drawBackMapCurtain(0);
    drawMapLine("LOS_MeanTop10", "alt", "hide")
    drawMapLine("LOS_MeanTop10")

  }
  function map10YearsPercent(){
    drawBackMapCurtain(0);
    drawMapLine("LOS_10plus_Pct")

  }
  function map10YearsNumber(){
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
   */
  function cleanData(rawData) {
    return rawData[0].sort(function(a, b) {
        return parseFloat(b.admission) - parseFloat(a.admission)
    });
  }

 

  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function(index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function(i) {
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
function display(animationData, lineData, trendsData) {
  // create a new plot and
  // display it
  var plot = scrollVis();
  d3.select("#vis")
    .datum([animationData, lineData, trendsData])
    .call(plot);

  // d3.select("#lineChart")
  //   .datum(lineData)


  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function(index) {
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity',  function(d,i) { return i == index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function(index, progress){
    plot.update(index, progress);
  });
}

// load data and display
d3.csv("data/introData.csv", function(animationData){
  d3.csv("data/lineData.csv", function(lineData){
    d3.csv("data/trendsData.csv", function(trendsData){
      display(animationData, lineData, trendsData)
    })
  })
});

