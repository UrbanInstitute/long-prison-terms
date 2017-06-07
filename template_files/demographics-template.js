

var duration = 300; 

var arrowTransitionMin = 200,
    arrowTransitionMax = 1000,
    transition1Max = 1700,
    transition2Max = 2600,
    transition3Max = 3500,
    transition4Max = 5200,
    transition5Max = 5800,
    transition6Max = 6300,
    transition7Max = 6800,
    transition8Max = 7200,
    transition9Max = 7500;

var isTransitioning = [null, false, false, false, false, false, false, false, false, false]

function quoteTransition(number) { 

    // var transitionNumber0 = "isTransitioning["] + number
    // var transitionNumber = eval(transitionNumber0)
    d3.select(".dem-quote" + number)
        .transition()
        .duration(duration)
        .style("opacity", 1)
        .on("start", function(){ console.log(number); isTransitioning[number] = true })
        .on("end", function(){ console.log(number); isTransitioning[number] = false })
        .on("interrupt", function() {isTransitioning[number] = false})

    d3.selectAll(".note-container:not(.dem-quote" + number + ")")
        .transition()
        .duration(duration)
        .style("opacity", 0)
}

window.onscroll = function() {
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
    } else if(window.scrollY >= arrowTransitionMax && window.scrollY <transition1Max){     
        //FIRST QUOTE APPEARS
        if (!isTransitioning[1])  {
            quoteTransition(1)
        }  
 
        

    } else if(window.scrollY >= transition1Max && window.scrollY <transition2Max){ 
        //SECOND QUOTE APPEARS
        if (!isTransitioning[2]) {  
            quoteTransition(2)
        } 

 
        

    } else if(window.scrollY >= transition2Max && window.scrollY <transition3Max){  
        //THIRD QUOTE APPEARS
        if (!isTransitioning[3]) {
            quoteTransition(3)
        } 
            
        

    } else if(window.scrollY >= transition3Max && window.scrollY <transition4Max){ 
    	        //FOURTH QUOTE APPEARS
        if (!isTransitioning[4]) {
            quoteTransition(4)
        } 
        

    } else if(window.scrollY >= transition4Max && window.scrollY <transition5Max){ 
    	        //FIFTH QUOTE APPEARS
        if (!isTransitioning[5]) {
            quoteTransition(5)
        } 
        

    } else if(window.scrollY >= transition5Max && window.scrollY <transition6Max){ 
                //SIXTH QUOTE APPEARS
        if (!isTransitioning[6]) {
            quoteTransition(6)
        } 
        

    } else if(window.scrollY >= transition6Max && window.scrollY <transition7Max){ 
                //SEVENTH QUOTE APPEARS
        if (!isTransitioning[7]) {
            quoteTransition(7)
        } 
        

    } else if(window.scrollY >= transition7Max && window.scrollY <transition8Max){ 
                //EIGHTH QUOTE APPEARS
        if (!isTransitioning[8]) {
            console.log("foo")
            quoteTransition(8)
        } 

        

    } else if(window.scrollY >= transition8Max && window.scrollY < transition9Max){ 
                //NINTH QUOTE APPEARS
        if (!isTransitioning[9]) {
            quoteTransition(9)
        } 
        

    }     
     else {
    	d3.selectAll(".note-container").style("opacity", 0)
    }
};

