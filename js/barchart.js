// function generateBarChart(){
//     const width = 600, height = 800, wpad = 40, bpad = 20, tpad = 20;

//     const barchart = d3.select("#barChart") //where to put it
//         .append("svg")
//         .attr("viewBox", "0 140 " + width + " " + height);
//         // .attr("width", width)
//         // .attr("height", height)
//         // .style("margin", "-15px auto");
        
//     d3.csv("data/data.csv", function(error, data) {
//         if (error) throw error;

//         // const data = d3.csv("data.csv"); //inject dataset

//         // set up some basic constants
        
//         // set up our x and y vaiables
//         const xValue = d => d.county_name;
//         const yValue = d => d.percent_test_results_reported_positive_last_7_days;
//         console.log(data);

//         // a scale maps data values in some input range to (pixel) values in some output range

//         console.log(data.map(xValue));
//         const xScale = d3v4.scaleBand()
//             .domain(data.map(xValue)) // transform data items to just their Rotor_Diameter
//             .range([wpad, width - wpad])
//             .paddingInner(0.25)
//             .paddingOuter(0.5);

//         const yScale = d3v4.scaleLinear()
//             .domain([0, d3.max(data.map(yValue))]).nice() // transform data items to just their Rotor_Diameter // .nice() makes the domain end on nice index
//             .range([height - bpad, tpad]);

//         const bars = barchart.selectAll("g")
//             .data(data)
//             .enter()
//             .append("g")
//             .attr("class", "bar")
//             .attr("transform", d => "translate(" + xScale(xValue(d)) + "," + yScale(yValue(d)) + ")" );

//         bars.append("rect")
//             .attr("height", d => yScale.range()[0] - yScale(yValue(d)))
//             .attr("width", xScale.bandwidth())
//             //.attr("x", d => xScale(xValue(d)))
//             //.attr("y", d => yScale(yValue(d)))
//             .attr("fill", "cornflowerblue");

//         bars.append("text")
//             .text(d => yValue(d))
//             .attr("dx", "0.4em")
//             .attr("dy", "0.6em")
//             .attr("transform", "rotate(-90)");

//         const xAxis = barchart.append("g")
//             .attr("transform", "translate(0, " + (height - bpad) + ")") //translate(40,0)
//             .call(d3.axisBottom().scale(xScale))
//             .selectAll("text")
//             .style("text-anchor", "end") //change anchor position of text
//             .attr("dx", "-0.8em")
//             .attr("dy", "-0.6em")
//             .attr("transform", "rotate(-90)"); //rotate the xaxis text

//         const yAxis = barchart.append("g")
//             .attr("transform", "translate(" + wpad + ", 0)") //translate(40,0)
//             .call(d3.axisLeft().scale(yScale));
//         // const margin = 20;
//         // barchart.append("g")
//         //     .attr("transform", "translate(" + margin + "," + (height+margin) + ")")
//         //     .attr("class","axis")
//         //     .call(xAxis);
            
//         // barchart.append("g")
//         //     .attr("transform", "translate(" + margin + "," + margin + ")")
//         //     .attr("class","axis")
//         //     .call(yAxis);


//         d3.select("figure")
//             .append("figcaption")
//             .text("Ranking vs Age of Richest")

//         // Event handling for interactivity
//         // bars.on("click", (evt) => {
//         //     const bar = d3.select(evt.target.parentNode);
//         //     bar.classed("selected", !bar.classed("selected"));
//         // });

//         // barchart.on("dblclick", sortBars); // attach the even listener

//         // let sortCol = "Billionaires"; // define the initial column by which to sort

//         // function sortBars() {
//         //     //TODO figure out how ot actually sort the bars
//         // }
//     })
//     // queue()
//     // // console.log(1)
//     // .defer(d3.csv, "data/data.csv")
//     // // console.log(2)
//     // .await(makeBarChart);
//     // // console.log(3)
// }

// function makeBarChart(){
//     width = 960
//     height = 500
//     var svg = d3v7.select("svg"),
//     margin = 200,
//     width = width - margin,
//     height = height - margin;


//     var xScale = d3v7.scaleBand().range([0, width]).padding(0.4);
//     var yScale = d3v7.scaleLinear().range([height, 0]);

//     var g = svg.append("g")
//                 .attr("transform", "translate(" + 100 + "," + 100 + ")");

//     d3v3.csv("data/data.csv", function(error, data) {
//         if (error) {
//             throw error;
//         }
//         console.log('pass 1')
//         xScale.domain(data.map(function(d) { return d.county_name; }));

//         console.log('pass 2')
//         yScale.domain([0, d3v7.max(data, function(d) { return +d.cases_per_100K_7_day_count_change; })]);

//         g.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3v7.axisBottom(xScale));

//         g.append("g")
//         .call(d3v7.axisLeft(yScale).tickFormat(function(d){
//             return "$" + d;
//         }).ticks(10));


