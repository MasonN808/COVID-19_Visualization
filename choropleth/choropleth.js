// let countyURL = 
// let covidURL = "https://data.cdc.gov/api/views/nra9-vzzn/rows.json?accessType=DOWNLOAD"
// let countyData;

// http://bl.ocks.org/jadiehm/af4a00140c213dfbc4e6
// https://data.cdc.gov/api/views/nra9-vzzn/rows.json?accessType=DOWNLOAD

// /*
//   Begin loading multiple data files. Promises are
//   pending operations that run asynchronously.
// */
// const dataPromise = d3.csv("data/nyliteracy.csv");
// const nysMapPromise = d3.json("data/NY-36-new-york-counties.geojson");
// const usaMapPromise = d3.json("data/us-states.geojson");

// /* Define global chart parameters. */
// const chartParams = {
//   width: 640,
//   height: 480,
//   detailWidth: 120,
//   detailPadding: 16,
//   mapExtent: [
//     [20, 20],
//     [620, 460]
//   ],
// };

// /* National average for below-basic prose literacy. */
// const nationalAvg = 14;

// /* Define sequential scale to indicate illiteracy rate. */
// const color = d3.scaleSequential(t => d3.hsl(34, 0.86, 1 - 0.8 * t).toString())
//   .domain([0, 50]);
// /* Define diverging scale to indicate below/above national average. */
// const hiLoColor = d3.scaleDiverging()
//   .interpolator(d3.interpolatePuOr)
//   .domain([0, nationalAvg, 50]);

// /* Create an SVG image to hold the chart. */
// const svg = d3.select("#choropleth")
//   .append("svg")
//   .attr("width", chartParams.width)
//   .attr("height", chartParams.height)
//   .on("click", toggleDetails);

// /* Container to hold the path elements for the map. */
// const map = svg.append("g");

// /* Register event listener for color palette toggle. */
// d3.select("#viewControl input")
//   .on("change", updateViewColors);

// /* Initialize color gradients for legend. */
// initializeGradients();

// /* Create a panel for detail annotations. */
// buildDetailsPanel();

// /* Create a legend at the bottom of the chart. */
// buildLegend();

// /* Once all of the data loads, we can build our chart. */
// Promise.all([dataPromise, nysMapPromise, usaMapPromise])
//   .then(buildChart);

// // ---------------- Helper functions ---------------- //

// /*
//   Main function that creates and display the chart.
//   Input to this function is a list of the three data sets
//   that were loaded and passed along from the Promises.
// */
// function buildChart([data, json, usaJson]) {
//   /* Define map projection. */
//   const projection = d3.geoConicEqualArea()
//     .rotate([60, 20, 0]) // order matters! rotate must come before fitting here
//     .fitExtent(chartParams.mapExtent, json);

//   /* Merge the data of interest with the GeoJSON features. */
//   for (let i = 0; i < data.length; i++) {
//     /* Look for GeoJSON features with counties that are also in data. */
//     for (let j = 0; j < json.features.length; j++) {
//       const jsonCounty = json.features[j].properties.NAME;
//       if (jsonCounty === data[i].County) {
//         /* Copy the data value into the GeoJSON features */
//         json.features[j].properties.value = data[i].Illiteracy;
//         json.features[j].properties.population = data[i].Population;
//         break; // Stop looking through the JSON, move to next county in data
//       }
//     }
//   }

//   /* Define path generator. */
//   const path = d3.geoPath()
//     .projection(projection);

//   /* Bind data and create one path per GeoJSON feature - USA background map. */
//   map.selectAll("path.bg")
//     .data(usaJson.features)
//     .enter()
//     .append("path")
//     .attr("class", "bg")
//     .attr("d", path);

//   /* Bind data and create one path per GeoJSON feature - NYS Counties foreground map. */
//   map.selectAll("path.fg")
//     .data(json.features)
//     .enter()
//     .append("path")
//     .attr("class", "fg")
//     .attr("d", path)
//     .style("fill", d => {
//       const value = d.properties.value;
//       return value ? color(value) : "#ccc";
//     })
//     .on("mouseover", updateDetails)
//     .on("mouseout", clearDetails)
// }

