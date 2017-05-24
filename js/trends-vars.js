var IS_SHORT = function(){
  return (d3.select("#isShort").style("display") == "block")
}
var IS_PHONE = function(){
  return (d3.select("#isPhone").style("display") == "block")
}
var IS_MOBILE = function(){
  return (d3.select("#isMobile").style("display") == "block")
}
var SECTION_INDEX = function(){
  return d3.select("#sectionIndex").attr("data-index")
}

var PHONE_VIS_WIDTH = 230;
var PHONE_VIS_HEIGHT = 400;
var SHORT_VIS_WIDTH = 600;
var SHORT_VIS_HEIGHT = 520;
var SHORT_SCATTER_WIDTH = 480;
var PHONE_SCATTER_WIDTH = 235
var VIS_WIDTH = 600;
var VIS_HEIGHT = 680;


var MARGIN = { top: 60, left: 120, bottom: 104, right: 20 };
var PHONE_MARGIN = { top: 100, left: 30, bottom: 30, right: 30 };

var margin = ( IS_PHONE() ) ? PHONE_MARGIN : MARGIN;