//         g.selectAll(".bar")
//         .data(data)
//         .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", function(d) { return xScale(d.year); })
//         .attr("y", function(d) { return yScale(d.value); })
//         .attr("width", xScale.bandwidth())
//         .attr("height", function(d) { return height - yScale(d.value); });
//     });
// }

// function makeBarChart(){
//     const margin = 60;
//     const width = 1000 - 2 * margin;
//     const height = 600 - 2 * margin;

//     const svg = d3.select('svg');
//     const chart = svg.append('g')
//         .attr('transform', `translate(${margin}, ${margin})`);

//     const yScale = d3v7.scaleLinear()
//         .range([height, 0])
//         .domain([0, 100]);

//     chart.append('g')
//         .call(d3v7.axisLeft(yScale));

//     const xScale = d3v7.scaleBand()
//         .range([0, width])
//         .domain(sample.map((s) => s.language))
//         .padding(0.2)
    
//     chart.append('g')
//         .attr('transform', `translate(0, ${height})`)
//         .call(d3.axisBottom(xScale));
// }

// function makeBarChart(){
    
//     // Set graph margins and dimensions
//     var margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

//     // Set ranges
//     var x = d3v7.scaleBand()
//         .range([0, width])
//         .padding(0.1);
//     var y = d3v7.scaleLinear()
//         .range([height, 0]);
//     var barchart = d3v7.select("#barChart").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", 
//             "translate(" + margin.left + "," + margin.top + ")");

//     // Get data
//     d3v7.csv("data/data.csv").then(function(data) {
//         console.log('pass 1')

//         // Format data
//         data.forEach(function(d) {
//             d.cases_per_100K_7_day_count_change = +d.cases_per_100K_7_day_count_change;
//         });
//         console.log('pass 2')

//         // Scale the range of the data in the domains
//         x.domain(data.map(function(d) { return d.county_name; }));
//         y.domain([0, d3v7.max(data, function(d) { return d.cases_per_100K_7_day_count_change; })]);
//         console.log('pass 3')

//         // Append rectangles for bar chart
//         barchart.selectAll("bar")
//             .data(data)
//             .enter()
//             .append("g")
//             .attr("class", "bar")
//             .attr("x", function(d) { return x(d.county_name); })
//             .attr("width", x.bandwidth())
//             .attr("y", function(d) { return y(d.cases_per_100K_7_day_count_change); })
//             .attr("height", function(d) { return height - y(d.cases_per_100K_7_day_count_change); });
//         console.log('pass 4')

//         // Add x axis
//         barchart.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3v7.axisBottom(x));

//         // Add y axis
//         barchart.append("g")
//         .call(d3v7.axisLeft(y));
    // });
// }

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

// var unique = array.filter(onlyUnique);


function transformToHawaii(rawData){
    var newData = {};
    rawData.forEach(function(d){
        // console.log(d.fips_code.substring(0,1))
        if (!(d.fips_code.substring(0, 2) === "15")){
            d.fips
        }
    });
    // console.log(newData)
}

d3v4.csv("data/data.csv", function(data) {
    transformToHawaii(data);
});




