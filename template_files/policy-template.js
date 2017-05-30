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

window.onscroll = function() {
    console.log(window.scrollY)
 if(window.scrollY >= 1600 && window.scrollY <2500){ console.log('hi')
        //FIRST QUOTE APPEARS
        if (!isTransitioning_1) {
            d3.select(".pol-quote1")
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

    } else if(window.scrollY >= 2500 && window.scrollY <4800){ 
        //SECOND QUOTE APPEARS
        if (!isTransitioning_2) {
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


    } else if(window.scrollY >= 4800 && window.scrollY <6800){  
        //THIRD QUOTE APPEARS
        if (!isTransitioning_3) {
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

    } else if(window.scrollY >= 6800 && window.scrollY <7350){ 
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

    } else if(window.scrollY >= 7350 && window.scrollY <8300){ 
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

    } else if(window.scrollY >= 8300 && window.scrollY <9300){ 
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

    } else if(window.scrollY >= 9300 && window.scrollY <10000){ 
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

    } else if(window.scrollY >= 10000 && window.scrollY <11100){ 
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

    } else if(window.scrollY >= 11100 && window.scrollY < 12400){ 
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
     else {
        d3.selectAll(".note-container").style("opacity", 0)
    }
};