
    // // Citation: http://bl.ocks.org/jadiehm/af4a00140c213dfbc4e6#license
    // // d3.select('#choropleth').remove;

    // var width = 960,
    //     height = 600;

    // var color_domain = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 7000];

    // var ext_color_domain = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000];

    // var legend_labels = ["< 500", "500+", "1000+", "1500+", "2000+", "2500+", "3000+", "3500+", "4000+", "4500+", "5000+", "5500+", "6000+"];

    // var color = d3.scale.threshold()
    //     .domain(color_domain)
    //     // .range(["#dcdcdc", "#d0d6cd", "#bdc9be", "#aabdaf", "#97b0a0", "#84a491", "#719782", "#5e8b73", "#4b7e64", "#387255", "#256546", "#125937", "#004d28"]);
    //     .range(['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000']);

        
    // var div = d3.select("#choroplethMap").append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0);
        
    // var svg = d3.select("#choroplethMap").append("svg")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .style("margin", "-15px auto");

    // // var path = d3.geo.path().projection(null);
    // var path = d3.geo.path();

    // function ready(error, us, data) {
    //      if (error) throw error;
         
	// 	 var pairRateWithId = {};
	// 	 var pairNameWithId = {};

	// 	//Moves selction to front
	// 	d3.selection.prototype.moveToFront = function() {
  	// 		return this.each(function(){
    // 		this.parentNode.appendChild(this);
  	// 		});
	// 	}; 

	// 	//Moves selction to back
	// 	d3.selection.prototype.moveToBack = function() { 
    // 		return this.each(function() { 
    //     	var firstChild = this.parentNode.firstChild; 
    //     	if (firstChild) { 
    //         	this.parentNode.insertBefore(this, firstChild); 
    //     	} 
    // 		}); 
	// 	};

    //     console.log(us.objects.counties) //Debugging
	// 	data.forEach(function(d) {
    //         pairRateWithId[d.fips_code] = +d.percent_test_results_reported_positive_last_7_days; //TODO: change d.id to whatever it is in data.csv
    //         pairNameWithId[d.fips_code] = d.county_name;
    //         if (pairRateWithId[d.fips_code] === undefined) {
    //             console.error("ERROR: found undefined at", d.fips_code)
    //         }
    //         // console.log(d.fips_code) //Debugging
    //         })

    //     // Debugging
    //     // data.forEach(function(d) {
    //     //     console.log(d.fips_code)
    //     // });
    //     console.log(pairRateWithId)

    //     // CONTINUE HERE 5/3/2022
	// 	svg.append("g")
	// 	 .attr("class", "county")
	// 	 .selectAll("path")
	// 	 .data(topojson.feature(us, us.objects.counties).features)
	// 	 .enter().append("path")
	// 	 .attr("d", path)
	// 	 .style ( "fill" , function (d) {
	// 	    return color (pairRateWithId[d.fips_code]);
	// 	    })
	// 	 .style("opacity", 0.8)
	// 	 .on("mouseover", function(d) {
	// 	 	var sel = d3.select(this);
  	// 	    sel.moveToFront();
    //         d3.select(this).transition().duration(300).style({'opacity': 1, 'stroke': 'black', 'stroke-width': 1.5});

    //         div.transition().duration(300)
	// 	        .style("opacity", 1)
	// 	        div.text(pairNameWithId[d.fips_code] + ": " + pairRateWithId[d.fips_code])
	// 	        .style("left", (d3.event.pageX) + "px")
	// 	        .style("top", (d3.event.pageY -30) + "px");
	// 	 })
	// 	 .on("mouseout", function() {
	// 	 	var sel = d3.select(this);
  	// 		sel.moveToBack();
    //         d3.select(this)
    //         .transition().duration(300)
    //         .style({'opacity': 0.8, 'stroke': 'white', 'stroke-width': 1});
    //         div.transition().duration(300)
    //         .style("opacity", 0);
	// 	 });
    //      console.log(topojson.feature(us, us.objects.counties).features);
    //     //  svg.append("path")
    //     //  .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a.id / 1000 ^ b.id / 1000; }))
    //     //  .attr("class", "state-borders")
    //     //  .attr("d", path);
	// };
		 
    // var legend = svg.selectAll("g.legend")
    //     .data(ext_color_domain)
    //     .enter().append("g")
    //     .attr("class", "legend");
        
    // var ls_w = 73, ls_h = 20;
        
    // legend.append("rect")
    //     .attr("x", function(d, i){ return width - (i*ls_w) - ls_w;})
    //     .attr("y", 550)
    //     .attr("width", ls_w)
    //     .attr("height", ls_h)
    //     .style("fill", function(d, i) { return color(d); })
    //     .style("opacity", 0.8);
        
    // legend.append("text")
    //     .attr("x", function(d, i){ return width - (i*ls_w) - ls_w;})
    //     .attr("y", 590)
    //     .text(function(d, i){ return legend_labels[i]; });

    // var legend_title = "Number of Covid Cases";

    // svg.append("text")
    //     .attr("x", 10)
    //     .attr("y", 540)
    //     .attr("class", "legend_title")
    //     .text(function(){return legend_title});

    // queue()
    // .defer(d3.json, "counties-10m.json")
    // .defer(d3.csv, "data.csv")
    // .await(ready);

    function makeChoropleth(){
        var width = 1100,
            height = 600;

        var color_domain = [2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];

        var ext_color_domain = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];

        var legend_labels = ["> 1000", '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000+'];
        // var legend_labels = ["< 500", "500+", "1000+", "1500+", "2000+", "2500+", "3000+", "3500+", "4000+", "4500+", "5000+", "5500+", "6000+"];

        var colorScale = d3.scale.threshold()
            .domain(color_domain)
            // .range(['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#990000']);
            .range(['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000']);
            
        var div = d3.select("#choroplethMap").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
            
        var svg = d3.select("#choroplethMap").append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("margin", "-15px auto");

        // var path = d3.geo.path().projection(null);
        var path = d3.geo.path();

        function ready(error, us, data) {
            if (error) throw error;
            
            var pairRateWithId = {};
            var pairNameWithId = {};

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

            // console.log(us.objects.counties) //Debugging
            data.forEach(function(d) {
                if (pairRateWithId[d.fips_code] === undefined) { // add another condidtion stating that this is the first iteration
                    pairRateWithId[d.fips_code] = 0 // This makes sure NaNs arent produced using += newCases
                }
                if (d.percent_test_results_reported_positive_last_7_days === undefined) {
                    newCases = 0
                    console.log(d.fips_code)
                }
                else {
                    newCases = +d.percent_test_results_reported_positive_last_7_days
                }
                pairRateWithId[d.fips_code] += newCases; //TODO: change d.id to whatever it is in data.csv
                pairNameWithId[d.fips_code] = d.county_name;
                if (pairRateWithId[d.fips_code] === undefined) {
                    console.error("ERROR: found undefined at", d.fips_code)
                }
                // console.log(d.fips_code) //Debugging
                })

            // Debugging
            // data.forEach(function(d) {
            //     console.log(d.fips_code)
            // 	// if (pairRateWithId[d.fips_code] === undefined) {
            // 	// 	console.error("ERROR: found undefined at", d.fips_code)
            // 	// }
            // });
            console.log("pairratewithid1", pairRateWithId[10001]);

            svg.append("g")
            .attr("class", "county")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.counties).features)
            .enter().append("path")
            .attr("d", path)
            .style ( "fill" , function(d) {
                // d is the element in the us.json file so we use id to identify fips code
                d.total = pairRateWithId[d.id] || -1;
                return colorScale(d.total);
            })
            .style("opacity", 0.8)
            .on("mouseover", function(d) {
                var sel = d3.select(this);
                sel.moveToFront();
                d3.select(this).transition().duration(300).style({'opacity': 1, 'stroke': 'black', 'stroke-width': 1.5});

                div.transition().duration(300)
                    .style("opacity", 1)
                    // console.log("pairratewithid1", pairRateWithId);
                    if (pairRateWithId[d.id] === undefined){
                        numCases = "N/A"
                    }
                    else {
                        numCases = pairRateWithId[d.id]
                    }
                    div.text(pairNameWithId[d.id] + ": " + Math.round(numCases))

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
            });
            // console.log("pairratewithid2", pairRateWithId)
        };
        
        var legend = svg.selectAll("g.legend")
            .data(ext_color_domain)
            .enter().append("g")
            .attr("class", "legend");
        
        // ls_w ---> how wide the legend elements/bars are
        // ls_h ---> how tall the legend elements/bars are
        var ls_w = 20, ls_h = 20;
            
        legend.append("rect")
            .attr("x", function(d, i){
                return width - (i*ls_w) - ls_w;
            })
            .attr("y", height/2)
            .attr("width", ls_w)
            .attr("height", ls_h)
            .style("fill", function(d, i){
                return colorScale(d);
            })
            .style("opacity", 0.8)
            .attr("transform","translate(1250, -750)rotate(90)"); // found these brutally
            
        legend.append("text")
            .attr("x", width - 145)
            .attr("y", function(d, i){
                return height - (i*ls_h) - ls_h - 245;
            })
            .text(function(d, i){
                return legend_labels[i];
            })
            // .attr("transform","translate(1250, -600)rotate(90)");
        

        var legend_title = "Number of Covid Cases";

        svg.append("text")
            .attr("x", 10)
            .attr("y", 540)
            .attr("class", "legend_title")
            .text(function(){return legend_title})
            .attr("transform","translate(850, -390)");

    queue()
        .defer(d3.json, "data/counties-10m.json")
        .defer(d3.csv, "data/data.csv")
        .await(ready);
    }