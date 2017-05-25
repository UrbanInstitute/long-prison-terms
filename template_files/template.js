console.log(window.scrollY)

var quote1= d3.select(".quote1")
var quote2 = d3.select(".quote2")
var quote3 = d3.select(".quote3")
var quote4 = d3.select(".quote4")
var quote5 = d3.select(".quote5")
var quote6 = d3.select(".quote6")
var quote7 = d3.select(".quote7")
var quote8 = d3.select(".quote8")
var quote9 = d3.select(".quote9")



window.onscroll = function() {
    console.log(window.scrollY)
    if(window.scrollY >= 700 && window.scrollY <1200){ 
        //FIRST QUOTE APPEARS

        var t= quote2
              .style("opacity", 0)
        quote1
            .transition(t)
                .style("opacity", 1)
            .transition()



    } else if(window.scrollY >= 1200 && window.scrollY <2200){ 
        //SECOND QUOTE APPEARS

            var t= d3.selectAll(".quote1, .quote3")
                  .style("opacity", 0)
            d3.select('.quote2')
                .transition(t)
                    .style("opacity", 1)
                .transition()



    } else if(window.scrollY >= 2200 && window.scrollY <3000){  
        //THIRD QUOTE APPEARS

            var t= d3.selectAll(".quote2, .quote4")
                  .style("opacity", 0)
                  .classed('hi', true)
            d3.select('.quote3')
                .transition(t)
                    .style("opacity", 1)
                .transition()

    } else if(window.scrollY >= 3000 && window.scrollY <3400){ 
    	        //FOURTH QUOTE APPEARS

            var t= d3.selectAll(".quote3, .quote5")
                  .style("opacity", 0)
            d3.select('.quote4')
                .transition(t)
                    .style("opacity", 1)
                .transition()

    } else if(window.scrollY >= 4300 && window.scrollY <4600){ 
    	        //FIFTH QUOTE APPEARS

            var t= d3.selectAll(".quote4, .quote6")
                  .style("opacity", 0)
            d3.select('.quote5')
                .transition(t)
                    .style("opacity", 1)
                .transition()
    } else if(window.scrollY >= 4600 && window.scrollY <4900){ 
                //SIXTH QUOTE APPEARS

            var t= d3.selectAll(".quote5, .quote7")
                  .style("opacity", 0)
            d3.select('.quote6')
                .transition(t)
                    .style("opacity", 1)
                .transition()
    } else if(window.scrollY >= 5100 && window.scrollY <5700){ 
                //SEVENTH QUOTE APPEARS

            var t= d3.selectAll(".quote6, .quote8")
                  .style("opacity", 0)
            d3.select('.quote7')
                .transition(t)
                    .style("opacity", 1)
                .transition()
    } else if(window.scrollY >= 5800 && window.scrollY <6300){ 
                //EIGHTH QUOTE APPEARS

            var t= d3.selectAll(".quote7, .quote9")
                  .style("opacity", 0)
            d3.select('.quote8')
                .transition(t)
                    .style("opacity", 1)
                .transition()
    } else if(window.scrollY >= 6300 && window.scrollY < 6700){ 
                //NINTH QUOTE APPEARS

            var t= d3.selectAll(".quote8")
                  .style("opacity", 0)
            d3.select('.quote9')
                .transition(t)
                    .style("opacity", 1)
                .transition()
    } 

    else {
    	d3.selectAll(".note-container").style("opacity", 0)
    }
};

