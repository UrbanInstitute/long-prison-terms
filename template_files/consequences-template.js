console.log(window.scrollY)

var duration = 300; 

var isTransitioning_1 = false,
    isTransitioning_2 = false,
    isTransitioning_3 = false,
    isTransitioning_4 = false,
    isTransitioning_6 = false,
    isTransitioning_7 = false,
    isTransitioning_8 = false,
    isTransitioning_9 = false;
    isTransitioning_11 = false,
    isTransitioning_13 = false;
    isTransitioning_14 = false;


window.onscroll = function() {
    console.log(window.scrollY)
    if(window.scrollY < 200){
        d3.select("#introArrow")
            .style("opacity", 1)
    } else if(window.scrollY >= 200) {
         d3.select("#introArrow")
            .style("opacity", 0)
    } else if(window.scrollY >= 1300 && window.scrollY <2700){ 
        //SIDEBAR 1 APPEARS
        if (!isTransitioning_1) {
            d3.select(".con-quote3")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select(".con-quote1")
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_1 = true})
                .on("end", function(){ isTransitioning_1 = false})

        }

    } else if(window.scrollY >= 2700 && window.scrollY <4200){  
        //SIDEBAR 3 APPEARS
        if (!isTransitioning_3) {
            d3.selectAll(".con-quote1, .con-quote4")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.con-quote3')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_3 = true})
                .on("end", function(){ isTransitioning_3 = false})
            }

    }  else if(window.scrollY >= 4200 && window.scrollY <5000){ console.log('hi')
                //SIDEBAR 4 APPEARS
        if (!isTransitioning_4) {
            d3.selectAll(".con-quote3, .con-quote6")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.con-quote4')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_4 = true})
                .on("end", function(){ isTransitioning_4 = false})
            }

    } else if(window.scrollY >= 5000 && window.scrollY <5300){ 
                //SIDEBAR 6 APPEARS
        if (!isTransitioning_6) {
            d3.selectAll(".con-quote4, .con-quote7")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.con-quote6')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_6 = true})
                .on("end", function(){ isTransitioning_6 = false})
            }

    } else if(window.scrollY >= 5300 && window.scrollY <6600){ 
                //SIEBAR 2 APPEARS
        if (!isTransitioning_2) {
            d3.selectAll(".con-quote6, .con-quote7")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.con-quote2')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_2 = true})
                .on("end", function(){ isTransitioning_2 = false})
            }

    } else if(window.scrollY >= 6600 && window.scrollY <7300){ 
                //SIDEBAR 7 APPEARS
        if (!isTransitioning_7) {
            d3.selectAll(".con-quote2, .con-quote8")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.con-quote7')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_7 = true})
                .on("end", function(){ isTransitioning_7 = false})
            }

    } else if(window.scrollY >= 7300 && window.scrollY < 8000){ 
                //SIDEBAR 8 APPEARS
        if (!isTransitioning_8) {
            d3.selectAll(".con-quote7, .con-quote9")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.con-quote8')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_8 = true})
                .on("end", function(){ isTransitioning_8 = false})
        }

    } else if(window.scrollY >= 8000 && window.scrollY < 9900){ 
                //SIDEBAR 9 APPEARS
        if (!isTransitioning_9) {
            d3.selectAll(".con-quote8, .con-quote13")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.con-quote9')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_9 = true})
                .on("end", function(){ isTransitioning_9 = false})
        }

    } else if(window.scrollY >= 9900 && window.scrollY < 10900){ 
                //SIDEBAR 13 APPEARS
        if (!isTransitioning_13) {
            d3.selectAll(".con-quote9, .con-quote14")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.con-quote13')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_13 = true})
                .on("end", function(){ isTransitioning_13 = false})
        }

    } else if(window.scrollY >= 10900 && window.scrollY < 12000){ 
                //SIDEBAR 14 APPEARS
        if (!isTransitioning_14) {
            d3.selectAll(".con-quote13, .con-quote11")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.con-quote14')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_14 = true})
                .on("end", function(){ isTransitioning_14 = false})
        }

    } else if(window.scrollY >= 12000){ 
                //SIDEBAR 11 APPEARS
        if (!isTransitioning_11) {
            d3.selectAll(".con-quote14")
                .transition()
                .duration(duration)
                .style("opacity", 0)
            d3.select('.con-quote11')
                .transition()
                .duration(duration)
                    .style("opacity", 1)
                .on("start", function(){ isTransitioning_11 = true})
                .on("end", function(){ isTransitioning_11 = false})
        }

    } else {
        d3.selectAll(".note-container").style("opacity", 0)
    }
};