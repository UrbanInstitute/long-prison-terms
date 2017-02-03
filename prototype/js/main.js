function drawIntro(data, YEAR_IN_MS, MAX_BARS){
	// var YEAR_IN_MS = 2500
	// var MAX_BARS = 12
	function dotColor(sentence){
		if(sentence >= 10){
			return "#fdbf11"
		}else{
			return "#1696d2";
		}
	}
	function yearsToMS(year){
		return d3.max([0,year]) * YEAR_IN_MS
	}
	var WIDTH = 500,
		HEIGHT = 500,
 		margin = {top: 2, right: 25, bottom: 10, left: 25},
 		width = WIDTH - margin.left - margin.right,
 		height = HEIGHT - margin.top - margin.bottom
	var svg = d3.select("#introGraphic")
		.append("svg")
		.attr("width",WIDTH)
		.attr("height", HEIGHT)
	var g = svg.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	g.append("rect")
		.attr("width", width)
		.attr("height", height)
		.attr("fill", "none")
		.attr("stroke", "#000000")
// 	var test = g.append("g")
// 		.attr("transform", "translate(0,"  + height/2 + ")");

// 	test.append("rect")
// 		.attr("width", width + "px")
// 		.attr("height", "50px")
// 		.attr("fill", "#dedddd")

// 	var dot = test.append("circle")
// 		.attr("cx", 0)
// 		.attr("cy", 25)
// 		.attr("r", "20")
// 		.attr("fill", "#1696d2")

// var N = 365
// for(var i = 0; i < N+1; i++){
// 	dot.transition()
// 		.delay((i-1) * 2000/N)
// 		.duration(2000/N)
// 		.ease(d3.easeLinear)
// 		.attr("cx", i*(width/N))
// }
// 	test.transition()
// 		.delay(500)
// 		.duration(1000)
// 		.attr("transform", "translate(0,"  + height/4 + ")");


	// console.log(data)

	data.sort(function(a, b) {
        return parseFloat(b.admission) - parseFloat(a.admission)
    });


	var trackRatio = .4,
		dotRatio = .7,
		trackHeight = d3.max([height/data.length, height/MAX_BARS])
		// trackHeight =height/data.length

	data.forEach(function(datum, ind){
		// console.log(datum, ind)
		animateDot(datum, ind)
	})
    function animateDot(datum, ind){
    	console.log(((ind - (data.length  - MAX_BARS))*trackHeight), ind)
	var track = g
		.selectAll(".tractGroup")
		.data(data)
		.enter()
		.append("g")
		.attr("class", "tractGroup inactive")
		.attr("transform", function(d){
			return "translate(0,"  + ((ind - (data.length  - MAX_BARS))*trackHeight) + ")"
		})



	track.append("rect")
		.attr("class", "introMotion")
		.attr("width", width + "px")
		.attr("height", (trackHeight*trackRatio) + "px")
		.attr("y",(1-trackRatio)*.5*trackHeight)
		.attr("fill", "#e3e3e3")
		.style("opacity", 0)
		.transition()
			.delay(function(d){ return yearsToMS(d.admission)}) 
			.style("opacity", 1)
			.on("end", function(){
				d3.select(this.parentNode).classed("inactive", false).classed("active", true)
			})

	track.append("rect")
		.attr("class", "trackFilled introMotion")
		.attr("width", function(d){
			return (d3.min([0,d.admission]) * -1 / d.sentence)*width + "px"
		})
		.attr("height", (trackHeight*trackRatio) + "px")
		.attr("y",(1-trackRatio)*.5*trackHeight)
		.attr("fill", "#9d9d9d")
		.style("opacity", 0)
		.transition()
			.delay(function(d){ return yearsToMS(d.admission)}) 
			.style("opacity", 1)
			.transition()
			.ease(d3.easeLinear)
				.duration(function(d){
					if(d.admission < 0){
						return yearsToMS((d.sentence -(-1 * d.admission)) * d.lengthOfStay/d.sentence)
					}else{
						return yearsToMS(d.lengthOfStay)
					}
				})
				.attr("width", function(d){ return width * (d.lengthOfStay/d.sentence) + "px" })

	var dot = track.append("circle")
		.attr("class","dot introMotion")
		.attr("cx", function(d){
			return (d3.min([0,d.admission]) * -1 / d.sentence)*width
		})
		.attr("cy", (1-trackRatio)*.5*trackHeight*1.5)
		.attr("r", trackHeight * dotRatio * .5)
		.style("fill", function(d){ return dotColor(d.sentence) })
		.style("opacity", 0)
		.transition()
			.delay(function(d){ return yearsToMS(d.admission)}) 
			.style("opacity", 1)
			.attr("class", "dot active introMotion")
			.transition()
				.duration(function(d){
					if(d.admission < 0){
						return yearsToMS((d.sentence - (-1 * d.admission)) * d.lengthOfStay/d.sentence)
					}else{
						return yearsToMS(d.lengthOfStay)
					}
					
				})
				.ease(d3.easeLinear)
				.attr("cx", function(d){ return width * (d.lengthOfStay/d.sentence) })
				.on("start",function(d){
					console.log(ind)
				// 	if(i == 0){
				// 		// console.log("done")
				// 		d3.selectAll(".introMotion").transition()
				// 	}
				})
				.on("end", function(d){
					d3.select(this.parentNode)
						.classed("inactive", true).classed("active", false)
						.select(".trackFilled")
						.transition()
						.duration(100)
						.style("fill", "#ec008b")
				d3.select(this.parentNode)
					.selectAll("rect")
					.transition()
					.delay(200)
					.duration(100)
					.ease(d3.easeLinear)
					.style("opacity",0)
					.on("end", function(){
						d3.select(this.parentNode).remove()
					d3.selectAll(".tractGroup")
						.transition()
						.duration(200)
						.attr("transform", function(){
							var top = this.getBoundingClientRect().top
							var count = 0;
							var gs = d3.selectAll(".tractGroup").nodes()
							gs.forEach(function(g){
								if(g.getBoundingClientRect().top > top){
									count += 1
								}
							})
							// console.log(count)
							return "translate(0,"  + ((( MAX_BARS) - 1 -  count)*trackHeight) + ")"							
						});
					})

				})
}
	// setTimeout(function(){
	// 	d3.selectAll("circle").transition();
	// 	d3.selectAll(".tractGroup").transition();
	// 	d3.selectAll(".tractGroup rect").transition();
	// }, 5290)

drawLines()
}



