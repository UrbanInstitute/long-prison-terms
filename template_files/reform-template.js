console.log(window.scrollY)

var duration = 300; 

var arrowTransitionMin = 200,
    arrowTransitionMax = 1600,
    transition1Max = 3000,
    transition3Max = 4300,
    transition6Max = 5400,
    transition7Max = 9000,
    transition8Max = 10150,
    transition9Max = 10500,
    transition10Max = 11000,
    transition11Max = 11300;

var isTransitioning = [null, false, false, false, false, false, false, false, false]

function quoteTransition(number) { 

    // var transitionNumber0 = "isTransitioning["] + number
    // var transitionNumber = eval(transitionNumber0)
    d3.select(".alt-quote" + number)
        .transition()
        .duration(duration)
        .style("opacity", 1)
        .on("start", function(){ console.log(number); isTransitioning[number] = true })
        .on("end", function(){ console.log(number); isTransitioning[number] = false })
        .on("interrupt", function() {isTransitioning[number] = false})

    d3.selectAll(".note-container:not(.alt-quote" + number + ")")
        .transition()
        .duration(duration)
        .style("opacity", 0)
}


window.onscroll = function() {
    console.log(window.scrollY)
    if(window.scrollY < arrowTransitionMin){
        d3.select("#introArrow")
            .style("opacity", 1)
        d3.selectAll(".note-container")
            .style("opacity", 0)
    } else if(window.scrollY >= arrowTransitionMin && window.scrollY <arrowTransitionMax) {
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


    } else if(window.scrollY >= transition3Max && window.scrollY <transition6Max){ 
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
            quoteTransition(8)
        } 

    } else if(window.scrollY >= transition8Max && window.scrollY <transition9Max){ 
                //NINTH QUOTE APPEARS
        if (!isTransitioning[9]) {
            quoteTransition(9)
        } 

    } else if(window.scrollY >= transition9Max && window.scrollY <transition10Max){ 
                //TENTH QUOTE APPEARS
        if (!isTransitioning[10]) {
            quoteTransition(10)
        } 

    } else if(window.scrollY >= transition10Max && window.scrollY <transition11Max){ 
                //ELEVENTH QUOTE APPEARS
        if (!isTransitioning[11]) {
            quoteTransition(11)
        } 

    }
     else {
        d3.selectAll(".note-container").style("opacity", 0)
    }
};