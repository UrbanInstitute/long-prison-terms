
/**
 * scroller - handles the details
 * of figuring out which section
 * the user is currently scrolled
 * to.
 *
 */
function scroller() {
  var windowHeight;
  var container = d3.select('body');
  // event dispatcher
  var dispatch = d3.dispatch("active", "progress", "resized");

  // d3 selection of all the
  // text sections that will
  // be scrolled through
  var sections = null;

  // array that will hold the
  // y coordinate of each section
  // that is scrolled through
  var sectionPositions = [];
  var currentIndex = -1;
  // y coordinate of
  var containerStart = 0;

  /**
   * scroll - constructor function.
   * Sets up scroller to monitor
   * scrolling of els selection.
   *
   * @param els - d3 selection of
   *  elements that will be scrolled
   *  through by user.
   */
  function scroll(els) {
    sections = els;

    // when window is scrolled call
    // position. When it is resized
    // call resize.
    d3.select(window)
      .on("scroll.scroller", position)
      .on("resize.scroller", resize);

    // manually call resize
    // initially to setup
    // scroller.
    resize();

    // hack to get position
    // to be called once for
    // the scroll position on
    // load.
    d3.timer(function() {
      position();
      return true;
    });
  }

  /**
   * resize - called initially and
   * also when page is resized.
   * Resets the sectionPositions
   *
   */
  function resize() {
    // sectionPositions will be each sections
    // starting position relative to the top
    // of the first section.
    sectionPositions = [];
    var startPos;
    sections.each(function(d,i) {
      var top = this.getBoundingClientRect().top;
      if(i === 0) {
        startPos = top;
      }
      sectionPositions.push(top - startPos);
    });
    containerStart = container.node().getBoundingClientRect().top + window.pageYOffset;
    dispatch.resized(this)
  }

  /**
   * position - get current users position.
   * if user has scrolled to new section,
   * dispatch active event with new section
   * index.
   *
   */
  function position() {
    var off = (IS_MOBILE()) ? 150 : 10;
    var minus = (IS_TABLET() || IS_SHORT()) ? 1 : 0
    var pos = window.pageYOffset - off - containerStart;
    var sectionIndex = d3.bisect(sectionPositions, pos);
    sectionIndex = Math.min(sections.size() - 1, sectionIndex);
    if(d3.select(".row").node().getBoundingClientRect().top <= d3.select("#vis").node().getBoundingClientRect().bottom){
      sectionIndex = 8 + minus;
    }
    

    if (currentIndex !== sectionIndex) {
      if(sectionIndex < 3){
        dispatch.active(sectionIndex);
      }else{
        dispatch.active(sectionIndex - minus);
      }
      currentIndex = sectionIndex;
    }

    var prevIndex = Math.max(sectionIndex - 1, 0);
    var prevTop = sectionPositions[prevIndex];
    var progress = (pos - prevTop) / (sectionPositions[sectionIndex] - prevTop);

    dispatch.progress(currentIndex, progress);


    d3.select("#featureContainer")
      .style("height", function(){
        return d3.select("#graphic").node().getBoundingClientRect().height + "px"
      })

    if(IS_TABLET() || IS_SHORT()){
      d3.select("#sections")
        .on("click", function(e){
          var my = event.clientY;
          var mx = event.clientX;
          var yBottom = (IS_PHONE()) ? window.innerHeight*.5 - 150 : window.innerHeight*.5 - 236.5;
          var xLeft = d3.select("#animationButton").node().getBoundingClientRect().left;
          var xRight = d3.select("#animationButton").node().getBoundingClientRect().right;

          if((my > yBottom -10) && (my < yBottom + 40)){
            if(mx > xLeft - 25 && mx < xRight + 25){
              showAnimation();
            }else{
              showLine();  
            }
          }else{
            return false;
          }
        })
        .on("mousemove", function(e){
          var my = event.clientY;
          var mx = event.clientX;
          var yBottom = (IS_PHONE()) ? window.innerHeight*.5 - 150 : window.innerHeight*.5 - 236.5;
          var xLeft = d3.select("#animationButton").node().getBoundingClientRect().left;
          var xRight = d3.select("#lineButton").node().getBoundingClientRect().right;

          if((my > yBottom -10) && (my < yBottom + 40) && (mx > xLeft - 25) && (mx < xRight + 25)){
            d3.select(this).style("cursor","pointer")
          }else{
            d3.select(this).style("cursor","default")
          }
        })
      }
  }

  /**
   * container - get/set the parent element
   * of the sections. Useful for if the
   * scrolling doesn't start at the very top
   * of the page.
   *
   * @param value - the new container value
   */
  scroll.container = function(value) {
    if (arguments.length === 0) {
      return container;
    }
    container = value;
    return scroll;
  };

  // allows us to bind to scroller events
  // which will interally be handled by
  // the dispatcher.
  d3.rebind(scroll, dispatch, "on");

  return scroll;
}
