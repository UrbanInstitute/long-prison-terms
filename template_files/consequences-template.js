console.log(window.scrollY)

var duration = 300; 

var arrowTransitionMin = 200,
    arrowTransitionMax = 1300,
    transition1Max = 2700,
    transition3Max = 4200,
    transition4Max = 5000,
    transition4Max = 4000,
    transition5Max = 4600,
    transition6Max = 5300,
    transition2Max = 6600,
    transition7Max = 7300,
    transition8Max = 8000,
    transition9Max = 9900,
    transition13Max = 10900,
    transition14Max = 12000


var isTransitioning = [null, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

function quoteTransition(number) { 

    // var transitionNumber0 = "isTransitioning["] + number
    // var transitionNumber = eval(transitionNumber0)
    d3.select(".con-quote" + number)
        .transition()
        .duration(duration)
        .style("opacity", 1)
        .on("start", function(){ console.log(number); isTransitioning[number] = true })
        .on("end", function(){ console.log(number); isTransitioning[number] = false })
        .on("interrupt", function() {isTransitioning[number] = false})

    d3.selectAll(".note-container:not(.con-quote" + number + ")")
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
 
    } else if(window.scrollY >= transition1Max && window.scrollY <transition3Max){  
        //THIRD QUOTE APPEARS
        if (!isTransitioning[3]) {
            quoteTransition(3)
        } 
          

    } else if(window.scrollY >= transition3Max && window.scrollY <transition4Max){  
        //FOURTH QUOTE APPEARS
        if (!isTransitioning[4]) {
            quoteTransition(4)
        } 
          


    } else if(window.scrollY >= transition4Max && window.scrollY <transition6Max){ 
                //SIXTH QUOTE APPEARS
        if (!isTransitioning[6]) {
            quoteTransition(6)
        } 


    } else if(window.scrollY >= transition6Max && window.scrollY <transition2Max){ 
                //SIDEBAR 2 APPEARS
        if (!isTransitioning[2]) {
            quoteTransition(2)
        } 

    } else if(window.scrollY >= transition2Max && window.scrollY <transition7Max){ 
                //SIDEBAR 7 APPEARS
        if (!isTransitioning[7]) {
            quoteTransition(7)
        } 

    } else if(window.scrollY >= transition7Max && window.scrollY <transition8Max){ 
                //SIDEBAR 8 APPEARS
        if (!isTransitioning[8]) {
            quoteTransition(8)
        } 

    } else if(window.scrollY >= transition8Max && window.scrollY <transition9Max){ 
                //SIDEBAR 9 APPEARS
        if (!isTransitioning[9]) {
            quoteTransition(9)
        } 

    } else if(window.scrollY >= transition9Max && window.scrollY <transition13Max){ 
                //SIDEBAR 13 APPEARS
        if (!isTransitioning[13]) {
            quoteTransition(13)
        } 

    } else if(window.scrollY >= transition13Max && window.scrollY <transition14Max){ 
                //SIDEBAR 14 APPEARS
        if (!isTransitioning[14]) {
            quoteTransition(14)
        } 
   } else if(window.scrollY >= transition14Max){ 
                //SIDEBAR 11 APPEARS
        if (!isTransitioning[11]) {
            quoteTransition(11)
        } 

    } else {
        d3.selectAll(".note-container").style("opacity", 0)
    }
};