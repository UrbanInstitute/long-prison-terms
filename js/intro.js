function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

var IS_SHORT = function(){
  return (d3.select("#isShort").style("display") == "block")
}
var IS_PHONE = function(){
  return (d3.select("#isPhone").style("display") == "block")
}
var IS_MOBILE = function(){
  return (d3.select("#isMobile").style("display") == "block")
}
var IS_TABLET = function(){
  return (d3.select("#isTablet").style("display") == "block")
}
var BREAK1 = function(){
  return (d3.select("#break1Marker").style("display") == "block")
}
var SECTION_INDEX = function(){
  return d3.select("#sectionIndex").attr("data-index")
}
var ACTIVE_CONTAINER = function(){
  if(d3.select("#animationButton").classed("active")){
    return "animation"
  }else{
    return "linechart"
  }
}
d3.select("#animationButton")
  .on("click", function(){
    showAnimation();
  })
d3.select("#lineButton")
  .on("click", function(){
      showLine();
  })


var visGutter = function(animationComp){
  if(IS_PHONE()){
    return 0;
  }
  else if(IS_TABLET()){
    return 0;
  }
  else if(IS_MOBILE()){
    return (window.innerWidth - 698)*.5
  }
  else if(BREAK1()){
    if(animationComp){
      return (window.innerWidth - 1226 + 100)*.5
    }else{
      return (window.innerWidth - 1226)*.5
    }
  }else{
    return (window.innerWidth - 1226)*.5
  }
}

var getAnimationLeft = function(singleDot){
  if(singleDot){
    if(IS_PHONE()){
      return "22.5px"
    }
    else if(IS_TABLET()){
      return "92.5px"
    }
    else if(IS_MOBILE()){
      return (visGutter(true) + 160) + "px"  
    }else{
      return (visGutter(true) + 180) + "px"  
    }
  }
  else if(IS_PHONE()){
    if(ACTIVE_CONTAINER() == "animation"){
      return "10px"
    }else{
      return ((60 + 10) - (window.innerWidth - 100 + 35 ))  + "px"
    }
  }
  else if(IS_TABLET()){
    if(ACTIVE_CONTAINER() == "animation"){
      return "53px"
    }else{
      return ((180 + 10) - (window.innerWidth - 240 + 35 ))  + "px"
    }
  }
  else{
    return visGutter(true) + "px"
  }



        
}

function showLine(){
  if(d3.select("#lineButton").classed("active")){
      return false
  }
  d3.selectAll(".lineButtonElement").classed("active", true)
  d3.selectAll(".animationButtonElement").classed("active", false)
  
  if(IS_PHONE()){
    d3.select("#vis")
      .transition()
      .style("left", function(){
        return ((60 + 10) - (window.innerWidth - 100 + 35 ))  + "px"
      })
    d3.selectAll(".animationComponents")
      .transition()
      .style("transform", function(){
        return "translateX(" + ((60 + 10) - (window.innerWidth - 100 + 35 ))  + "px)"
      })
    d3.select("#lineChart")
      .transition()
      .style("width", function(){
        return (window.innerWidth - 63 + 14) + "px"
      })
      .style("left", "13px")
  }
  else if(IS_TABLET()){
    d3.select("#vis")
      .transition()
      .style("left", function(){
        return ((180 + 10) - (window.innerWidth - 240 + 35 ))  + "px"
      })
    d3.selectAll(".animationComponents")
      .transition()
      .style("transform", function(){
        return "translateX(" + ((180 - 40) - (window.innerWidth - 240 + 35 )) + "px)"
      })
    d3.select("#lineChart")
      .transition()
      .style("width", function(){
        return (window.innerWidth - 300 + 90) + "px"
      })
      .style("left", "163px")
  }

}
function showAnimation(){
  if(d3.select("#animationButton").classed("active")){
      return false
  }
  d3.selectAll(".lineButtonElement").classed("active", false)
  d3.selectAll(".animationButtonElement").classed("active", true)

  if(IS_PHONE()){
    d3.select("#vis")
      .transition()
      .style("left", function(){
        return getAnimationLeft(false);
      })
    d3.selectAll(".animationComponents")
      .transition()
      .style("transform", function(){
        return "translateX(0px)"
      })
    d3.select("#lineChart")
      .transition()
      .style("width", "180px")
      .style("left", (window.innerWidth - 110) + "px")
  }
  else if(IS_TABLET()){
    d3.select("#vis")
      .transition()
      .style("left", function(){
        return getAnimationLeft(false);
      })
    d3.selectAll(".animationComponents")
      .transition()
      .style("transform", function(){
        return "translateX(0px)"
      })
    d3.select("#lineChart")
      .transition()
      .style("width", "180px")
      .style("left", (window.innerWidth - 180) + "px")
  }
}




