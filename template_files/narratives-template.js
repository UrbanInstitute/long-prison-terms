
var duration = 300; 

var arrowTransitionMin = 200,
    arrowTransitionMax = 100,
    conclusionScrollY = 11800;


var isTransitioning = [null, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

var inViewMin = 350


function getViewMin(element) {
    var offset = $(element).offset().top,
        scrollTop = $(window).scrollTop();
        return offset - scrollTop;
}


function quoteTransition(number) { 

    // var transitionNumber0 = "isTransitioning["] + number
    // var transitionNumber = eval(transitionNumber0)
    d3.select(".con-quote" + number)
        .transition()
        .duration(duration)
        .style("opacity", 1)
        .style("pointer-events", "all")
        .style("z-index", 1)
        .on("start", function(){ isTransitioning[number] = true })
        .on("end", function(){ isTransitioning[number] = false })
        .on("interrupt", function() {isTransitioning[number] = false})

    d3.selectAll(".note-container:not(.con-quote" + number + ")")
        .transition()
        .duration(duration)
        .style("opacity", 0)
        .style("z-index", -1)

}

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
    }  else if(window.scrollY >= arrowTransitionMin && window.scrollY <arrowTransitionMax) {
        //MAKE ARROW DISAPPEAR BEFORE FIRST QUOTE
        d3.selectAll(".note-container")
            .style("opacity", 0)
            .style("pointer-events", "none")
            .style("z-index", -1)
            
        d3.select("#introArrow")
            .transition()
            .duration(100)
            .style("opacity", 0)
    } else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar1") <= inViewMin && getViewMin("#sidebar3") > inViewMin) {
        //FIRST QUOTE APPEARS
        if (!isTransitioning[1])  {
            quoteTransition(1)
        }  
 
    } else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar3") <= inViewMin && getViewMin("#sidebar4") > inViewMin) {
        //SIDEBAR 3 APPEARS
        if (!isTransitioning[3]) {
            quoteTransition(3)
        } 
          

    } else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar4") <= inViewMin && getViewMin("#sidebar6") > inViewMin) {
        //SIDEBAR 4 APPEARS
        if (!isTransitioning[4]) {
            quoteTransition(4)
        } 
          


    } else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar6") <= inViewMin && getViewMin("#sidebar2") > inViewMin) {
                //SIDEBAR 6 APPEARS
        if (!isTransitioning[6]) {
            quoteTransition(6)
        } 


    } else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar2") <= inViewMin && getViewMin("#sidebar7") > inViewMin) {
                //SIDEBAR 2 APPEARS
        if (!isTransitioning[2]) {
            quoteTransition(2)
        } 

    } else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar7") <= inViewMin && getViewMin("#sidebar8") > inViewMin) {
                //SIDEBAR 7 APPEARS
        if (!isTransitioning[7]) {
            quoteTransition(7)
        } 

    } else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar8") <= inViewMin && getViewMin("#sidebar9") > inViewMin) {
                //SIDEBAR 8 APPEARS
        if (!isTransitioning[8]) {
            quoteTransition(8)
        } 

    } else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar9") <= inViewMin && getViewMin("#sidebar13") > inViewMin) {
                //SIDEBAR 9 APPEARS
        if (!isTransitioning[9]) {
            quoteTransition(9)
        } 

    } else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar13") <= inViewMin && getViewMin("#sidebar14") > inViewMin) {
                //SIDEBAR 13 APPEARS
        if (!isTransitioning[13]) {
            quoteTransition(13)
        } 

    } else if (window.scrollY >= arrowTransitionMax && getViewMin("#sidebar14") <= inViewMin && getViewMin("#sidebar11") > inViewMin) {
                //SIDEBAR 14 APPEARS
        if (!isTransitioning[14]) {
            quoteTransition(14)
        } 
   } else if(getViewMin("#sidebar11") <= inViewMin && window.scrollY < conclusionScrollY){  
                //SIDEBAR 11 APPEARS
        if (!isTransitioning[11]) {
            quoteTransition(11)
        } 

    } else {
        d3.selectAll(".note-container")
            .style("opacity", 0)            
            .style("pointer-events", "none")
            .style("z-index", -1)
    }
};

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