console.log(window.scrollY)

var quote1 = d3.select(".quote1");
    quote2 = d3.select(".quote2"),
    quote3 = d3.select(".quote3"),
    quote4 = d3.select(".quote4"),
    quote5 = d3.select(".quote5"),
    quote6 = d3.select(".quote6"),
    quote7 = d3.select(".quote7"),
    quote8 = d3.select(".quote8"),
    quote9 = d3.select(".quote9");

var isTransitioning_1 = false,
    isTransitioning_2 = false,
    isTransitioning_3 = false,
    isTransitioning_4 = false,
    isTransitioning_5 = false,
    isTransitioning_6 = false,
    isTransitioning_7 = false,
    isTransitioning_8 = false,
    isTransitioning_9 = false;

window.onscroll = function() {
    console.log(window.scrollY)
    if(window.scrollY >= 700 && window.scrollY <1200){ 
        //FIRST QUOTE APPEARS
        if (!isTransitioning_1) {
            var t= quote2
                  .style("opacity", 0)
            quote1
                .transition(t)
                .duration(100)
                    .style("opacity", 1)
                .transition()
                .on("start", function(){ isTransitioning_1 = true})
                .on("end", function(){ isTransitioning_1 = false})

        }

    } else if(window.scrollY >= 1200 && window.scrollY <2200){ 
        //SECOND QUOTE APPEARS
        if (!isTransitioning_2) {
            var t= d3.selectAll(".quote1, .quote3")
                  .style("opacity", 0)
            d3.select('.quote2')
                .transition(t)
                .duration(150)
                    .style("opacity", 1)
                .transition()
                .on("start", function(){ isTransitioning_2 = true})
                .on("end", function(){ isTransitioning_2 = false})
            }


    } else if(window.scrollY >= 2200 && window.scrollY <3000){  
        //THIRD QUOTE APPEARS
        if (!isTransitioning_3) {
            var t= d3.selectAll(".quote2, .quote4")
                  .style("opacity", 0)
            d3.select('.quote3')
                .transition(t)
                .duration(150)
                    .style("opacity", 1)
                .transition()
                .on("start", function(){ isTransitioning_3 = true})
                .on("end", function(){ isTransitioning_3 = false})
            }

    } else if(window.scrollY >= 3000 && window.scrollY <3400){ 
    	        //FOURTH QUOTE APPEARS
        if (!isTransitioning_4) {
            var t= d3.selectAll(".quote3, .quote5")
                  .style("opacity", 0)
            d3.select('.quote4')
                .transition(t)
                .duration(150)
                    .style("opacity", 1)
                .transition()
                .on("start", function(){ isTransitioning_4 = true})
                .on("end", function(){ isTransitioning_4 = false})
            }

    } else if(window.scrollY >= 4300 && window.scrollY <4600){ 
    	        //FIFTH QUOTE APPEARS
        if (!isTransitioning_5) {
            var t= d3.selectAll(".quote4, .quote6")
                  .style("opacity", 0)
            d3.select('.quote5')
                .transition(t)
                .duration(150)
                    .style("opacity", 1)
                .transition()
                .on("start", function(){ isTransitioning_5 = true})
                .on("end", function(){ isTransitioning_5 = false})
            }

    } else if(window.scrollY >= 4600 && window.scrollY <4900){ 
                //SIXTH QUOTE APPEARS
        if (!isTransitioning_6) {
            var t= d3.selectAll(".quote5, .quote7")
                  .style("opacity", 0)
            d3.select('.quote6')
                .transition(t)
                .duration(150)
                    .style("opacity", 1)
                .transition()
                .on("start", function(){ isTransitioning_6 = true})
                .on("end", function(){ isTransitioning_6 = false})
            }

    } else if(window.scrollY >= 5100 && window.scrollY <5700){ 
                //SEVENTH QUOTE APPEARS
        if (!isTransitioning_7) {
            var t= d3.selectAll(".quote6, .quote8")
                  .style("opacity", 0)
            d3.select('.quote7')
                .transition(t)
                .duration(150)
                    .style("opacity", 1)
                .transition()
                .on("start", function(){ isTransitioning_7 = true})
                .on("end", function(){ isTransitioning_7 = false})
            }

    } else if(window.scrollY >= 5800 && window.scrollY <6300){ 
                //EIGHTH QUOTE APPEARS
        if (!isTransitioning_8) {
            var t= d3.selectAll(".quote7, .quote9")
                  .style("opacity", 0)
            d3.select('.quote8')
                .transition(t)
                .duration(150)
                    .style("opacity", 1)
                .transition()
                .on("start", function(){ isTransitioning_8 = true})
                .on("end", function(){ isTransitioning_8 = false})
            }

    } else if(window.scrollY >= 6300 && window.scrollY < 6700){ 
                //NINTH QUOTE APPEARS
        if (!isTransitioning_9) {
            var t= d3.selectAll(".quote8")
                  .style("opacity", 0)
            d3.select('.quote9')
                .transition(t)
                .duration(150)
                    .style("opacity", 1)
                .transition()
                .on("start", function(){ isTransitioning_9 = true})
                .on("end", function(){ isTransitioning_9 = false})
        }

    } else {
    	d3.selectAll(".note-container").style("opacity", 0)
    }
};

