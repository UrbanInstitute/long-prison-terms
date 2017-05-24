window.onscroll = function() {
    console.log(window.scrollY)
    if(window.scrollY >= 700 && window.scrollY <1200){ console.log('hi')
    	d3.select("#quote1").style("opacity",1)
    	d3.select("#quote2").style("opacity",0)

    //	 d3.select("#quote1").style("position", "fixed")

    //	d3.select("#content1").transition().style("opacity",0)
    }else if(window.scrollY >= 1200 && window.scrollY <1900){ 
    	d3.selectAll(".note-container").transition().style("opacity", 0)
    	d3.select("#quote2").transition().style("opacity",1)

    	// d3.select("#content2").transition().style("opacity",0)
    	// d3.select("#content1").transition().style("opacity",1)
    } else if(window.scrollY >= 2200 && window.scrollY <3000){ 
    	d3.selectAll(".note-container").style("opacity", 0)
    	d3.select("#quote3").style("opacity",1)

    	// d3.select("#content2").transition().style("opacity",0)
    	// d3.select("#content1").transition().style("opacity",1)
    } else if(window.scrollY >= 3000 && window.scrollY <3400){ 
    	d3.selectAll(".note-container").style("opacity", 0)
    	d3.select("#quote4").style("opacity",1)

    	// d3.select("#content2").transition().style("opacity",0)
    	// d3.select("#content1").transition().style("opacity",1)
    } else if(window.scrollY >= 4500 && window.scrollY <5000){ 
    	d3.selectAll(".note-container").style("opacity", 0)
    	d3.select("#quote5").style("opacity",1)

    	// d3.select("#content2").transition().style("opacity",0)
    	// d3.select("#content1").transition().style("opacity",1)
    } 

    else {
    	d3.selectAll(".note-container").style("opacity", 0)
    }
};