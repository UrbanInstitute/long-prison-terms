
/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function() {
  // constants to define the size
  // and margins of the vis area.
  var WIDTH = 816,
    HEIGHT = 665,
    margin = {top: 2, right: 85, bottom: 10, left: 25},
    width = WIDTH - margin.left - margin.right,
    height = HEIGHT - margin.top - margin.bottom

  var lineMargin = {top: 30, right: 20, bottom: 30, left: 50},
    lineWidth = 300 - lineMargin.left - lineMargin.right,
    lineHeight = 216 - lineMargin.top - lineMargin.bottom;

  var YEAR_IN_MS = 2000,
    MAX_BARS = 40

  var FILLED_TRACK_COLOR = "#b3b3b3"
  var EMPTY_TRACK_COLOR = "#f2f2f2"
  var EXITING_TRACK_COLOR = "#fdbf11"


  var areaMargin = {
  top: 10,
  right: 0,
  bottom: 10,
  left: 0
  };
  var screenHeight = window.innerHeight - 50
  var areaWidth = window.innerWidth - areaMargin.left - areaMargin.right - 10,
  areaHeight = Math.min(screenHeight, window.innerHeight - areaMargin.top - areaMargin.bottom - 20);



  // Keep track of which visualization
  // we are on and which was the last
  // index activated. When user scrolls
  // quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // sizing constants for intro track
  var trackRatio = .5,
    dotRatio = .9
    


  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  var lineSvg = null;

  var areaSvg = null;

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

areaSvg = d3.select('#introAreaContainer')
.append("svg")
.attr("id","areaSvg")
.attr("width", areaWidth + areaMargin.left + areaMargin.right)
.attr("height", areaHeight + areaMargin.top + areaMargin.bottom)
.append("g")
.attr("transform", "translate(" + areaMargin.left + "," + areaMargin.top + ")");


      // perform some preprocessing on raw data
      var allData = cleanData(rawData);
      var lineData = rawData[1]
      var areaData = rawData[2]
      svg.data([allData])
      lineSvg.data([lineData])
      areaSvg.data([areaData])


      setupVis(allData, lineData, areaData);

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
  setupVis = function(allData, lineData, areaData) {
    //temp line
    var data = allData.filter(function(d){return d.step == 1});


var defs = areaSvg.append("defs");
var filter = defs.append("filter").attr("id","gooeyCodeFilter");
filter.append("feGaussianBlur")
.attr("in","SourceGraphic")
.attr("stdDeviation","10")
//to fix safari: http://stackoverflow.com/questions/24295043/svg-gaussian-blur-in-safari-unexpectedly-lightens-image
.attr("color-interpolation-filters","sRGB") 
.attr("result","blur");
filter.append("feColorMatrix")
.attr("in","blur")
.attr("mode","matrix")
.attr("values","1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9")
.attr("result","gooey");

var colonWrapper = areaSvg.append("g")
.style("filter", "url(#gooeyCodeFilter)");
var dummyWrapper = areaSvg.append("g")


var rightEdge = d3.select("#titleText span").node().getBoundingClientRect().right
var topEdge = d3.select("#titleText span").node().getBoundingClientRect().top


var dotTop = colonWrapper.append("circle")
.attr("id", "dotTop")
.attr("cx", rightEdge -10)
.attr("cy", topEdge + 22)
.attr("r",5)

var dotBottom = colonWrapper.append("circle")
.attr("id", "dotBottom")
.attr("cx", rightEdge - 10)
.attr("cy", topEdge + 51)
.attr("r",5)

var dummyTopDot = dummyWrapper.append("circle")
.attr("id", "dummyTopDot")
.attr("cx", rightEdge  -10)
.attr("cy", topEdge + 22)
.attr("r",5)
.style("opacity",1)

var dummyBottomDot = dummyWrapper.append("circle")
.attr("id", "dummyBottomDot")
.attr("cx", rightEdge - 10)
.attr("cy", topEdge + 51)
.attr("r",5)
.style("opacity",1)



var areChartBaseline = colonWrapper.append("rect")
.attr("id", "areChartBaseline")
.attr("x", rightEdge)
.attr("y", areaHeight+3)
.attr("width", 0)
.attr("height", 15)
var x = d3.scale.linear().domain([1925, 2015]).range([0, areaWidth]);
var y = d3.scale.linear().domain([1600000,0]).range([0, areaHeight]);

var leftBorder = dummyWrapper.append("line")
.attr("id", "leftBorder")
.attr("fill","none")
.attr("stroke-width",8)
.attr("stroke","black")
.attr("x1",0)
.attr("x2",0)
.attr("y1",y(0)+10)
.attr("y2",y(0)+10)
var rightBorder = dummyWrapper.append("line")
.attr("id", "rightBorder")
.attr("fill","none")
.attr("stroke-width",8)
.attr("stroke","black")
.attr("x1",areaWidth)
.attr("x2",areaWidth)
.attr("y1",y(0)+10)
.attr("y2",y(0)+10)


var line = d3.svg.line()
.interpolate("cardinal")
.x(function(d) {return x(+d.year);})
.y(function(d) {return y(+d.pop);})

var area = d3.svg.area()
.interpolate("cardinal")
.x(function(d) {return x(+d.year);})
.y1(function(d) {return y(+d.pop);})
.y0(areaHeight+10)




var areaPath =  colonWrapper.append("path")
.attr("id", "extractedArea")
.attr("d", area(areaData))
.attr("stroke", "#094c6b")
.attr("stroke-width", "4")
.attr("fill", "#094c6b")
.style("opacity","0")

var path = dummyWrapper.append("path")
.attr("id", "extractedLine")
.attr("d", line(areaData))
.attr("stroke", "black")
.attr("stroke-width", "4")
.attr("fill", "none");



var totalLength = path.node().getTotalLength();



path
.attr("stroke-dasharray", totalLength + " " + totalLength)
.attr("stroke-dashoffset", totalLength)





    trackHeight = d3.max([height/data.length, height/MAX_BARS])

    //intro background
    g.append("rect")
      .attr("class","prisonBG")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f2f2f2")
      .attr("stroke", "none")
      .style("opacity",0)

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

    singleTrack.append("g")
      .attr("class","dotGroup")
      .append("rect")
      .attr("class","singleDot")
      .attr("x", 0)
      .attr("y", trackHeight*(1-dotRatio)*.5)
      .attr("height", trackHeight * dotRatio )
      .attr("width", trackHeight * dotRatio )
      .style("fill", function(d){ return dotColor(1) })
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

    slowSingleTrack.append("g")
      .attr("class","dotGroup")
      .append("rect")
      .attr("class","slowSingleDot")
      .attr("x", 0)
      .attr("y", trackHeight*(1-dotRatio)*.5)
      .attr("height", trackHeight * dotRatio )
      .attr("width", trackHeight * dotRatio )
      .style("fill", function(d){ return dotColor(1) })
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

    var dot = track.append("g")
      .attr("class","dotGroup")
      .append("rect")
      .attr("class","dot")
      .attr("x", function(d){
        return ( (d3.min([0,d.admission]) * -1 / d.sentence)*width - (trackHeight * dotRatio * .5) )
      })
      .attr("y", trackHeight*(1-dotRatio)*.5)
      .attr("height", trackHeight * dotRatio )
      .attr("width", trackHeight * dotRatio )
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




  };



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
      .attr("x", function(d){
        console.log(((d3.min([0,d.admission]) * -1 / d.sentence)*width))
        return ((d3.min([0,d.admission]) * -1 / d.sentence)*width - (trackHeight * dotRatio * .5))
      })
      .style("fill", function(d){ return dotColor(d.sentence) })
      .style("opacity",0)
  }

    function flyOut(node){
    d3.select(node)
    .style("fill", "#fdbf11")
    d3.select(node.parentNode)
    .transition()
    .duration(1000)
    .attr("transform",function(){
    var xx = node.getBoundingClientRect().left
    var xy = node.getBoundingClientRect().top
    var angle = (Math.round(Math.random()) * 2 - 1) * Math.random() * 100
    var dist = Math.random() * 1000
    return "translate(" +dist+ ") rotate(" + angle + " " + xx + " " + xy + ")"
    })
    .each("end", function(){
    d3.select(node.parentNode).attr("transform","")
    })
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
.attr("x", function(d){
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
.attr("x", function(d){ return width * (d.lengthOfStay/d.sentence) - (trackHeight * dotRatio * .5)})
.each("start",function(d,i){
if(i == 0){
pauseAnimation(width)
}
})
.each("end", function(d){
flyOut(this)
d3.select(this.parentNode.parentNode)
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
d3.select(this.parentNode.parentNode)
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
      return "#1696d2"
    }else{
      return "#000000";
    }
    // var ramp=d3.scale.linear().domain([1,20]).range(["#1696d2","#fdbf11"]);
    // return ramp(sentence)
  }
  function yearsToMS(year){
    return (d3.max([0,year]) * YEAR_IN_MS) + 100
  }

  function pauseAnimation(width){
    var bounceLength = 20,
        pauseDuration = 800;
    d3.selectAll(".dot")
      .transition()
      .ease("expOut")
      .duration(pauseDuration)
      .attr("x", function(d){
        var dotx = ( (width * (d.lengthOfStay/d.sentence)) - parseFloat(d3.select(this).attr("x")) > bounceLength) ? parseFloat(d3.select(this).attr("x")) + bounceLength : parseFloat(d3.select(this).attr("x")) + .5*((width * (d.lengthOfStay/d.sentence)) - +d3.select(this).attr("x"))
        return dotx
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
    activateFunctions[0] = topOfPage;
    activateFunctions[1] = introAreaChart;
    activateFunctions[2] = function(){ console.log("blank step");};
    activateFunctions[3] = showSingleDot;
    activateFunctions[4] = admissionsExample;
    activateFunctions[5] = lengthOfStayExample;
    activateFunctions[6] = oneYearSentences;
    activateFunctions[7] = longerSentences;
    activateFunctions[8] = longerSentencesFasterAdmission;
    activateFunctions[9] = fewerShortSentences;
    activateFunctions[10] = shortSentenceEarlyRelease;
    activateFunctions[11] = hideIntro;


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


function topOfPage(){
d3.select("html")
.classed("imgBg", true)
.classed("noBg", false)

d3.select("#backgroundBlocker")
.transition()
.style("background-color", "rgba(255,255,255,0)")

d3.select("#areaSvg")
.transition()
.style("opacity",0)


d3.select("#titleText")
  .transition()
  .style("opacity",1)
d3.select("#titleText span i")
.transition()
.style("opacity",1)
}

  function introAreaChart() {
var x = d3.scale.linear().domain([1925, 2015]).range([0, areaWidth]);
var y = d3.scale.linear().domain([1600000,0]).range([0, areaHeight]);
var rightEdge = d3.select("#titleText span").node().getBoundingClientRect().right
var topEdge = d3.select("#titleText span").node().getBoundingClientRect().top
d3.select("#areaSvg")
.transition()
.style("opacity","1")
d3.select("#titleText span i")
.transition()
.style("opacity","0")


    hideSingleDot()
    d3.select(".prisonBG")
      .transition()
      .style("opacity",0)



d3.select("#leftBorder")
.transition()
.delay(4200)
.duration(2000)
.attr("y2",y(79526.05109))
.each("end", function(){
d3.select(this)
.transition()
.attr("stroke","#094c6b")
})
d3.select("#rightBorder")
.transition()
.delay(7000)
.duration(400)
.ease("linear")
.attr("y2",y(1476847))
.each("end", function(){
d3.select(this)
.transition()
.attr("stroke","#094c6b")
})
d3.select("#extractedLine")
.transition()
.delay(5700)
.duration(2000)
.ease("linear")
.attr("stroke-dashoffset", 0)
.each("end", function(){
d3.select(this)
.transition()
.attr("stroke","#094c6b")
})
d3.select("#extractedArea")
.transition()
.delay(6100)
.duration(2000)
.ease("circleOut")
.style("opacity", "1")
.each("end", function(){
d3.select(this)
.transition()
.attr("stroke","#094c6b")
})

// d3.select("#bar")
//  .transition()
//  .delay(3400)
//  .duration(2000)
//  .attr("width", width)

d3.select("#titleText")
.transition()
.delay(1000)
.duration(1000)
.style("opacity",0)
d3.select("#backgroundBlocker")
.transition()
.delay(1000)
.duration(1000)
.style("background-color", "rgba(255,255,255,1)")

setTimeout(function(){
d3.select("html")
.classed("imgBg", false)
.classed("noBg", true)
}, 1700)




var newLoc = (areaHeight + topEdge + 10)*.5
d3.select("#dummyTopDot")
.transition()
.delay(1000)
.duration(1200)
.ease("linear")
.attr("cy", newLoc)
.transition()
.duration(0)
.style("opacity",0)

d3.select("#dummyBottomDot")
.transition()
.delay(1000)
.duration(1200)
.ease("linear")
.attr("cy", newLoc)
.transition()
.duration(0)
.style("opacity",0)

d3.select("#areChartBaseline")
.transition()
.delay(3050)
.duration(2100)
.attr("width", areaWidth+200)
.attr("x",-100)
.each("end", function(){
d3.select(this)
.transition()
.delay(2000)
.attr("fill","#094c6b")
})

d3.select("#dotTop")
.attr("cy", newLoc)
.transition()
.delay(1600)
.duration(1000)
.ease("linear")

.attr("r",15)
.attr("cy", newLoc+15)
.transition()
.duration(1200)
.ease("linear")
.attr("cy", areaHeight + 60)

d3.select("#dotBottom")
.attr("cy", newLoc-60)
.transition()
.delay(1600)
.duration(1000)
.ease("linear")

.attr("r",15)
.attr("cy", newLoc+15)
.transition()
.duration(1200)
.ease("linear")
.attr("cy", areaHeight + 60)
    
  }

  function hideAreaChart(){
    d3.select("#areaSvg")
      .transition()
      .style("opacity", 0)
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
      .attr("x", 0)
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
      .attr("x", 0)
      .transition()
      .style("opacity",0)


  }

  function showSingleDot(){
    resetIntro(1)
    hideAreaChart();

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
      .attr("x", function(){ return (width- .5*(trackHeight * dotRatio)) + "px"})
      .each("end", function(){
        flyOut(this)
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
      .attr("x", function(){ return (width- .5*(trackHeight * dotRatio)) + "px"})
      .each("end", function(){
        flyOut(this)
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
function display(animationData, lineData, areaData) {
  // create a new plot and
  // display it
  var plot = scrollVis();
  d3.select("#vis")
    .datum([animationData, lineData, areaData])
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
    // d3.selectAll('.step')
      // .style('opacity',  function(d,i) { return i == index ? 1 : 0.1; });

    var stepText = d3.select(d3.selectAll(".step")[0][index]).html()

    // var opacityNew = (index%2 == 0) ? 0 : 1;
    // var opacityOld = (index%2 == 0) ? 1 : 0;

    console.log(index, stepText)

    if(index%2 == 0){
      d3.select("#bodyNew")
        .html(stepText)
        .transition()
        .duration(2000)
        .style("opacity",1)

      d3.select("#bodyOld")
        // .html(stepText)
        .transition()
        .duration(1000)
        .style("opacity",0)
        .each("end", function(){
          d3.select(this).html(stepText)
        })
      }else{
      d3.select("#bodyOld")
        .html(stepText)
        .transition()
        .duration(2000)
        .style("opacity",1)

      d3.select("#bodyNew")
        // .html(stepText)
        .transition()
        .duration(1000)
        .style("opacity",0)
        .each("end", function(){
          d3.select(this).html(stepText)
        })
      }

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
    d3.csv("data/extracted-animation-data.csv", function(areaData){
      display(animationData, lineData, areaData)
    });
  });
});