// /* Changes the color scale in response to user selection. */
// function updateViewColors() {
//   const useDiverging = d3.select(this).node().checked;

//   svg.select("#legend rect")
//     .style("fill", "url(" + (useDiverging ? "#divScale" : "#seqScale") + ")");
//   svg.selectAll("path.fg")
//     .style("fill", function () {
//       const value = d3.select(this).datum().properties.value;
//       if (value) {
//         return useDiverging ? hiLoColor(value) : color(value);
//       } else {
//         return "#ccc";
//       }
//     });
// }

// /* Create a simple legend at the bottom of the chart. */
// function buildLegend() {
//   const legend = svg.append("g")
//     .attr("id", "legend")
//     .attr("transform", "translate(40," + (chartParams.height - 80) + ")");

//   legend.append("text").text("0%")
//     .attr("y", 16);
//   legend.append("text").text("50%")
//     .attr("x", 250)
//     .attr("y", 16);
//   legend.append("text").text("Below-basic prose literacy")
//     .attr("text-anchor", "middle")
//     .attr("x", 140)
//     .attr("y", 40);
//   legend.append("rect")
//     .attr("x", 40)
//     .attr("height", 20)
//     .attr("width", 200)
//     .style("fill", "url(#seqScale)");
// }

// /* Show or hide the on-demand details panel. */
// function toggleDetails() {
//   const details = d3.select("#details");
//   details.style("display",
//     details.style("display") === "none" ? "block" : "none"
//   );
//   d3.select("#guide strong").text(
//     details.style("display") === "none" ? "show" : "hide"
//   );
// }

// /* Display details for the hovered county in the on-demand panel. */
// function updateDetails() {
//   const d = d3.select(this).datum();
//   const details = d3.select("#details");
//   details.select("h3")
//     .text(d.properties.NAME);
//   details.select("#popn")
//     .text(d.properties.population);
//   details.select("#literacy")
//     .text(
//       isNaN(d.properties.value) ?
//       "No tests" :
//       d.properties.value + "% below basic literacy"
//     );
// }

// /* Remove information when no county is hovered. */
// function clearDetails() {
//   const details = d3.select("#details");
//   details.select("h3")
//     .text("No selection");
//   details.select("#popn").text("N/A");
//   details.select("#literacy").text("Hover over a county for details.");
// }

// /* Create an annotation panel for display details on-demand. */
// function buildDetailsPanel() {
//   const detailXPos = chartParams.width - chartParams.detailWidth - 2 * chartParams.detailPadding;
//   const details = d3.select("#details")
//     .style("width", chartParams.detailWidth + "px")
//     .style("padding", "0 " + chartParams.detailPadding + "px")
//     .style("left", "calc(" + detailXPos + "px)")
//     .style("top", "0px");

//   details.append("p")
//     .html("Popn: <span id='popn'></span>");

//   details.append("p")
//     .attr("id", "literacy");
// }

// /* Create SVG color gradients for use in the chart legend. */
// function initializeGradients() {
//   const svgDefs = svg.append("defs");

//   const seqGradient = svgDefs.append("linearGradient")
//     .attr("id", "seqScale")
//     .attr("x1", "0%")
//     .attr("y1", "0%")
//     .attr("x2", "100%")
//     .attr("y2", "0%")
//   seqGradient.append("stop")
//     .attr("offset", "0%")
//     .attr("style", "stop-color:" + color(0) + ";stop-opacity:1");
//   seqGradient.append("stop")
//     .attr("offset", "50%")
//     .attr("style", "stop-color:" + color(25) + ";stop-opacity:1");
//   seqGradient.append("stop")
//     .attr("offset", "100%")
//     .attr("style", "stop-color:" + color(50) + ";stop-opacity:1");

