
var duration = 300; 

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


var scrollTimer = null;
$(window).scroll(function () {
    scrollCheck(); // fire on scroll
    if (scrollTimer) {
        clearTimeout(scrollTimer);   // clear pending timer
    }
    scrollTimer = setTimeout(scrollCheck, 500);   // set new timer to fire 500 ms after scroll ends
});

function scrollCheck() { 
    if(
        d3.select(".left-col").node().getBoundingClientRect().bottom <= d3.select(".con-quote11").node().getBoundingClientRect().bottom ||
        d3.select(".left-col").node().getBoundingClientRect().top >= d3.select(".con-quote11").node().getBoundingClientRect().top
        ){
        if($.inArray(true, isTransitioning) == -1){
          d3.selectAll(".note-container")
                .transition()
                .style("opacity", 0)            
                .style("pointer-events", "none")
                .style("z-index", -1)
        }
    }
    else if (getViewMin("#sidebar1") <= inViewMin && getViewMin("#sidebar3") > inViewMin) {
        //FIRST QUOTE APPEARS
        if (!isTransitioning[1])  {
            quoteTransition(1)
        }  
    }
    else if (getViewMin("#sidebar3") <= inViewMin && getViewMin("#sidebar4") > inViewMin) { 
        //SIDEBAR 3 APPEARS
        if (!isTransitioning[3]) {
            quoteTransition(3)
        } 
    }
    else if (getViewMin("#sidebar4") <= inViewMin && getViewMin("#sidebar6") > inViewMin) { 
        //SIDEBAR 4 APPEARS
        if (!isTransitioning[4]) {
            quoteTransition(4)
        } 
    }
    else if (getViewMin("#sidebar6") <= inViewMin && getViewMin("#sidebar7") > inViewMin) {
        //SIDEBAR 6 APPEARS
        if (!isTransitioning[6]) {
            quoteTransition(6)
        } 
    }
    else if (getViewMin("#sidebar7") <= inViewMin && getViewMin("#sidebar8") > inViewMin) {
        //SIDEBAR 7 APPEARS
        if (!isTransitioning[7]) {
            quoteTransition(7)
        } 
    }
    else if (getViewMin("#sidebar8") <= inViewMin && getViewMin("#sidebar9") > inViewMin) {
        //SIDEBAR 8 APPEARS
        if (!isTransitioning[8]) {
            quoteTransition(8)
        } 
    }
    else if (getViewMin("#sidebar9") <= inViewMin && getViewMin("#sidebar13") > inViewMin) {
        //SIDEBAR 9 APPEARS
        if (!isTransitioning[9]) {
            quoteTransition(9)
        } 
    }
    else if (getViewMin("#sidebar13") <= inViewMin && getViewMin("#sidebar14") > inViewMin) {
        //SIDEBAR 13 APPEARS
        if (!isTransitioning[13]) {
            quoteTransition(13)
        } 
    }
    else if (getViewMin("#sidebar14") <= inViewMin && getViewMin("#sidebar11") > inViewMin) {
        //SIDEBAR 14 APPEARS
        if (!isTransitioning[14]) { 
            quoteTransition(14)
        } 
   }
   else if(getViewMin("#sidebar11") <= inViewMin){  
        //SIDEBAR 11 APPEARS
        if (!isTransitioning[11]) {
            quoteTransition(11)
        } 
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