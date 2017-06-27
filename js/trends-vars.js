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

var scrollStarted = false;

var STATE_NAMES = {"AL": "Alabama","AK": "Alaska","AZ": "Arizona","AR": "Arkansas","CA": "California","CO": "Colorado","CT": "Connecticut","DE": "Delaware","DC": "District of Columbia","FL": "Florida","GA": "Georgia","HI": "Hawaii","ID": "Idaho","IL": "Illinois","IN": "Indiana","IA": "Iowa","KS": "Kansas","KY": "Kentucky","LA": "Louisiana","ME": "Maine","MD": "Maryland","MA": "Massachusetts","MI": "Michigan","MN": "Minnesota","MS": "Mississippi","MO": "Missouri","MT": "Montana","NE": "Nebraska","NV": "Nevada","NH": "New Hampshire","NJ": "New Jersey","NM": "New Mexico","NY": "New York","NC": "North Carolina","ND": "North Dakota","OH": "Ohio","OK": "Oklahoma","OR": "Oregon","PA": "Pennsylvania","RI": "Rhode Island","SC": "South Carolina","SD": "South Dakota","TN": "Tennessee","TX": "Texas","US": "US Total","UT": "Utah","VT": "Vermont","VA": "Virginia","WA": "Washington","WV": "West Virginia","WI": "Wisconsin","WY":"Wyoming"}