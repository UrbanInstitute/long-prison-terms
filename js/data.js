// d3.select(".dd-table").transition().duration(2000).style("height","0px")
// d3.select(".dd-arrow").transition().duration(2000).style("transform","rotate(180deg)")
function initDepot(){
	var PERCENT = d3.format(".2%")
	var NUMERIC = d3.format(".2f")
	var INTEGERS = d3.format(",")
	function buildSnapshotTable(){
		var table = d3.select("#snapshot-table").append("table")
		var h1 = table.append("tr").attr("class", "header_row1")
		h1.append("th").attr("rowspan",2).html("State")
		h1.append("th").attr("rowspan",2).html("Year")
		h1.append("th").attr("rowspan",2).html("Of state prison population, Percent black")
		h1.append("th").attr("rowspan",2).html("Of those serving longest 10% of prison terms, Percent black")
		h1.append("th").attr("rowspan",2).html("People incarcerated for half of their life or more")
		h1.append("th").attr("colspan",2).html("Of those serving longest 10% of prison terms")
		h1.append("th").attr("colspan",4).html("Of those serving longest 10% of prison terms who were incarcerated before age 25")
		h1.append("th").html("Of those serving 10 or more years:")

		var h2 = table.append("tr").attr("class", "header_row2")
		h2.append("th").html("Share incarcerated before age 25")
		h2.append("th").html("Share currently 55 or older")
		h2.append("th").html("People")
		h2.append("th").html("Percent black")
		h2.append("th").html("Percent male")
		h2.append("th").html("Share convicted of violent offenses")
		h2.append("th").html("Share who are black men incarcerated before age 25")

		d3.csv("data/dd-snapshot_5-31.csv", function(data){
			var tr = table
				.selectAll(".dataRow")
				.data(data)
				.enter()
				.append("tr")
				.attr("class","dataRow")
			tr.append("td")
				.html(function(d){ return d.state })
			tr.append("td")
				.html(function(d){ return d.year })
			tr.append("td")
				.html(function(d){ return PERCENT(d.pctblackprisonpop/100) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.pctblacktop10/100) })
			tr.append("td")
				.html(function(d){ return INTEGERS(d.numinchalflife) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.top10pct25und/100) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.pct55plus_top10) })
			tr.append("td")
				.html(function(d){ return INTEGERS(d.rawpop_top10_u25) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.pctblack_top10_u25) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.pctmale_top10_u25) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.pctviol_top10_u25) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.pctblkmaleu25_10plus) })

		})
	}
	function buildTimeServedTable(){
		var table = d3.select("#timeserved-table").append("table")
		var h1 = table.append("tr").attr("class", "header_row1")
		h1.append("th").attr("rowspan",2).html("State")
		h1.append("th").attr("rowspan",2).html("Year")
		h1.append("th").attr("colspan",3).html("Mean time served (years)")
		h1.append("th").attr("rowspan",2).html("90th percentile, time served (years)")
		h1.append("th").attr("colspan",2).html("Mean time served by decile (years)")

		var h2 = table.append("tr").attr("class", "header_row2")
		h2.append("th").html("All offenses")
		h2.append("th").html("Violent offenses")
		h2.append("th").html("Nonviolent offenses")
		h2.append("th").html("Bottom 90%")
		h2.append("th").html("Top 10%")

		d3.csv("data/dd-time_6-12.csv", function(data){
			var tr = table
				.selectAll(".dataRow")
				.data(data)
				.enter()
				.append("tr")
				.attr("class","dataRow")

			tr.append("td")
				.html(function(d){ return d.state })
			tr.append("td")
				.html(function(d){ return d.year })
			tr.append("td")
				.html(function(d){ return NUMERIC(d.los_mean_all) })
			tr.append("td")
				.html(function(d){ return NUMERIC(d.los_mean_violent) })
			tr.append("td")
				.html(function(d){ return NUMERIC(d.los_mean_notviol) })
			tr.append("td")
				.html(function(d){ return NUMERIC(d.los_90thpct_all) })
			tr.append("td")
				.html(function(d){ return NUMERIC(d.los_meanbottom90) })
			tr.append("td")
				.html(function(d){ return NUMERIC(d.los_meantop10) })

		})
	}
	function buildBreakdownTable(){
		var table = d3.select("#breakdown-table").append("table")
		var h1 = table.append("tr").attr("class", "header_row1")
		h1.append("th").attr("rowspan",2).html("State")
		h1.append("th").attr("rowspan",2).html("Year")
		h1.append("th").attr("rowspan",2).html("Total population at year-end")
		h1.append("th").attr("colspan",2).html("0&ndash;2 years served")
		h1.append("th").attr("colspan",2).html("2&ndash;5 years served")
		h1.append("th").attr("colspan",2).html("5&ndash;10 years served")
		h1.append("th").attr("colspan",2).html("10&ndash;15 years served")
		h1.append("th").attr("colspan",2).html("15&ndash;20 years served")
		h1.append("th").attr("colspan",2).html("20&ndash;25 years served")
		h1.append("th").attr("colspan",2).html("25 or more years served")


		var h2 = table.append("tr").attr("class", "header_row2")
		h2.append("th").html("People")
		h2.append("th").html("Share of population")
		h2.append("th").html("People")
		h2.append("th").html("Share of population")
		h2.append("th").html("People")
		h2.append("th").html("Share of population")
		h2.append("th").html("People")
		h2.append("th").html("Share of population")
		h2.append("th").html("People")
		h2.append("th").html("Share of population")
		h2.append("th").html("People")
		h2.append("th").html("Share of population")
		h2.append("th").html("People")
		h2.append("th").html("Share of population")

		var PERCENT = d3.format(".2%")
		d3.csv("data/dd-time_6-12.csv", function(data){
			var tr = table
				.selectAll(".dataRow")
				.data(data)
				.enter()
				.append("tr")
				.attr("class","dataRow")
			tr.append("td")
				.html(function(d){ return d.state })
			tr.append("td")
				.html(function(d){ return d.year })
			tr.append("td")
				.html(function(d){ return INTEGERS(d.yrendpop_all) })

			tr.append("td")
				.html(function(d){ return INTEGERS(d.los_0_2_count) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.los_0_2_pct) })
			tr.append("td")
				.html(function(d){ return INTEGERS(d.los_5_10_count) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.los_5_10_pct) })
			tr.append("td")
				.html(function(d){ return INTEGERS(d.los_10_15_count) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.los_10_15_pct) })
			tr.append("td")
				.html(function(d){ return INTEGERS(d.los_15_20_count) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.los_15_20_pct) })
			tr.append("td")
				.html(function(d){ return INTEGERS(d.los_20_25_count) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.los_20_25_pct) })
			tr.append("td")
				.html(function(d){ return INTEGERS(d.los_2_5_count) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.los_2_5_pct) })
			tr.append("td")
				.html(function(d){ return INTEGERS(d.los_25plus_count) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.los_25plus_pct) })


		})
	}
	function buildTrendsTable(){
		var table = d3.select("#trends-table").append("table")
		var h1 = table.append("tr").attr("class", "header_row1")
		h1.append("th").attr("rowspan",2).html("State")
		h1.append("th").attr("rowspan",2).html("Year")
		h1.append("th").attr("colspan",3).html("Percent black by time served")
		h1.append("th").attr("rowspan",2).html("<span class = \"numerator\">Percent black in state prison population</span><span class = \"denominator\">Percent black in state population</span>")
		h1.append("th").attr("rowspan",2).html("<span class = \"numerator\">Percent black serving less than 10 years</span><span class = \"denominator\">Percent black in state population</span>")
		h1.append("th").attr("rowspan",2).html("<span class = \"numerator\">Percent black serving 10 or more years</span><span class = \"denominator\">Percent black in state population</span>")
		h1.append("th").attr("rowspan",2).html("Women serving less than 10 years")
		h1.append("th").attr("rowspan",2).html("Women serving 10 or more years")
		h1.append("th").attr("rowspan",2).html("Share of women serving 10 or more years")

		var h2 = table.append("tr").attr("class", "header_row2")
		h2.append("th").html("Total prison population")
		h2.append("th").html("Less than 10 years")
		h2.append("th").html("10 or more years")

		var PERCENT = d3.format(".2%")
		d3.csv("data/dd-time_6-12.csv", function(data){
			var tr = table
				.selectAll(".dataRow")
				.data(data)
				.enter()
				.append("tr")
				.attr("class","dataRow")
			tr.append("td")
				.html(function(d){ return d.state })
			tr.append("td")
				.html(function(d){ return d.year })
			tr.append("td")
				.html(function(d){ return PERCENT(d.pctblack_prisonpop) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.pctblack_under10) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.pctblack_10plus) })
			tr.append("td")
				.html(function(d){ return NUMERIC(d.rri_statepop) })
			tr.append("td")
				.html(function(d){ return NUMERIC(d.rri_under10) })
			tr.append("td")
				.html(function(d){ return NUMERIC(d.rri_10plus) })
			tr.append("td")
				.html(function(d){ return INTEGERS(d.numwomen_under10) })
			tr.append("td")
				.html(function(d){ return INTEGERS(d.numwomen_10plus) })
			tr.append("td")
				.html(function(d){ return PERCENT(d.pctwomen_10plus) })
		})
	}

	buildSnapshotTable();
	buildTimeServedTable();
	buildBreakdownTable();
	buildTrendsTable();


	var dd_duration = 1500;
	var HEIGHTS = {
		"snapshot-table": 1640,
		"timeserved-table": 14679,
		"breakdown-table": 14760,
		"trends-table": 14770
	}

	d3.selectAll(".table-container")
		.on("mouseover", function(){
			d3.select(this)
				.select(".dd-title")
				.style("color","#1696d2")
		})
		.on("mouseout", function(){
			d3.select(this)
				.select(".dd-title")
				.style("color","#000")
		})
		.on("click", function(){
			if(d3.select(this).classed("closed")){
				d3.select($(this).next()[0])
					.select(".dd-table")
					.transition().duration(dd_duration)
						.style("height",function(){
							console.log(d3.select(this).node())
							return HEIGHTS[d3.select(this).attr("id")] + "px"
						})
						.style("margin-bottom","20px")
				d3.select(this)
					.select(".dd-arrow")
					.transition()
					.duration(dd_duration)
					.style("transform","rotate(180deg)")
				d3.select(this)
					.classed("closed", false)
					.classed("open", true)
				d3.select($(this).next()[0])
					.selectAll(".dd_scrollElement")
					.transition()
					.style("opacity",1)
			}else{
				d3.select($(this).next()[0])
					.select(".dd-table")
					.transition().duration(dd_duration)
						.style("height","0px")
						.style("margin-bottom","0px")
				d3.select(this)
					.select(".dd-arrow")
					.transition()
					.duration(dd_duration)
					.style("transform","rotate(0deg)")
				d3.select(this)
					.classed("closed", true)
					.classed("open", false)
				d3.select($(this).next()[0])
					.selectAll(".dd_scrollElement")
					.transition()
					.style("opacity",0)
			}
		})

	function addScrollButtons(){
		console.log("foo")
		d3.selectAll(".dd-table")
			.each(function(){
				var containerWidth = this.getBoundingClientRect().width
				var tableWidth = d3.select(this).select("table").node().getBoundingClientRect().width
				var opacity = (d3.select($(this.parentNode).prev()[0]).classed("open")) ? 1 : 0
				// console.log(containerWidth, tableWidth)
				if(tableWidth > containerWidth){
					d3.select(this.parentNode).selectAll(".dd_scrollElement").remove();
					var ddLeft = d3.select(this.parentNode)
						.append("div")
						.style("opacity", opacity)
						.attr("class","dd_scrollElement dd_scrollArrow dd_left")
					ddLeft.append("img")
						.attr("src","img/arrow.png")
					ddLeft.on("click", function(){
							var tableWidth = (this.parentNode.getBoundingClientRect().width - 30)
							$(d3.select(this.parentNode).select(".dd-table").node()).animate({
								scrollLeft: '-=' + tableWidth
							}, 1000);
						})

					var ddRight = d3.select(this.parentNode)
						.append("div")
						.style("opacity", opacity)
						.attr("class","dd_scrollElement dd_scrollArrow dd_right")
					ddRight.append("img")
						.attr("src","img/arrow.png")
					ddRight.on("click", function(){
							var tableWidth = (this.parentNode.getBoundingClientRect().width - 30)
							console.log(tableWidth)
							$(d3.select(this.parentNode).select(".dd-table").node()) .animate({
								scrollLeft: '+=' + tableWidth
							}, 1000);
						})
				}else{
					d3.select(this.parentNode).selectAll(".dd_scrollElement").remove();
				}
			})
	}


  // $('#right-button').click(function() {
  //     event.preventDefault();
  //     $('#content').animate({
  //       marginLeft: "+=200px"
  //     }, "slow");
  //  });

  //    $('#left-button').click(function() {
  //     event.preventDefault();
  //     $('#content').animate({
  //       marginLeft: "-=200px"
  //     }, "slow");
  //  });

	addScrollButtons();
	(function() {
	    var throttle = function(type, name, obj) {
	        obj = obj || window;
	        var running = false;
	        var func = function() {
	            if (running) { return; }
	            running = true;
	             requestAnimationFrame(function() {
	                obj.dispatchEvent(new CustomEvent(name));
	                running = false;
	            });
	        };
	        obj.addEventListener(type, func);
	    };

	    /* init - you can init any event */
	    throttle("resize", "optimizedResize");
	})();

	// handle event
	window.addEventListener("optimizedResize", function() {
	    addScrollButtons();
	});
}

