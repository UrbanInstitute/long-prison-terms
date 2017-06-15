
var duration = 300; 

var arrowTransitionMin = 200,
    arrowTransitionMax = 1200,
    conclusionScrollY = 11300;

var isTransitioning = [null, false, false, false, false, false, false, false, false]

var inViewMin = 350

function getViewMin(element) {
    var offset = $(element).offset().top,
        scrollTop = $(window).scrollTop();
        return offset - scrollTop;
}

function quoteTransition(number) { 

    // var transitionNumber0 = "isTransitioning["] + number
    // var transitionNumber = eval(transitionNumber0)
    d3.select(".alt-quote" + number)
        .transition()
        .duration(duration)
        .style("opacity", 1)
        .style("pointer-events", "all")
        .style("z-index", 1)
        .on("start", function(){ isTransitioning[number] = true })
        .on("end", function(){ isTransitioning[number] = false })
        .on("interrupt", function() {isTransitioning[number] = false})

    d3.selectAll(".note-container:not(.alt-quote" + number + ")")
        .transition()
        .duration(duration)
        .style("opacity", 0)
        .style("z-index", -1)}


window.onscroll = function() {
    if(window.scrollY < arrowTransitionMin){
        d3.select("#introArrow")
            .transition()
            .duration(100)
            .style("opacity", 1)
            .style("z-index", 1)

        d3.selectAll(".note-container")
            .style("opacity", 0)
            .style("pointer-events", "none")
            .style("z-index", -1)

    } else if(window.scrollY >= arrowTransitionMin && window.scrollY <arrowTransitionMax) { 
        //MAKE ARROW DISAPPEAR BEFORE FIRST QUOTE
        d3.selectAll(".note-container")
            .style("opacity", 0)
            .style("pointer-events", "none")
            .style("z-index", -1)

         d3.select("#introArrow")
            .transition()
            .duration(100)
            .style("opacity", 0)
    }  else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar1") <= inViewMin && getViewMin("#sidebar3") > inViewMin) { 
        //FIRST QUOTE APPEARS
        if (!isTransitioning[1])  {
            quoteTransition(1)
        }  
 
        
    }  else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar3") <= inViewMin && getViewMin("#sidebar6") > inViewMin) {
        //THIRD QUOTE APPEARS
        if (!isTransitioning[3]) {  
            quoteTransition(3)
        } 


    }  else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar6") <= inViewMin && getViewMin("#sidebar7") > inViewMin) {
                //SIXTH QUOTE APPEARS
        if (!isTransitioning[6]) {
            quoteTransition(6)
        } 
    }  else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar7") <= inViewMin && getViewMin("#sidebar8") > inViewMin) {
                //SEVENTH QUOTE APPEARS
        if (!isTransitioning[7]) {
            quoteTransition(7)
        } 

    }  else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar8") <= inViewMin && getViewMin("#sidebar9") > inViewMin) {
                //EIGHTH QUOTE APPEARS
        if (!isTransitioning[8]) {
            quoteTransition(8)
        } 

    }  else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar9") <= inViewMin && getViewMin("#sidebar10") > inViewMin) {
                //NINTH QUOTE APPEARS
        if (!isTransitioning[9]) {
            quoteTransition(9)
        } 

    }  else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar10") <= inViewMin && getViewMin("#sidebar11") > inViewMin) {
                //TENTH QUOTE APPEARS
        if (!isTransitioning[10]) {
            quoteTransition(10)
        } 

    } else if(getViewMin("#sidebar11") <= inViewMin && window.scrollY < conclusionScrollY){  
                //ELEVENTH QUOTE APPEARS
        if (!isTransitioning[11]) {
            quoteTransition(11)
        } 

    }
     else {
        d3.selectAll(".note-container")
            .style("opacity", 0)            
            .style("pointer-events", "none")
            .style("z-index", -1)
    }
};