/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function() {
  // constants to define the size
  // and margins of the vis area.

  var AREA_ANIMATING = false;
  var WIDTH, LINEWIDTH, HEIGHT, LINEHEIGHT;
  if(IS_PHONE()){
    WIDTH = window.innerWidth - 100 + 35;
    LINEWIDTH = window.innerWidth - 63 + 14; 
  }
  else if(IS_TABLET()){
    WIDTH = window.innerWidth - 240 + 35;
    LINEWIDTH = window.innerWidth - 240 - 14; 
  }
  else if(IS_MOBILE()){
    WIDTH = 370;
    LINEWIDTH = 390;
  }
  else if (BREAK1()){
    WIDTH = 370;
    LINEWIDTH = 390;
  }else{
    WIDTH = 420;
    LINEWIDTH = 390;
  }

  if(IS_PHONE()){
    HEIGHT = 300;
    LINEHEIGHT = 320;
  }else{
    HEIGHT = 517;
    LINEHEIGHT = 537
  }
  var margin = {top: 72, right: 5, bottom: 10, left: 25},
    width = WIDTH - margin.left - margin.right,
    height = HEIGHT - margin.top - margin.bottom

  var lineMargin = {top: 75, right: 60, bottom: 30, left: 30},
    lineWidth = LINEWIDTH - lineMargin.left - lineMargin.right,
    lineHeight = LINEHEIGHT - lineMargin.top - lineMargin.bottom;

  var YEAR_IN_MS = 2000,
    MAX_BARS = 50

  var FILLED_TRACK_COLOR = "#e3e3e3"
  var EMPTY_TRACK_COLOR = "#12719e"
  var EXITING_TRACK_COLOR = "#052635"


  var areaMargin = {
  top: 160,
  right: 0,
  bottom: 36,
  left: 0
  };
  var screenHeight = window.innerHeight - 200
  var areaWidth = window.innerWidth - areaMargin.left - areaMargin.right - 0,
  areaHeight = Math.min(screenHeight, window.innerHeight - areaMargin.top - areaMargin.bottom - 20);



  // Keep track of which visualization
  // we are on and which was the last
  // index activated. When user scrolls
  // quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // sizing constants for intro track
  var trackRatio = .65,
    dotRatio = .8
    


  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  var lineSvg = null;

  var areaSvg = null;

  var breadCrumbSvg = null;

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
        if(IS_PHONE()){
          return false;
        }
        else if(d3.select(this).style("opacity") == 0){
          return false;
        }else{
          d3.select(this)
            .classed("highlight", true)
          d3.select(".line.step_" + d3.select(this).attr("data-key"))
            .classed("highlight", true)
        }
      })
      .on("mouseout", function(){
        if(IS_PHONE()){
          return false;
        }else{
          d3.selectAll(".highlight").classed("highlight", false)
        }
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
            .style("z-index",-1)
        .append("g")
            .attr("transform", 
                  "translate(" + lineMargin.left + "," + lineMargin.top + ")");


      breadCrumbSvg = d3.select("#breadCrumb")
        .append("svg")
            .attr("class","introLineChart")
            .attr("width", function(){
              if(IS_TABLET()){
                return 79
              }else{
                return 16
              }
            })
            .attr("height", window.innerHeight)
        .append("g")

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

    if(IS_PHONE()){
      if(ACTIVE_CONTAINER() == "animation"){
        d3.select("#lineChart")
          .style("left", (window.innerWidth - 110) + "px")
      }
      d3.select("#breadCrumb")
        .style("left", "0px")
      d3.select("#legend")
        .style("margin-left", "10px")
      d3.selectAll(".animationComponents")
        .style("margin-left", "0px")
      d3.select("#animationTick0")
        .style("margin-left", "10px")
      d3.select("#sections")
        .style("left", ((window.innerWidth - 300)*.5) + "px") 
      d3.select("#animationTick100")
        .style("left", ((window.innerWidth - 75) + "px")) 
      d3.select("#animationTick50")
        .style("left", ((window.innerWidth - 130)*.5 + 40) + "px")
      d3.select("#animationLabel")
        .style("left", ((window.innerWidth - 180)*.5 + 40) + "px")
      d3.select("#axisLabelX")
        .style("left", ((window.innerWidth - 63 + 14)*.5 - 29)+ "px")
      // d3.selectAll(".lineLabel")
      //   .style("transform", "translateX(" + (window.innerWidth - 240 - 14 - 395) + "px)")

    }
    else if(IS_TABLET()){
      if(ACTIVE_CONTAINER() == "animation"){
        d3.select("#lineChart")
          .style("left", (window.innerWidth - 180) + "px")
      }
      d3.select("#breadCrumb")
        .style("left", "0px")
      d3.select("#legend")
        .style("margin-left", "53px")
      d3.selectAll(".animationComponents")
        .style("margin-left", "0px")
      d3.select("#animationTick0")
        .style("margin-left", "53px")
      d3.select("#sections")
        .style("left", ((window.innerWidth - 400)*.5) + "px") 
      d3.select("#animationTick100")
        .style("left", ((window.innerWidth - 205 + 33) + "px")) 
      d3.select("#animationTick50")
        .style("left", ((window.innerWidth - 205)*.5 + 53) + "px")
      d3.select("#animationLabel")
        .style("left", ((window.innerWidth - 205)*.5 + 28) + "px")
      d3.selectAll(".lineLabel")
        .style("transform", "translateX(" + (window.innerWidth - 240 - 14 - 395) + "px)")
      d3.select("#axisLabelX")
        .style("left", "210px")
    }else if(IS_MOBILE()){

      var gutter = visGutter(false);
      var bGutter = visGutter(true)
      d3.selectAll(".animationComponents")
        .style("margin-left", bGutter + "px")
      d3.select("#lineChart")
        .style("left", (320 + gutter) + "px")
      d3.select("#breadCrumb")
        .style("left", (-21 + gutter) + "px")
      d3.select("#sections")
        .style("left", ((window.innerWidth - 400)*.5) + "px") 
      d3.select("#animationTick100")
        .style("left", null) 
      d3.select("#animationTick50")
        .style("left", null)
      d3.select("#animationLabel")
        .style("left", null)
      d3.selectAll(".lineLabel")
        .style("transform", "translateX(0px)")
    }else{
      var gutter = visGutter(false);
      var bGutter = visGutter(true)
      d3.selectAll(".animationComponents")
        .style("margin-left", bGutter + "px")
      d3.select("#lineChart")
        .style("left", (370 + gutter) + "px")
      d3.select("#breadCrumb")
        .style("left", (810 + gutter) + "px")
      d3.select("#sections")
        .style("left", (850 + gutter) + "px")
      d3.select("#animationTick100")
        .style("left", null) 
      d3.select("#animationTick50")
        .style("left", null)
      d3.select("#animationLabel")
        .style("left", null)
      d3.selectAll(".lineLabel")
        .style("transform", "translateX(0px)")

    }
    //temp line
    if(IS_MOBILE()){
      d3.select("#beyonceBox")
        .text("the box below")
    }else{
      d3.select("#beyonceBox")
        .text("the box to the left")
    }
    breadCrumbSvg
      .style("opacity",0)
    breadCrumbSvg.append("rect")
      .attr("width",function(){
        if(IS_PHONE()){
          return 35;
        }
        else if(IS_TABLET()){
          return 75;
        }else{
          return 1;
        }
      })
      .attr("height", function(){
        if(IS_TABLET()){
          return window.innerHeight;
        }else{
          return 0;
        }
      })
      .style("fill", function(){
        if(IS_TABLET()){
          return "#ffffff"
        }else{
          return "#d2d2d2"
        }
      })
      .attr("x",function(){
        if(IS_TABLET()){
          return 0;
        }else{
          return 8;
        }
      })
      .attr("y",0)
      .style("opacity", function(){
        if(IS_MOBILE() && !IS_TABLET()){
          return 0;
        }else{
          return 1;
        }
      })

    for(var i = 1; i < 7; i++){
      breadCrumbSvg.append("circle")
        .attr("class", "crumb")
        .attr("id", "crumb" + i)
        .datum(i)
        .attr("cx", function(){
          if(IS_PHONE()){
            return 18;
          }
          else if(IS_TABLET()){
            return 40;
          }else{
            return 8;
          }
        })
        .attr("cy", 0)
        .attr("r", function(){
          if(IS_PHONE()){
            return 5;
          }else{
            return 6.5;
          }
        })
        .on("click", function(d){
          $('html,body').animate({
                scrollTop: $($(".step")[d]).offset().top + 200
            }, 2000, 'swing');
        })

    }


    var data = allData.filter(function(d){return d.step == 3});


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
      .attr("cx", rightEdge -18 +8)
      .attr("cy", topEdge + 13 - 141)
      .attr("r",5)

    var dotBottom = colonWrapper.append("circle")
      .attr("id", "dotBottom")
      .attr("cx", rightEdge - 18 +8)
      .attr("cy", topEdge + 43 - 141)
      .attr("r",5)

    var dummyTopDot = dummyWrapper.append("circle")
      .attr("id", "dummyTopDot")
      .attr("cx", rightEdge  -18 +8)
      .attr("cy", topEdge + 13 -141)
      .attr("r",5)
      .style("opacity",1)
      .style("z-index",1)

    var dummyBottomDot = dummyWrapper.append("circle")
      .attr("id", "dummyBottomDot")
      .attr("cx", rightEdge - 18 + 8)
      .attr("cy", topEdge + 43 -141)
      .attr("r",5)
      .style("opacity",1)
      .style("z-index",1)

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

    // var popText = dummyWrapper.append("text")
    //   .attr("id","popText")
    //   .attr("text", )


  var popText = dummyWrapper
      .append("g")
      .attr("id", "popText")

  popText.append("text")
    .attr("id","popTextNum")
    .text("79526")
    .attr("dx", 12)
    .attr("dy", 4)
    .style("opacity","0")
  
  
  popText
    .attr("transform", "translate(10," + (y(79526)) + ")")
    // .style("opacity",0)
    // .style("z-index",-1)

  popText
    // .append("polygon")
    .append("circle")
    .attr("id", "popTextCircle")
      .attr("r", 4)
      .attr("fill", "#fff")
      .attr("stroke","#000")
      .attr("stroke-width", "4")
    .style("opacity",0)
    .style("z-index",-1)


    var totalLength = path.node().getTotalLength();

    path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)



    trackHeight = d3.max([height/data.length, height/MAX_BARS])
    singleTrackHeight = trackHeight * 2.5;

    //intro background
    g.append("rect")
      .attr("class","prisonBG")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f2f2f2")
      .attr("stroke", "none")
      .style("opacity",0)
      .style("z-index",-1)

    var stackBackground =  g.append("rect")
      .attr("class","stackBackground")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", EMPTY_TRACK_COLOR)
      .attr("stroke", "none")
      .style("opacity",0)
      .style("z-index",-1)

    var singleTrack = g
      .append("g")
      .attr("class", "singleTrackGroup")
      .attr("transform", function(d, i){
        return "translate(0, " + (height-singleTrackHeight) + ")"
      })
    var slowSingleTrack = g
      .append("g")
      .attr("class", "slowSingleTrackGroup")
      .attr("transform", function(d, i){
        return "translate(0, " + (height-2*singleTrackHeight) + ")"
      })

    singleTrack.append("rect")
      .attr("class", "singleTrackEmpty singleDotElement")
      .attr("width", width + "px")
      .attr("height", (singleTrackHeight*trackRatio) + "px")
      .attr("y",(1-trackRatio)*.5*singleTrackHeight)
      .attr("fill", EMPTY_TRACK_COLOR)
      .style("opacity", 0)
      .style("z-index",-1)

    singleTrack.append("rect")
      .attr("class", "singleTrackFilled singleDotElement")
      .attr("width", "0px")
      .attr("height", (singleTrackHeight*trackRatio) + "px")
      .attr("y",(1-trackRatio)*.5*singleTrackHeight)
      .attr("fill", FILLED_TRACK_COLOR)
      .style("opacity", 0)
      .style("z-index",-1)

    singleTrack.append("g")
      .attr("class","dotGroup")
      .append("rect")
      .attr("class","singleDot singleDotElement")
      .attr("x", 0)
      .attr("y", singleTrackHeight*(1-dotRatio)*.5)
      .attr("height", singleTrackHeight * dotRatio )
      .attr("width", singleTrackHeight * dotRatio )
      .style("fill", function(d){ return dotColor(1) })
      .style("opacity", 0)
      .style("z-index",-1)



    slowSingleTrack.append("rect")
      .attr("class", "slowSingleTrackEmpty singleDotElement")
      .attr("width", width + "px")
      .attr("height", (singleTrackHeight*trackRatio) + "px")
      .attr("y",(1-trackRatio)*.5*singleTrackHeight)
      .attr("fill", EMPTY_TRACK_COLOR)
      .style("opacity", 0)
      .style("z-index",-1)

    slowSingleTrack.append("rect")
      .attr("class", "slowSingleTrackFilled singleDotElement")
      .attr("width", "0px")
      .attr("height", (singleTrackHeight*trackRatio) + "px")
      .attr("y",(1-trackRatio)*.5*singleTrackHeight)
      .attr("fill", FILLED_TRACK_COLOR)
      .style("opacity", 0)
      .style("z-index",-1)

    slowSingleTrack.append("g")
      .attr("class","dotGroup")
      .append("rect")
      .attr("class","slowSingleDot singleDotElement")
      .attr("x", 0)
      .attr("y", singleTrackHeight*(1-dotRatio)*.5)
      .attr("height", singleTrackHeight * dotRatio )
      .attr("width", singleTrackHeight * dotRatio )
      .style("fill", function(d){ return dotColor(1) })
      .style("opacity", 0)
      .style("z-index",-1)



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
      .attr("fill", "none")
      .style("opacity", 0)
      .style("z-index",-1)

    track.append("rect")
      .attr("class", "trackFilled")
      .attr("width", function(d){
        return (d3.min([0,d.admission]) * -1 / d.sentence)*width + "px"
      })
      .attr("height", (trackHeight*trackRatio) + "px")
      .attr("y",(1-trackRatio)*.5*trackHeight)
      .attr("fill", FILLED_TRACK_COLOR)
      .style("opacity", 0)
      .style("z-index",-1)

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
      .style("z-index",-1)

    //line chart
    d3.select("#lineChart")
      .style("opacity",0)
      .style("z-index",-1)

    var lineX = d3.scale.linear().range([0, lineWidth]);
    var lineY = d3.scale.linear().range([lineHeight, 0]);

    var lineXAxis = d3.svg.axis().scale(lineX)
        .orient("bottom").ticks(0).outerTickSize(0);

    var lineYAxis = d3.svg.axis().scale(lineY)
        .orient("left").ticks(0).outerTickSize(0);

    var countline = d3.svg.line()
        .x(function(d) { return lineX(d.time); })
        .y(function(d) { return lineY(d.count); });


    lineData.forEach(function(d) {
      d.time = +d.time
      d.count = +d.count;
    });

    // Scale the range of the data
    lineX.domain([0,9]);
    lineY.domain([0, MAX_BARS]); 

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
                if(IS_PHONE()){
                  return false;
                }else{
                  d3.select(this)
                    .classed("highlight", true)
                  if(d3.select("#lineLabel_" + key).style("opacity") != 0){
                    d3.select("#lineLabel_" + key)
                      .classed("highlight", true)
                  }
                }
            })
            .on("mouseout", function(){
              if(IS_PHONE()){
                return false;
              }else{
                d3.selectAll(".highlight").classed("highlight", false)
              }
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
      .style("z-index",-1)
    d3.selectAll(".trackFilled")
    .data(data)
      .transition()
      .attr("width", function(d){
        return (d3.min([0,d.admission]) * -1 / d.sentence)*width + "px"
      })
      .style("opacity",0)
      .style("z-index",-1)

    d3.selectAll(".dot")
    .data(data)
      .transition()
      .attr("x", function(d){
        return ((d3.min([0,d.admission]) * -1 / d.sentence)*width - (trackHeight * dotRatio * .5))
      })
      .style("fill", function(d){ return dotColor(d.sentence) })
      .style("opacity",0)
      .style("z-index",-1)
  }

  function flyOut(node){
    d3.select(node)
      .transition()
      .duration(0)
      .style("fill", EXITING_TRACK_COLOR)
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
  function showBreadcrumbs(){
      breadCrumbSvg
        .transition()
        .duration(100)
        .style("opacity",1)
      breadCrumbSvg.select("rect")
        .transition()
        .duration(1000)
        .delay(100)
        .attr("height", window.innerHeight)
      breadCrumbSvg.selectAll("circle")
        .transition()
        .duration(1000)
        .delay(100)
        .attr("cy", function(d){
          if(IS_PHONE()){
            var crumbStart = window.innerHeight*.5 - 120 + 114;
            return crumbStart + (d-1)*22   
          }
          else if(IS_MOBILE()){
            var crumbStart = window.innerHeight*.5 - 217.5 +  80 + 114
            return crumbStart + (d-1)*36   
          }else{
            var crumbStart = window.innerHeight*.5 - 217.5 +  80
            return crumbStart + (d-1)*64.5            
          }

        })
  }
  function hideBreadCrumbs(){
      breadCrumbSvg
        .transition()
        .delay(1000)
        .duration(100)
        .style("opacity",0)
      breadCrumbSvg.select("rect")
        .transition()
        .duration(1000)
        .attr("height", 0)
      breadCrumbSvg.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("cy", 0)
  }
  function updateStackBackground(pause){
    var tracks = 0;
    if(pause){
      tracks = d3.selectAll(".trackGroup.visible.active")[0].length
    }else{
    // var tracks = 0;
      d3.selectAll(".dot.active").each(function(d){
        if(d3.select(this).style("opacity") != 0){
          tracks += 1;
        }
      })
    }
    d3.select(".stackBackground")
      .transition()
      .ease("linear")
      .attr("height", tracks*trackHeight)
      .attr("y", height - tracks*trackHeight)
  }


  function animateIntro(step){
    var data = d3.select("#vis svg").data()[0]
      .filter(function(d){ return +d.step == +step})
      .sort(function(a, b) {
        return parseFloat(b.admission) - parseFloat(a.admission)
      });


    g.data(data)

    g.select(".prisonBG")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
    g.select(".stackBackground")
      .transition()
      .style("opacity",1)
      .style("z-index",1)


    g
      .selectAll(".trackGroup")
      .classed("visible",true)
      .style("opacity",1)
      .style("z-index",1)
      .data(data)
      .transition("foo")
      .duration(350)
      .delay(400)
      .attr("transform", function(d, i){
        return "translate(0,"  + ((i - (data.length  - MAX_BARS))*trackHeight) + ")"
      })



    d3.selectAll(".trackEmpty")
    .data(data)
    .transition()
    .duration(350)
    .style("opacity",0)
    .style("z-index",-1)
    .transition()
    .delay(function(d){ return yearsToMS(d.admission)}) 
    .style("opacity", function(d){
      if(+d.sentence == 0){
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
    .style("z-index",-1)
    .transition()
    .delay(function(d){ return 350 + yearsToMS(d.admission)}) 
    .style("opacity", function(d){
      if(+d.sentence == 0){
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


.attr("width", function(d){
  if(d.lengthOfStay == 0){ return 0}
  else { return width * (d.lengthOfStay/d.sentence) + "px"}
})

d3.selectAll(".dot")
.data(data)
.transition()
.duration(350)
.attr("x", function(d){
  // return (d3.min([0,d.admission]) * -1 / d.sentence)*width
  return 0
})
.each("start", function(d,i){
  if(i == 0){
    var comma = d3.format(",")
    d3.select(".stackBackground")
      .transition()
      .ease("linear")
      .attr("height", 0)
      .attr("y", height)
      .style("opacity",1)
      .style("z-index",1)

  }
})
.style("fill", function(d){ return dotColor(d.sentence) })
.style("opacity",0)
.style("z-index",-1)
.transition()
.delay(function(d){ return 350 + yearsToMS(d.admission)}) 
      .style("opacity", function(d){
        if(+d.sentence == 0){
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
.attr("x", function(d){
  if(d.lengthOfStay == 0){ return 0}
  else {return width * (d.lengthOfStay/d.sentence) - (trackHeight * dotRatio * .5)}
})
.each("start",function(d,i){
  updateStackBackground(false)
if(i == 0){
pauseAnimation(width)
}
})
.each("end", function(d){
  updateStackBackground(false);
  if(d.lengthOfStay != 0){
    flyOut(this)
  }else{
    d3.select(this.parentNode).attr("transform","")
  }
  var duration1 = (d.lengthOfStay == 0) ? 0 : 100
  var duration2 = (d.lengthOfStay == 0) ? 0 : 200
  var delay = (d.lengthOfStay == 0) ? 0 : 200

  d3.select(this.parentNode.parentNode)
    .classed("inactive", true).classed("active", false)
    .select(".trackFilled")
    .transition("fade-out")
    .duration(duration1)
    .style("fill", EXITING_TRACK_COLOR)
  d3.select(this.parentNode)
    .selectAll("rect")
    .transition("fade-out")
    .delay(delay)
    .duration(duration1)
    .ease("linear")
    .style("opacity",0)
    .style("z-index",-1)
    .each("end", function(){
      d3.select(this.parentNode.parentNode)
        .classed("visible",false)
        .transition("fade-out")
        .duration(0)
        .style("opacity",0)
        .style("z-index",-1)

      d3.selectAll(".trackGroup")
        .transition()
        .duration(duration1)
        .attr("transform", function(){
          var top = this.getBoundingClientRect().top
          var count = 0;
          var gs = d3.selectAll(".trackGroup.visible")
          gs[0].forEach(function(g){
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
    var lowOpacity = (IS_PHONE()) ? 0 : .2
    for(var k = key-1; k >= 3; k--){
      d3.select(".curtain_" + k)
        .transition()
        .duration(0)
        .attr("width",0)
        .attr("x", lineWidth)
      d3.select(".line.step_" + k)
        .transition()
        .style("opacity",.5)
        .style("stroke","#ec008b")
      d3.select("#lineLabel_" + k)
        .transition()
        .style("opacity",lowOpacity)
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
    var lineColor = (IS_PHONE()) ? "#fdbf11" : "#ec008b"
    d3.select(".line.step_" + key)
        .transition()
        .style("opacity",1)
        .style("z-index",1)
        .style("stroke",lineColor)
    d3.select(".curtain_" + key)
        .transition()
        .duration(10)
        .attr("width",lineWidth)
        .attr("x", 0)
        .transition()
        .delay(1000)
        .duration(8.7*YEAR_IN_MS)
        .ease("linear")
        .attr("width",0)
        .attr("x", lineWidth)
      var labelMultiplier = (key == 5) ? 6 : 8;
      var phoneMultiplier = (IS_PHONE()) ? 0 : 1;
      var textColor = (IS_PHONE()) ? "#fdbf11" : "#000"
      d3.select("#lineLabel_" + key)
        .transition()
        .duration(10)
        .style("opacity",0)
        .transition()
        .delay(labelMultiplier*phoneMultiplier*YEAR_IN_MS)
        .style("opacity",1)
        .style("color",textColor)
        .style("z-index",1)
        .style("pointer-events","all")


  }
  function dotColor(sentence){
    if(sentence >= 5){
      return "#73bfe2"
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
    updateStackBackground(true);
    var bounceLength = 20,
        pauseDuration = 800;

    d3.selectAll(".trackFilled")
    .transition()
    .ease("expOut")
    .duration(pauseDuration)
    .attr("width", function(d){
      var w;
      if(+d.sentence == 0){
        w = 0
      }else{
        w = ( (width * (d.lengthOfStay/d.sentence)) - parseFloat(d3.select(this).attr("width").replace("px","")) > bounceLength) ? parseFloat(d3.select(this).attr("width").replace("px","")) + bounceLength : parseFloat(d3.select(this).attr("width").replace("px","")) + .5*((width * (d.lengthOfStay/d.sentence)) - +d3.select(this).attr("width").replace("px",""))
      }
      d3.select(d3.select(this).node().parentNode).select(".dot")
        .transition()
        .ease("expOut")
        .duration(pauseDuration)
        .attr("x", w + "px")
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
    activateFunctions[2] = showSingleDot;
    activateFunctions[3] = oneYearSentences;
    activateFunctions[4] = longerSentences;
    activateFunctions[5] = longerSentencesFasterAdmission;
    activateFunctions[6] = fewerShortSentences;
    activateFunctions[7] = shortSentenceEarlyRelease;
    activateFunctions[8] = hideIntro;


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
// .classed("imgBg", true)
// .classed("noBg", false)
.transition()
.attr("class","imgBg")

d3.select("#backgroundBlocker")
.transition()
.style("background-color", "rgba(255,255,255,0)")

hideAreaChart();

    d3.select("#lineChart")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)

d3.selectAll(".titleElement")
  .transition()
  .style("opacity",1)
  .style("z-index",1)
d3.select("#areaChartText")
    .transition()
    .style("opacity",0)

// d3.select("#titleText span i")
// .transition()
// .style("opacity",1)
// .style("z-index",1)
}

  function introAreaChart() {
    hideBreadCrumbs()
   d3.select("#vis")
    .transition()
    .style("opacity",0)
    .style("z-index",-1)
   d3.select("#areaSvg")
    .transition()
    .style("opacity",1)
    .style("z-index",2)
   d3.select("#areaChartText")
    .transition()
    .style("opacity",1)



    var x = d3.scale.linear().domain([1925, 2015]).range([0, areaWidth]);
    var y = d3.scale.linear().domain([1600000,0]).range([0, areaHeight]);
    function translateAlong(path) {
      var l = path.getTotalLength();
      return function(d, i, a) {
        return function(t) {
          var p = path.getPointAtLength(t * l);
          return "translate(" + p.x + "," + p.y + ")";
        };
      };
    }

    d3.select("#lineChart")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)

d3.select("#areaSvg")
.transition()
.style("opacity",1)
d3.selectAll(".titleElement")
.transition()
.style("opacity","0")
.style("z-index",-1)

d3.select("#backgroundBlocker")
.transition()
.delay(1500)
.duration(1000)
.style("background-color", "rgba(255,255,255,1)")

d3.select("html")
.transition()
.attr("class","noBg")

if(!AREA_ANIMATING){
  var ptDy = (IS_MOBILE()) ? -40 : -30;
  d3.select("#popTextNum")
    .transition()
    .delay(1800)
    .style("opacity","0")
    .transition()
    .delay(3400)
    .attr("dx",-90)
    .attr("dy",ptDy)  
    .style("opacity","1")
    .each("start", function(){
      AREA_ANIMATING = true;
    })

  


  var countup_options = {
    useEasing : true, 
    useGrouping : true,
    separator : ',', 
    decimal : '.', 
    prefix : '', 
    suffix : ''
  };
  var amount_countup = new CountUp("popTextNum", 79526, 1476847, 0, 2, countup_options);
  setTimeout(function(){
  amount_countup.start();  
}, 2000)
  
    // .style("opacity",0)
    // .style("z-index",-1)

  d3.select("#popTextCircle")
    .style("transform", "translate(0px,0px)")
    .transition()
    .delay(1800)
    .style("opacity",1)
    .style("z-index",1)
    .transition()
    .delay(3800)
    .attr("stroke","#094c6b")
    .style("transform", "translate(-6px,-3px)")

  d3.select("#popText")
      .transition()
        .delay(1800)
        .duration(2000)
        .ease("linear")
        .attrTween("transform", translateAlong(d3.select("#extractedLine").node()))








    var areaXAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(10)
        .tickFormat(d3.format('f'));

    d3.select("#areaSvg")
      .append("g")
        .attr("class", "area x axis")
        .attr("transform", "translate(0," + (parseFloat(areaHeight)+22 + 150) + ")")
        .transition()
        .delay(4000)
        .duration(1000)
        .call(areaXAxis);

var rightEdge = d3.select("#titleText span").node().getBoundingClientRect().right
var topEdge = d3.select("#titleText span").node().getBoundingClientRect().top



    hideSingleDot()
    d3.select(".prisonBG")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)
    g.select(".stackBackground")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)



d3.select("#leftBorder")
.transition()
.delay(1600)
.duration(200)
.attr("y2",y(79526.05109))
.each("end", function(){
d3.select(this)
.transition()
.delay(2000)
.attr("stroke","#094c6b")
})
d3.select("#rightBorder")
.transition()
.delay(1600)
.duration(200)
.ease("linear")
.attr("y2",y(1476847))
.each("end", function(){
d3.select(this)
.transition()
.delay(2000)
.attr("stroke","#094c6b")
})




d3.select("#extractedLine")
.transition()
.delay(1800)
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
.delay(3300)
.duration(1200)
.ease("circleOut")
.style("opacity", "1")
.each("end", function(){
d3.select(this)
.transition()
.attr("stroke","#094c6b")
})




var newLoc = (areaHeight + topEdge + 10)*.5
d3.select("#dummyTopDot")
.transition()
.delay(500)
.duration(500)
.ease("linear")
.attr("cy", newLoc)
.transition()
.duration(0)
.style("opacity",0)
.style("z-index",-1)

d3.select("#dummyBottomDot")
.transition()
.delay(500)
.duration(500)
.ease("linear")
.attr("cy", newLoc)
.transition()
.duration(0)
.style("opacity",0)
.style("z-index",-1)

d3.select("#areChartBaseline")
.transition()
.delay(1200)
.duration(800)
.attr("width", areaWidth+200)
.attr("x",-100)
.each("end", function(){
d3.select(this)
.transition()
.delay(1200)
.attr("fill","#094c6b")
})

d3.select("#dotTop")
.attr("cy", newLoc)
.transition()
.delay(700)
.duration(500)
.ease("linear")
.attr("r",15)
.attr("cy", newLoc+15)
.transition()
.duration(500)
.ease("linear")
.attr("cy", areaHeight + 60)

d3.select("#dotBottom")
.attr("cy", newLoc-60)
.transition()
.delay(700)
.duration(500)
.ease("linear")
.attr("r",15)
.attr("cy", newLoc+15)
.transition()
.duration(500)
.ease("linear")
.attr("cy", areaHeight + 60)
}
    
  }

  function hideAreaChart(){
    d3.select("#areaSvg")
      .transition()
      .style("opacity", 0)
      // .style("z-index",-1)

    // d3.select("#areaChartText")
    //   .transition()
    //   .style("opacity", 0)
    //   .style("z-index",-1)
  }

  function hideSingleDot(){
    d3.select(".singleTrackEmpty")
      .transition()
      .style("opacity", 0)
      .style("z-index",-1)
      .style("color", EMPTY_TRACK_COLOR)

    d3.select(".singleTrackFilled")
      .transition()
      .attr("width", "0px")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)
      .style("color", FILLED_TRACK_COLOR)

     d3.select(".singleDot")
      .transition()
      .attr("x", 0)
      .transition()
      .style("opacity",0)
      .style("z-index",-1)

      d3.select(".slowSingleTrackGroup")
        .transition("reset-single")
          .attr("transform", function(d, i){
            return "translate(0, " + (height-2*singleTrackHeight) + ")"
          })
      d3.select(".singleTrackGroup")
        .transition("reset-single")
          .attr("transform", function(d, i){
            return "translate(0, " + (height-singleTrackHeight) + ")"
          })


    d3.select(".slowSingleTrackEmpty")
      .transition()
      .style("opacity", 0)
      .style("z-index",-1)
      .style("color", EMPTY_TRACK_COLOR)

    d3.select(".slowSingleTrackFilled")
      .transition()
      .attr("width", "0px")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)
      .style("color", FILLED_TRACK_COLOR)

     d3.select(".slowSingleDot")
      .transition()
      .attr("x", 0)
      .transition()
      .style("opacity",0)
      .style("z-index",-1)


  }

  function showSingleDot(){
    showBreadcrumbs()

    d3.select("#lineChart")
      .style("opacity",0)
      .style("z-index",-1)

    d3.selectAll(".axisLabel")
      .transition()
      .style("opacity",0)
    resetIntro(1)
    hideAreaChart();
        d3.select("#areaSvg")
      .transition()
      .style("opacity", 0)
      .style("pointer-events","none")
    d3.select(".stackBackground")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
      .ease("linear")
      .attr("height", 2*singleTrackHeight)
      .attr("y", height - 2*singleTrackHeight)
      .transition()
      .delay(2900)
      .ease("linear")
      .attr("height", 1*singleTrackHeight)
      .attr("y", height - 1*singleTrackHeight)
      .transition()
      .delay(8500 + 1400)
      .ease("linear")
      .attr("height", 0*singleTrackHeight)
      .attr("y", height - 0*singleTrackHeight)


    d3.selectAll(".trackEmpty").transition().style("opacity",0)
    d3.selectAll(".trackFilled").transition().style("opacity",0)
    d3.selectAll(".dot").transition().style("opacity",0)
    
    d3.select("#vis")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
      .style("left", getAnimationLeft(true))


    d3.selectAll(".animationComponents")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)
    d3.selectAll(".mobileSwitch")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)


    g.select(".prisonBG")
      .transition()
      .style("opacity",1)
      .style("z-index",1)



    d3.select(".singleTrackEmpty")
      .transition()
      .style("opacity", 0)
      .style("z-index",1)

    d3.select(".singleTrackFilled")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
      .style("fill", FILLED_TRACK_COLOR)
      .transition()
      .ease("linear")
      .delay(1400)
      .duration(1500)
      .attr("width", function(){ return width + "px"})

     d3.select(".singleDot")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
      .transition()
      .delay(1400)
      .duration(1500)
      .ease("linear")
      .attr("x", function(){ return (width- .5*(singleTrackHeight * dotRatio)) + "px"})
      .each("end", function(){
        flyOut(this)
        d3.select(".singleTrackFilled")
          .transition("fade-out")
            .duration(500)
            .style("fill", EXITING_TRACK_COLOR)
            .each("end", function(){
              d3.select(this)
                .style("fill",EMPTY_TRACK_COLOR)
            })
        d3.select(this)
          .transition()
            .delay(200)
            .duration(100)
            .ease("linear")
            .style("opacity",0)
            .style("z-index",-1)
        d3.select(this.parentNode)
          .selectAll("rect")
          .transition("fade-out")
            .delay(200)
            .duration(100)
            .ease("linear")
            .style("opacity",0)
            .style("z-index",-1)

        d3.select(".slowSingleTrackGroup")
          .transition()
            .attr("transform", function(d, i){
              return "translate(0, " + (height-singleTrackHeight) + ")"
            })
      })

    d3.select(".slowSingleTrackEmpty")
      .transition()
      .style("opacity", 0)
      .style("z-index",1)

    d3.select(".slowSingleTrackFilled")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
      .transition()
      .ease("linear")
      .delay(1400)
      .duration(8500)
      .attr("width", function(){ return width + "px"})

     d3.select(".slowSingleDot")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
      .transition()
      .delay(1400)
      .duration(8500)
      .ease("linear")
      .attr("x", function(){ return (width- .5*(singleTrackHeight * dotRatio)) + "px"})
      .each("end", function(){
        flyOut(this)
        d3.select(".slowSingleTrackFilled")
          .transition("fade-out")
            .duration(100)
            .style("fill", EXITING_TRACK_COLOR)
            .transition()
            .delay(100)
            .style("opacity",0)
            .style("z-index",-1)
        d3.select(".slowSingleTrackEmpty")
          .transition()
          .delay(200)
          .style("opacity",0)
          .style("z-index",-1)
        d3.select(".singleTrackFilled")
          .transition()
          .delay(200)
          .style("opacity",0)
          .style("z-index",-1)
        d3.select(".singleTrackEmpty")
          .transition()
          .delay(200)
          .style("opacity",0)
          .style("z-index",-1)
        d3.select(this)
          .transition()
            .delay(200)
            .duration(100)
            .ease("linear")
            .style("opacity",0)
            .style("z-index",-1)
        d3.select(this.parentNode)
          .selectAll("rect")
          .transition("fade-out")
            .delay(200)
            .duration(100)
            .ease("linear")
            .style("opacity",0)
            .style("z-index",-1)
      })
  }


  function oneYearSentences(){
    d3.select("#vis")
      .transition()
      .style("left",getAnimationLeft(false))
    d3.selectAll(".axisLabel")
      .transition()
      .style("opacity",1)
    hideSingleDot();
    d3.selectAll(".animationComponents")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
if(IS_TABLET()){
			d3.selectAll(".mobileSwitch")
      .transition()
      .style("opacity",1)
      .style("z-index",99)
}

    d3.select("#lineChart")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
      .style("z-index",1)
    d3.select("#legendTen")
      .transition()
      .style("opacity",0)

    drawBackCurtain(3)
    animateIntro(3)
  }
  function longerSentences(){
    d3.select("#vis")
      .transition()
      .style("left",getAnimationLeft(false))
    d3.select("#legendTen")
      .transition()
      .style("opacity",1)
    drawBackCurtain(4)
    animateIntro(4)
  }
  function longerSentencesFasterAdmission(){
    d3.select("#vis")
      .transition()
      .style("left",getAnimationLeft(false))
    drawBackCurtain(5)
    animateIntro(5)
  }
  function fewerShortSentences(){
    d3.select("#vis")
      .transition()
      .style("left",getAnimationLeft(false))
    d3.select("#legendOne div")
      .text("1-year prison terms")
    d3.select("#legend")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
    drawBackCurtain(6)
    animateIntro(6)
  }
  function shortSentenceEarlyRelease(){
    showBreadcrumbs();
    d3.selectAll(".animationComponents")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
if(IS_TABLET()){
			d3.selectAll(".mobileSwitch")
      .transition()
      .style("opacity",1)
      .style("z-index",99)
}
    d3.select("#legend")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
    d3.select("#legendOne div")
      .text("Six-month prison terms")
    drawBackCurtain(7)
    animateIntro(7)
    d3.select("#vis")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
      .style("left",getAnimationLeft(false))
    d3.select("#lineChart")
      .transition()
      .style("opacity",1)
      .style("z-index",1)
  }
  function hideIntro(){
    hideBreadCrumbs();
    d3.selectAll(".animationComponents")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)
    d3.selectAll(".mobileSwitch")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)
    d3.select("#vis")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)
    d3.select("#lineChart")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)
    d3.select("#map")
      .transition()
      .style("opacity",0)
      .style("z-index",-1)
    // d3.select("#bodyNew")
    //   .transition()
    //   .style("opacity",0)
    //   .style("z-index",-1)
    // d3.select("#bodyOld")
    //   .transition()
    //   .style("opacity",0)
    //   .style("z-index",-1)
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
    d3.selectAll(".crumb").classed("active", false)
    d3.select("#crumb" + (index-1)).classed("active", true)
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

  // d3.select("#areaChartText")
  //   .style("margin-top",window.innerHeight + "px")
  var gapScaler = (IS_PHONE()) ? 2 : .6
  d3.select("#firstGap")
    .style("margin-bottom",window.innerHeight*gapScaler + "px")
  d3.select("#secondGap")
    .style("margin-bottom",window.innerHeight + "px")
  d3.select("#firstStep")
    .style("margin-top",window.innerHeight* -0.5 + "px")

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

  // var timer = null;
  var test = debounce(function(){
    console.log("resizing")
    d3.select("#vis svg").remove()
    d3.select("#breadCrumb svg").remove()
    d3.select("#introAreaContainer svg").remove()
    d3.select("#lineChart svg").remove()
    display(animationData, lineData, areaData)
  }, 1000)
  scroll.on('resized', function(){
    test();
  })
  scroll.on('active', function(index) {
    // highlight current step text
    d3.selectAll('.step')
      .transition()
      .style('opacity',  function(d,i) {
        if(IS_MOBILE()){
          return 1
        }else{
          var low = (i == 2) ? 0 : 0.2
          return i == index ? 1 : low;
        }
      });

    var stepText = d3.select(d3.selectAll(".step")[0][index]).html()

    // var opacityNew = (index%2 == 0) ? 0 : 1;
    // var opacityOld = (index%2 == 0) ? 1 : 0;


    // if(index%2 == 0){
    //   d3.select("#bodyNew")
    //     .html(stepText)
    //     .transition()
    //     .duration(2000)
    //     .style("opacity",1)
    //     .style("z-index",1)

    //   d3.select("#bodyOld")
    //     // .html(stepText)
    //     .transition()
    //     .duration(1000)
    //     .style("opacity",0)
    //     .style("z-index",-1)
    //     .each("end", function(){
    //       d3.select(this).html(stepText)
    //     })
    //   }else{
    //   d3.select("#bodyOld")
    //     .html(stepText)
    //     .transition()
    //     .duration(2000)
    //     .style("opacity",1)
    //     .style("z-index",1)

    //   d3.select("#bodyNew")
    //     // .html(stepText)
    //     .transition()
    //     .duration(1000)
    //     .style("opacity",0)
    //     .style("z-index",-1)
    //     .each("end", function(){
    //       d3.select(this).html(stepText)
    //     })
    //   }

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
      //startSimulation and pauseSimulation defined elsewhere
      function handleVisibilityChange() {
        if (!document.hidden) {
          d3.select("#vis svg").remove()
          d3.select("#breadCrumb svg").remove()
          d3.select("#introAreaContainer svg").remove()
          d3.select("#lineChart svg").remove()
          display(animationData, lineData, areaData)
        }
      }

      document.addEventListener("visibilitychange", handleVisibilityChange, false);


    });
  });
});


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