function drawLines(){
 var w = 200;
    var h = 100;

    var svg = d3.select("#lineChart")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
 //      .attr("id", "visualization")
 //      .attr("xmlns", "http://www.w3.org/2000/svg");

 //    var data = d3.range(11).map(function(){return Math.random()*10})
    var data = []
    // console.log(data)
    var x = d3.scaleLinear().domain([0, 100]).range([0, 100]);
    var y = d3.scaleLinear().domain([0, 40]).range([90, 10]);
    var line = d3.line()
      .x(function(d,i) {return x(i);})
      .y(function(d) {return y(d);})

    var path = svg.append("path")
      .attr("d", line(data))
      .attr("stroke", "#1696d2")
      .attr("stroke-width", "2")
      .attr("fill", "none");

    // var totalLength = path.node().getTotalLength();

    // path
    //   .attr("stroke-dasharray", totalLength + " " + totalLength)
    //   .attr("stroke-dashoffset", totalLength)
    //   .transition()
    //     .duration(2000)
    //     // .ease("line)
    //     .attr("stroke-dashoffset", 0);


	setInterval(countPop, 100);
	function countPop(){
		var pop = d3.selectAll(".tractGroup.active").nodes().length
		if(pop == 0){
			return false
		}else{
			d3.select("#prisonPop span").text(pop)
			data.push(pop)
			     // totalLength = path.node().getTotalLength();
			path.transition()
			.attr("d", line(data))
		}
    // path
    //   .attr("stroke-dasharray", totalLength + " " + totalLength)
    //   .attr("stroke-dashoffset", totalLength)
    //   // .transition()
    //     // .duration(20)
    //     // .ease("line)
    //     .attr("stroke-dashoffset", 0);

	}
}