

var duration = 300; 

var isTransitioning = [null, false, false, false, false, false, false, false, false, false]

var inViewMin = 350

// var scrollTop = $(window).scrollTop(),
//     inViewMin = 300,
//     ffset = ($(".left-col-header").offset().top)
//     inView = offset - scrollTop;

function getViewMin(element) {
    var offset = $(element).offset().top,
        scrollTop = $(window).scrollTop();
        return offset - scrollTop;
}

function quoteTransition(number) { 

    d3.select(".dem-quote" + number)
        .transition()
        .duration(duration)
        .style("opacity", 1)
        .style("pointer-events", "all")
        .style("z-index", 1)
        .on("start", function(){  isTransitioning[number] = true })
        .on("end", function(){ isTransitioning[number] = false })
        .on("interrupt", function() {isTransitioning[number] = false})

    d3.selectAll(".note-container:not(.dem-quote" + number + ")")
        .transition()
        .duration(duration)
        .style("opacity", 0)
        .style("z-index", -1)
}



var scrollTimer = null;
var scrollStarted = false;
$(document).ready(function(){
    if(d3.select(".left-col").node().getBoundingClientRect().top > window.innerHeight){
        d3.select(".introArrowWrapper")
            .transition()
            .duration(0)
            .style("opacity",1)
    }    
})
$(window).scroll(function () {
    if( ! scrollStarted ){
        scrollStarted = true;
        d3.select(".introArrowWrapper")
            .transition()
            .style("opacity",0)
    }
    scrollCheck(); // fire on scroll
    if (scrollTimer) {
        clearTimeout(scrollTimer);   // clear pending timer
    }
    scrollTimer = setTimeout(scrollCheck, 500);   // set new timer to fire 500 ms after scroll ends
});


function scrollCheck() { 
    if(
        d3.select(".left-col").node().getBoundingClientRect().bottom <= d3.select(".dem-quote9").node().getBoundingClientRect().bottom ||
        d3.select(".left-col-header").node().getBoundingClientRect().top >= d3.select(".dem-quote9").node().getBoundingClientRect().top
        ){
        if($.inArray(true, isTransitioning) == -1){
            d3.selectAll(".note-container")
                .transition()
                .style("opacity", 0)            
                .style("pointer-events", "none")
                .style("z-index", -1)
        }
    }
    else if (getViewMin("#sidebar1") <= inViewMin && getViewMin("#sidebar2") > inViewMin) {
        //FIRST QUOTE APPEARS
        if (!isTransitioning[1])  {
            quoteTransition(1)
        }  
    }
    else if(getViewMin("#sidebar2") <= inViewMin && getViewMin("#sidebar3") > inViewMin) {  
        //SECOND QUOTE APPEARS
        if (!isTransitioning[2]) {  
            quoteTransition(2)
        } 
    }
    else if(getViewMin("#sidebar3") <= inViewMin && getViewMin("#sidebar4") > inViewMin){  
        //THIRD QUOTE APPEARS
        if (!isTransitioning[3]) {
            quoteTransition(3)
        } 
    }
    else if(getViewMin("#sidebar4") <= inViewMin && getViewMin("#sidebar5") > inViewMin){  
        //FOURTH QUOTE APPEARS
        if (!isTransitioning[4]) {
            quoteTransition(4)
        } 
    }
    else if(getViewMin("#sidebar5") <= inViewMin && getViewMin("#sidebar6") > inViewMin){  
    	        //FIFTH QUOTE APPEARS
        if (!isTransitioning[5]) {
            quoteTransition(5)
        } 
        
    }
    else if(getViewMin("#sidebar6") <= inViewMin && getViewMin("#sidebar8") > inViewMin){  
        //SIXTH QUOTE APPEARS
        if (!isTransitioning[6]) {
            quoteTransition(6)
        } 
    } 
    else if(getViewMin("#sidebar8") <= inViewMin && getViewMin("#sidebar9") > inViewMin){  
        //EIGHTH QUOTE APPEARS
        if (!isTransitioning[8]) {
            quoteTransition(8)
        } 
    }
    else if(getViewMin("#sidebar9") <= inViewMin ){  
        //NINTH QUOTE APPEARS
        if (!isTransitioning[9]) {
            quoteTransition(9)
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