//   const divGradient = svgDefs.append("linearGradient")
//     .attr("id", "divScale")
//     .attr("x1", "0%")
//     .attr("y1", "0%")
//     .attr("x2", "100%")
//     .attr("y2", "0%")
//   divGradient.append("stop")
//     .attr("offset", "0%")
//     .attr("style", "stop-color:" + hiLoColor(0) + ";stop-opacity:1");
//   divGradient.append("stop")
//     .attr("offset", "28%")
//     .attr("style", "stop-color:" + hiLoColor(14) + ";stop-opacity:1");
//   divGradient.append("stop")
//     .attr("offset", "100%")
//     .attr("style", "stop-color:" + hiLoColor(50) + ";stop-opacity:1");
// }

    // Citation: http://bl.ocks.org/jadiehm/af4a00140c213dfbc4e6#license

    var width = 960, height = 600;
    var color_domain = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000]
    var ext_color_domain = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000]
    var legend_labels = ["< 500", "500+", "1000+", "1500+", "2000+", "2500+", "3000+", "3500+", "4000+", "4500+", "5000+", "5500+", "6000+"]
    var color = d3.scale.threshold()
    
    .domain(color_domain)
    .range(["#dcdcdc", "#d0d6cd", "#bdc9be", "#aabdaf", "#97b0a0", "#84a491", "#719782", "#5e8b73", "#4b7e64", "#387255", "#256546", "#125937", "#004d28"]);
        
    var div = d3.select("#choropleth").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
        
    var svg = d3.select("#choropleth").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("margin", "-15px auto");
    var path = d3.geo.path()
        
    queue()
        .defer(d3.json, "us.json")
        .defer(d3.csv, "data.csv")
        .await(ready);
        
    function ready(error, us, data) {
         if (error) throw error;
		 var pairRateWithId = {};
		 var pairNameWithId = {};
        //  us = usdata;
        //  data = datadata;

		//Moves selction to front
		d3.selection.prototype.moveToFront = function() {
  			return this.each(function(){
    		this.parentNode.appendChild(this);
  			});
		}; 

		//Moves selction to back
		d3.selection.prototype.moveToBack = function() { 
    		return this.each(function() { 
        	var firstChild = this.parentNode.firstChild; 
        	if (firstChild) { 
            	this.parentNode.insertBefore(this, firstChild); 
        	} 
    		}); 
		};

        // let us = require("./us.json");
        console.log(us.features.properties) //Debugging
		data.forEach(function(d) {
            pairRateWithId[d.id] = +d.rate;
            pairNameWithId[d.id] = d.name;
            });

		svg.append("g")
		 .attr("class", "county")
		 .selectAll("path")
		 .data(topojson.feature(us, us.features.properties).features)
		 .enter().append("path")
		 .attr("d", path)
		 .style ( "fill" , function (d) {
		 return color (pairRateWithId[d.id]);
		 })
		 .style("opacity", 0.8)
		 .on("mouseover", function(d) {
		 	var sel = d3.select(this);
  		sel.moveToFront();
        
		d3.select(this).transition().duration(300).style({'opacity': 1, 'stroke': 'black', 'stroke-width': 1.5});

		div.transition().duration(300)
		 .style("opacity", 1)
		 div.text(pairNameWithId[d.id] + ": " + pairRateWithId[d.id])
		 .style("left", (d3.event.pageX) + "px")
		 .style("top", (d3.event.pageY -30) + "px");
		 })
		 .on("mouseout", function() {
		 	var sel = d3.select(this);
  			sel.moveToBack();
		 d3.select(this)
		 .transition().duration(300)
		 .style({'opacity': 0.8, 'stroke': 'white', 'stroke-width': 1});
		 div.transition().duration(300)
		 .style("opacity", 0);
		 })
	};
		 
    var legend = svg.selectAll("g.legend")
        .data(ext_color_domain)
        .enter().append("g")
        .attr("class", "legend");
        
    var ls_w = 73, ls_h = 20;
        
    legend.append("rect")
        .attr("x", function(d, i){ return width - (i*ls_w) - ls_w;})
        .attr("y", 550)
        .attr("width", ls_w)
        .attr("height", ls_h)
        .style("fill", function(d, i) { return color(d); })
        .style("opacity", 0.8);
        
    legend.append("text")
        .attr("x", function(d, i){ return width - (i*ls_w) - ls_w;})
        .attr("y", 590)
        .text(function(d, i){ return legend_labels[i]; });

        var legend_title = "Number of independent farms";

        svg.append("text")
        .attr("x", 10)
        .attr("y", 540)
        .attr("class", "legend_title")
        .text(function(){return legend_title});
