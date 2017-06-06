console.log(window.scrollY)


var duration = 300; 

var arrowTransitionMin = 200,
    arrowTransitionMax = 1000,
    transition1Max = 1200,
    transition2Max = 2200,
    transition3Max = 3000,
    transition4Max = 4000,
    transition5Max = 4600,
    transition6Max = 5100,
    transition7Max = 5700,
    transition8Max = 6300,
    transition9Max = 6700;

var isTransitioning_1 = false,
    isTransitioning_2 = false,
    isTransitioning_3 = false,
    isTransitioning_4 = false,
    isTransitioning_5 = false,
    isTransitioning_6 = false,
    isTransitioning_7 = false,
    isTransitioning_8 = false,
    isTransitioning_9 = false;


function quoteTransition(number, transitionNumber) { 

    // var transitionNumber0 = "isTransitioning_" + number
    // var transitionNumber = eval(transitionNumber0)
    d3.select(".dem-quote" + number)
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ transitionNumber = true; console.log(transitionNumber)})
                .on("end", function(){ transitionNumber = false })
}

window.onscroll = function() {
    console.log(window.scrollY)
    if(window.scrollY < arrowTransitionMin){
        d3.select("#introArrow")
            .style("opacity", 1)
        d3.selectAll(".note-container")
            .style("opacity", 0)
    }  else if(window.scrollY >= arrowTransitionMin && window.scrollY <arrowTransitionMax) {
        //MAKE ARROW DISAPPEAR BEFORE FIRST QUOTE
        d3.selectAll(".note-container")
            .style("opacity", 0)
        d3.select("#introArrow")
            .style("opacity", 0)
    } else if(window.scrollY >= arrowTransitionMax && window.scrollY <transition1Max){     console.log(isTransitioning_1) 
        //FIRST QUOTE APPEARS
        if (!isTransitioning_1)  {        
            d3.select(".dem-quote2")
                .transition()
                .duration(duration)
                .style("opacity", 0)
        quoteTransition(1, isTransitioning_1)

        }  
 
        

    } else if(window.scrollY >= transition1Max && window.scrollY <transition2Max){ 
        //SECOND QUOTE APPEARS
        if (!isTransitioning_2) {  console.log(isTransitioning_2)
            d3.selectAll(".dem-quote1, .dem-quote3")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            quoteTransition(2, isTransitioning_2)
        } 
        // else if (d3.select('.dem-quote2').classed('done') == true) {
        //      d3.selectAll(".dem-quote1, .dem-quote3")
        //         .transition()
        //         .duration(duration)
        //         .style("opacity", 0)
        //    quoteTransition(2)
        // }
        
 
             console.log(isTransitioning_2)
        

    } else if(window.scrollY >= transition2Max && window.scrollY <transition3Max){  
        //THIRD QUOTE APPEARS
        if (!isTransitioning_3) {
            d3.selectAll(".dem-quote2, .dem-quote4")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.dem-quote3')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_3 = true})
                .on("end", function(){ isTransitioning_3 = false})
            } 
            isTransitioning_3 = false
        

    } else if(window.scrollY >= transition3Max && window.scrollY <transition4Max){ 
    	        //FOURTH QUOTE APPEARS
        if (!isTransitioning_4) {
           d3.selectAll(".dem-quote3, .dem-quote5")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.dem-quote4')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_4 = true})
                .on("end", function(){ isTransitioning_4 = false})
            } 
            isTransitioning_4 = false
        

    } else if(window.scrollY >= transition4Max && window.scrollY <transition5Max){ 
    	        //FIFTH QUOTE APPEARS
        if (!isTransitioning_5) {
            d3.selectAll(".dem-quote4, .dem-quote6")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.dem-quote5')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_5 = true})
                .on("end", function(){ isTransitioning_5 = false})
            } 
            isTransitioning_5 = false
        

    } else if(window.scrollY >= transition5Max && window.scrollY <transition6Max){ 
                //SIXTH QUOTE APPEARS
        if (!isTransitioning_6) {
            d3.selectAll(".dem-quote5, .dem-quote7")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.dem-quote6')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_6 = true})
                .on("end", function(){ isTransitioning_6 = false})
            } 
            isTransitioning_6 = false
        

    } else if(window.scrollY >= transition6Max && window.scrollY <transition7Max){ 
                //SEVENTH QUOTE APPEARS
        if (!isTransitioning_7) {
            d3.selectAll(".dem-quote6, .dem-quote8")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.dem-quote7')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_7 = true})
                .on("end", function(){ isTransitioning_7 = false})
            } 
            isTransitioning_7 = false
        

    } else if(window.scrollY >= transition7Max && window.scrollY <transition8Max){ 
                //EIGHTH QUOTE APPEARS
        if (!isTransitioning_8) {
            d3.selectAll(".dem-quote7, .dem-quote9")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.dem-quote8')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_8 = true})
                .on("end", function(){ isTransitioning_8 = false})
            } 
            isTransitioning_8 = false
        

    } else if(window.scrollY >= transition8Max && window.scrollY < transition9Max){ 
                //NINTH QUOTE APPEARS
        if (!isTransitioning_9) {
            d3.selectAll(".dem-quote8")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.dem-quote9')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_9 = true})
                .on("end", function(){ isTransitioning_9 = false})
        } 
            isTransitioning_9 = false
        

    }     
     else {
    	d3.selectAll(".note-container").style("opacity", 0)
    }
};