function makeBarChart(){
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    var x = d3v4.scaleBand().range([0, width]).padding(0.1);

    var y = d3v4.scaleLinear().range([height, 0]);

    var xAxis = d3v5.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(5); // TODO: test

    var yAxis = d3v5.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    var svg = d3v4.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var dates1 = {};
    var dates2 = {};
    d3v4.csv("data/data.csv", function(error, data) {
        if (error) throw error;

        console.log('pass 1')
        // var counties = [];
        var aggregated = [];
        
        // data.forEach(function(d) {
        //     if (d.fips_code === '15001'){
        //         console.log(d.date, d.cases_per_100K_7_day_count_change, d.county_name)
        //     }
        //     if (!(d.fips_code.substring(0, 2) === "15")){
        //         d.county_name = "";
        //     }
        //     else {
        //         counties.push(d.county_name);
        //         if (isNaN(aggregated[parseInt(d.fips_code)]) || aggregated[parseInt(d.fips_code)] === undefined){
        //             aggregated[parseInt(d.fips_code)] = 0;
        //         }
        //         if (d.cases_per_100K_7_day_count_change === undefined || d.cases_per_100K_7_day_count_change === '' || d.cases_per_100K_7_day_count_change == 'suppressed' || isNaN(d.cases_per_100K_7_day_count_change)) {
        //             newCases = 0
        //         }
        //         else {
        //             newCases = +d.cases_per_100K_7_day_count_change
        //         }
        //         aggregated[parseInt(d.fips_code)] += newCases
        //     }
        //     d.cases_per_100K_7_day_count_change = +d.cases_per_100K_7_day_count_change;
        // });
        data.forEach(function(d) {
            var date = new Date(d.date)
            if (!(d.fips_code.substring(0, 2) === "15")){
                d.county_name = "";
            }
            else {
                // counties.push(d.county_name);
                if (!isNaN(date) || !(date === undefined) || !(date === "")){
                    if (dates1[parseInt(d.fips_code)] == undefined || isNaN(dates1[parseInt(d.fips_code)]) || dates1[parseInt(d.fips_code)] === ""){
                        dates1[parseInt(d.fips_code)] = date
                        if (aggregated[parseInt(d.fips_code)] === undefined || isNaN(aggregated[parseInt(d.fips_code)])) { // add another condidtion stating that this is the first iteration
                                aggregated[parseInt(d.fips_code)] = 0 // This makes sure NaNs arent produced using += newCases
                        }
                        if (d.cases_per_100K_7_day_count_change === undefined || d.cases_per_100K_7_day_count_change === '' || d.cases_per_100K_7_day_count_change == 'suppressed' || isNaN(d.cases_per_100K_7_day_count_change)) {
                            newCases = 0
                        }
                        else {
                            newCases = +d.cases_per_100K_7_day_count_change
                        }
                        aggregated[parseInt(d.fips_code)] += newCases;
                        // if (d.fips_code === "15003"){
                        //     console.log(d.date, d.county_name, d.fips_code, d.cases_per_100K_7_day_count_change)
                        // }
                    }
                    else if (dates2[parseInt(d.fips_code)] == undefined || isNaN(dates2[parseInt(d.fips_code)]) || dates2[parseInt(d.fips_code)] == ""){
                        dates2[parseInt(d.fips_code)] = date
                        const diffTime = Math.abs(dates1[parseInt(d.fips_code)] - dates2[parseInt(d.fips_code)]);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        if (diffDays >= 7){ // This is to prevent overlaps in the data which overcounts however this may under count the data sicne the data isn't consistant
                            // if (d.fips_code === '12086'){
                            //     console.log(d.date, d.cases_per_100K_7_day_count_change)
                            // }
                            if (aggregated[parseInt(d.fips_code)] === undefined || isNaN(aggregated[parseInt(d.fips_code)])) { // add another condidtion stating that this is the first iteration
                                aggregated[parseInt(d.fips_code)] = 0 // This makes sure NaNs arent produced using += newCases
                            }
                            if (d.cases_per_100K_7_day_count_change === undefined || d.cases_per_100K_7_day_count_change === '' || d.cases_per_100K_7_day_count_change == 'suppressed' || isNaN(d.cases_per_100K_7_day_count_change)) {
                                newCases = 0
                            }
                            else {
                                newCases = +d.cases_per_100K_7_day_count_change
                            }
                            // if (d.fips_code === "15003"){
                            //     console.log(d.date, d.county_name, d.fips_code, d.cases_per_100K_7_day_count_change)
                            // }
                            aggregated[parseInt(d.fips_code)] += newCases;
        
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
                        // default case
                        dates2[parseInt(d.fips_code)] = ""
                    }
                } 
            } 
        })
        

        // var unique= counties.filter(onlyUnique);
        var counties = ['Hawaii County', 'Honolulu County', 'Kalawao County',  'Kauai County' , 'Maui County']
        let i = 0;

        // if(typeof(aggregated) === "string"){
        //     aggregated = JSON.parse(aggregated)
        //     console.log("PASS")
        // }
        //     aggregated.forEach(function(element){
        //         console.log(element);
        //     });

        // aggregated.forEach(function(d){
        //     console.log(d)
        // })

        // for (let i = 0; i < aggregated.length; i++) {
        //     aggregated[i].name = counties[i];
        //   }

        console.log('ORIGINAL', aggregated)
        const compactArray = Object.values(aggregated); // Remove sparsity
        console.log('CONDENSED', compactArray)

        var transformed =  Object.assign.apply({}, counties.map( (v, i) => ( {[v]: compactArray[i]} ) ) ); // Combine counties and aggregated

        // aggregated.cases.forEach(function(d){
        //     console.log(d)
        // })
        console.log('TRANSFORMED', transformed)
        
        console.log('pass 2')

        
        x.domain(counties.map(function(d) { return d; }));
        y.domain([0, d3v4.max(compactArray, function(d) { return d; })]);

        console.log('pass 3')

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)" );
        console.log('pass 4')


        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Number of Cases");
        console.log('pass 5', transformed)

        // transformed.forEach(function(d){
        //     console.log(d)
        // })


        svg.selectAll("bar")
            .data(transformed)
            .enter()
            .append("rect")
            .style("fill",  "steelblue")
            .attr("x", function(d) {
                // console.log(d)
                return x(d);
            })
            .attr("width", x.bandwidth())
            .attr("y", function(d) {
                return y(d);
            })
            .attr("height", function(d) {
                return height - y(d);
            });
        console.log('last')

    });
}