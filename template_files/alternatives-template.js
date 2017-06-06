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
    isTransitioning_10 = false,
    isTransitioning_11 = false;


window.onscroll = function() {
    console.log(window.scrollY)
    if(window.scrollY < 200){
        d3.select("#introArrow")
            .style("opacity", 1)
    } else if(window.scrollY >= 200) {
         d3.select("#introArrow")
            .style("opacity", 0)
    } else if(window.scrollY >= 1600 && window.scrollY <3000){ console.log('hi')
        //FIRST QUOTE APPEARS
        if (!isTransitioning_1) {
            d3.select(".alt-quote3")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select(".alt-quote1")
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_1 = true})
                .on("end", function(){ isTransitioning_1 = false})

        }

    } else if(window.scrollY >= 3000 && window.scrollY <4300){  
        //THIRD QUOTE APPEARS
        if (!isTransitioning_3) {
            d3.selectAll(".alt-quote1, .alt-quote6")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.alt-quote3')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_3 = true})
                .on("end", function(){ isTransitioning_3 = false})
            }

    }  else if(window.scrollY >= 4300 && window.scrollY <5400){ 
                //SIXTH QUOTE APPEARS
        if (!isTransitioning_6) {
            d3.selectAll(".alt-quote3, .alt-quote7")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.alt-quote6')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_6 = true})
                .on("end", function(){ isTransitioning_6 = false})
            }

    } else if(window.scrollY >= 5400 && window.scrollY <9000){ 
                //SEVENTH QUOTE APPEARS
        if (!isTransitioning_7) {
            d3.selectAll(".alt-quote6, .alt-quote8")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.alt-quote7')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_7 = true})
                .on("end", function(){ isTransitioning_7 = false})
            }

    } else if(window.scrollY >= 9000 && window.scrollY <10150){ 
                //EIGHTH QUOTE APPEARS
        if (!isTransitioning_8) {
            d3.selectAll(".alt-quote7, .alt-quote9")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.alt-quote8')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_8 = true})
                .on("end", function(){ isTransitioning_8 = false})
            }

    } else if(window.scrollY >= 10150 && window.scrollY <10500){ 
                //NINTH QUOTE APPEARS
        if (!isTransitioning_9) {
            d3.selectAll(".alt-quote8, .alt-quote10")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.alt-quote9')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_9 = true})
                .on("end", function(){ isTransitioning_9 = false})
            }

    } else if(window.scrollY >= 10500 && window.scrollY < 11100){ 
                //TENTH QUOTE APPEARS
        if (!isTransitioning_10) {
            d3.selectAll(".alt-quote9")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.alt-quote10')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_10 = true})
                .on("end", function(){ isTransitioning_10 = false})
        }

    } else if(window.scrollY >= 11100 && window.scrollY < 11300){ 
                //ELEVENTH QUOTE APPEARS
        if (!isTransitioning_11) {
            d3.selectAll(".alt-quote10")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.alt-quote11')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_11 = true})
                .on("end", function(){ isTransitioning_11 = false})
        }

    }
     else {
        d3.selectAll(".note-container").style("opacity", 0)
    }
};