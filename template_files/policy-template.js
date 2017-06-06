console.log(window.scrollY)

var duration = 300; 

var isTransitioning_1 = false,
    isTransitioning_2 = false,
    isTransitioning_3 = false,
    isTransitioning_4 = false,
    isTransitioning_5 = false,
    isTransitioning_6 = false,
    isTransitioning_7 = false,
    isTransitioning_8 = false,
    isTransitioning_9 = false;
    isTransitioning_10 = false;

var arrowTransitionMin = 200,
    arrowTransitionMax = 1600,
    transition1Max = 2500,
    transition2Max = 4800,
    transition3Max = 6800,
    transition4Max = 7350,
    transition6Max = 8300,
    transition7Max = 9300,
    transition8Max = 10000,
    transition9Max = 11100,
    transition10Max = 12400;

window.onscroll = function() {
    console.log(window.scrollY)
    if(window.scrollY < arrowTransitionMin){ console.log('other')
        d3.select("#introArrow")
            .style("opacity", 1)
        d3.selectAll(".note-container")
            .style("opacity", 0)
    } else if(window.scrollY >= arrowTransitionMin && window.scrollY <arrowTransitionMax) { console.log('other')
        //MAKE ARROW DISAPPEAR BEFORE FIRST QUOTE
        d3.selectAll(".note-container")
            .style("opacity", 0)
         d3.select("#introArrow")
            .style("opacity", 0)
    } else if(window.scrollY >= arrowTransitionMax && window.scrollY <transition1Max){ 
        //FIRST QUOTE APPEARS
        if (d3.select(".pol-quote1").classed('done')) {   console.log(isTransitioning_1)

            d3.select(".pol-quote2")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select(".pol-quote1")
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_1 = true})
                .on("end", function(){ isTransitioning_1 = false})

        } 
        else if (!isTransitioning_1) {console.log(isTransitioning_1)
            d3.select(".pol-quote2")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select(".pol-quote1")
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_1 = true
                    d3.select('.pol-quote1').classed('done', true)})
                .on("end", function(){ isTransitioning_1 = false})
                

        } console.log(isTransitioning_1)
           


    } else if(window.scrollY >= transition1Max && window.scrollY <transition2Max){ 
        //SECOND QUOTE APPEARS
        if (d3.select('.pol-quote2').classed('done')) {   console.log(isTransitioning_2)
            d3.selectAll(".pol-quote1, .pol-quote3")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.pol-quote2')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_2 = true})
                .on("end", function(){ isTransitioning_2 = false})
            } 
        else if (!isTransitioning_2) { console.log(isTransitioning_2)
            d3.selectAll(".pol-quote1, .pol-quote3")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.pol-quote2')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_2 = true; 
                    d3.select('.pol-quote2').classed('done', true)})
                .on("end", function(){ isTransitioning_2 = false})
                
            } 
               console.log(isTransitioning_2)
            

    } else if(window.scrollY >= transition2Max && window.scrollY <transition3Max){  
        //THIRD QUOTE APPEARS
        if (!isTransitioning_3) {console.log('third')
            d3.selectAll(".pol-quote2, .pol-quote4")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.pol-quote3')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_3 = true})
                .on("end", function(){ isTransitioning_3 = false})
            } 
               
            

    } else if(window.scrollY >= transition3Max && window.scrollY <transition4Max){ 
                //FOURTH QUOTE APPEARS
        if (!isTransitioning_4) {
           d3.selectAll(".pol-quote3, .pol-quote6")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.pol-quote4')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_4 = true})
                .on("end", function(){ isTransitioning_4 = false})
            } 
               
            

    } else if(window.scrollY >= transition4Max && window.scrollY <transition6Max){ 
                //SIXTH QUOTE APPEARS
        if (!isTransitioning_6) {
            d3.selectAll(".pol-quote4, .pol-quote7")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.pol-quote6')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_6 = true})
                .on("end", function(){ isTransitioning_6 = false})
            }
              
            

    } else if(window.scrollY >= transition6Max && window.scrollY <transition7Max){ 
                //SEVENTH QUOTE APPEARS
        if (!isTransitioning_7) {
            d3.selectAll(".pol-quote6, .pol-quote8")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.pol-quote7')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_7 = true})
                .on("end", function(){ isTransitioning_7 = false})
            } 
              
            

    } else if(window.scrollY >= transition7Max && window.scrollY <transition8Max){ 
                //EIGHTH QUOTE APPEARS
        if (!isTransitioning_8) {
            d3.selectAll(".pol-quote7, .pol-quote9")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.pol-quote8')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_8 = true})
                .on("end", function(){ isTransitioning_8 = false})
            } 
              
            

    } else if(window.scrollY >= transition8Max && window.scrollY <transition9Max){ 
                //NINTH QUOTE APPEARS
        if (!isTransitioning_9) {
            d3.selectAll(".pol-quote8, .pol-quote10")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.pol-quote9')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_9 = true})
                .on("end", function(){ isTransitioning_9 = false})
            }

    } else if(window.scrollY >= transition9Max && window.scrollY < transition10Max){ 
                //TENTH QUOTE APPEARS
        if (!isTransitioning_10) {
            d3.selectAll(".pol-quote9")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.pol-quote10')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_10 = true})
                .on("end", function(){ isTransitioning_10 = false})
        } 
              

    }
     else { console.log('other')
        d3.selectAll(".note-container").style("opacity", 0)
    }
};