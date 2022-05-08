    function makeChoropleth(){
        var width = 1100,
            height = 600;

        // var color_domain = [2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];
        var color_domain = [.2, .3, .4, .5, .6, .7, .8, .9];


        // var ext_color_domain = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];
        var ext_color_domain = [.1, .2, .3, .4, .5, .6, .7, .8, .9];


        var legend_labels = ["> .1", '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9+'];
        // var legend_labels = ["< 500", "500+", "1000+", "1500+", "2000+", "2500+", "3000+", "3500+", "4000+", "4500+", "5000+", "5500+", "6000+"];

        var colorScale = d3v3.scale.threshold()
            .domain(color_domain)
            // .range(['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#990000']);
            .range(['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000']);
            
        var div = d3v3.select("#choroplethMap").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
            
        var svg = d3v3.select("#choroplethMap").append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("margin", "-15px auto");

        // var path = d3v3.geo.path().projection(null);
        var path = d3v3.geo.path();

        function ready(error, us, data) {
            if (error) throw error;
            
            var pairRateWithId = {};
            var pairNameWithId = {};

            //Moves selction to front
            d3v3.selection.prototype.moveToFront = function() {
                return this.each(function(){
                this.parentNode.appendChild(this);
                });
            }; 

            //Moves selction to back
            d3v3.selection.prototype.moveToBack = function() { 
                return this.each(function() { 
                var firstChild = this.parentNode.firstChild; 
                if (firstChild) { 
                    this.parentNode.insertBefore(this, firstChild); 
                } 
                }); 
            };

            var dates1 = {};
            var dates2 = {};
            data.forEach(function(d) {
                var date = new Date(d.date)
                // if (isNaN(date)){
                //     console.log(d.date)
                // }
             
                if (!isNaN(date) || !date === undefined){
                    if (dates1[parseInt(d.fips_code)] == undefined || isNaN(dates1[parseInt(d.fips_code)])){
                        dates1[parseInt(d.fips_code)] = date
                         if (pairRateWithId[parseInt(d.fips_code)] === undefined || isNaN(pairRateWithId[parseInt(d.fips_code)])) { // add another condidtion stating that this is the first iteration
                                pairRateWithId[parseInt(d.fips_code)] = 0 // This makes sure NaNs arent produced using += newCases
                            }
                            if (d.cases_per_100K_7_day_count_change === undefined || d.cases_per_100K_7_day_count_change === '' || d.cases_per_100K_7_day_count_change == 'suppressed' || isNaN(d.cases_per_100K_7_day_count_change)) {
                                newCases = 0
                            }
                            else {
                                newCases = +d.cases_per_100K_7_day_count_change
                            }
                            pairRateWithId[parseInt(d.fips_code)] += newCases;
                            pairNameWithId[parseInt(d.fips_code)] = d.county_name;
                    }
                    else if (dates2[parseInt(d.fips_code)] == undefined || isNaN(dates2[parseInt(d.fips_code)]) || dates2[parseInt(d.fips_code)] == ""){
                        dates2[parseInt(d.fips_code)] = date
                        const diffTime = Math.abs(dates1[parseInt(d.fips_code)] - dates2[parseInt(d.fips_code)]);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        if (diffDays >= 7){ // This is to prevent overlaps in the data which overcounts however this may under count the data sicne the data isn't consistant
                            // if (d.fips_code === '12086'){
                            //     console.log(d.date, d.cases_per_100K_7_day_count_change)
                            // }
                            if (pairRateWithId[parseInt(d.fips_code)] === undefined || isNaN(pairRateWithId[parseInt(d.fips_code)])) { // add another condidtion stating that this is the first iteration
                                pairRateWithId[parseInt(d.fips_code)] = 0 // This makes sure NaNs arent produced using += newCases
                            }
                            if (d.cases_per_100K_7_day_count_change === undefined || d.cases_per_100K_7_day_count_change === '' || d.cases_per_100K_7_day_count_change == 'suppressed' || isNaN(d.cases_per_100K_7_day_count_change)) {
                                newCases = 0
                            }
                            else {
                                newCases = +d.cases_per_100K_7_day_count_change
                            }
                            pairRateWithId[parseInt(d.fips_code)] += newCases;
                            pairNameWithId[parseInt(d.fips_code)] = d.county_name;
    
                            // Move the date from date2 to date1 (could implemnt a linked stack to an array)
                            dates1[parseInt(d.fips_code)] = dates2[parseInt(d.fips_code)]
                            // Pop the dates2 data
                            dates2[parseInt(d.fips_code)] = ""
                        }
                        else {
                            // go to next date
                            dates2[parseInt(d.fips_code)] = ""
                        }
                    }
                    else {
                        dates2[parseInt(d.fips_code)] = ""
                    }
                } 
            });

            // pairRateWithId.forEach(function(i) {
            //     pairRateWithId = pairRateWithId/100000
            // });
            // data.forEach(function(d) {
                for (var index in pairRateWithId) {
                    pairRateWithId[index] = pairRateWithId[index]/100000
                    // console.log(thing)
                }
            // })


            // console.log(pairRateWithId)

            // Debugging
            // data.forEach(function(d) {
            //     console.log(d.fips_code)
            // 	// if (pairRateWithId[d.fips_code] === undefined) {
            // 	// 	console.error("ERROR: found undefined at", d.fips_code)
            // 	// }
            // });

            svg.append("g")
            .attr("class", "county")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.counties).features)
            .enter().append("path")
            .attr("d", path)
            .style ( "fill" , function(d) {
                // d is the element in the us.json file so we use id to identify fips code
                d.total = pairRateWithId[parseInt(d.id)] || -1;
                return colorScale(d.total);
            })
            .style("opacity", 0.8)
            .on("mouseover", function(d) {
                var sel = d3v3.select(this);
                sel.moveToFront();
                d3v3.select(this).transition().duration(300).style({'opacity': 1, 'stroke': 'black', 'stroke-width': 1.5});

                div.transition().duration(300)
                    .style("opacity", 1)
                    // console.log("pairratewithid1", pairRateWithId);
                    if (pairRateWithId[parseInt(d.id)] === undefined){
                        numCases = "N/A"
                    }
                    else {
                        numCases = pairRateWithId[parseInt(d.id)]
                    }
                    div.text(pairNameWithId[parseInt(d.id)] + ": " + numCases.toFixed(4))

                    .style("left", (d3v3.event.pageX) + "px")
                    .style("top", (d3v3.event.pageY -30) + "px");
            })
            .on("mouseout", function() {
                var sel = d3v3.select(this);
                sel.moveToBack();
                d3v3.select(this)
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
        

        var legend_title = "Percent of County Population";

        svg.append("text")
            .attr("x", 10)
            .attr("y", 540)
            .attr("class", "legend_title")
            .text(function(){return legend_title})
            .attr("transform","translate(850, -390)");

        queue()
            .defer(d3v3.json, "data/counties-10m.json")
            .defer(d3v3.csv, "data/data.csv")
            .await(ready);
    }