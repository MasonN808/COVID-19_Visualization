function generateBarChart(){
    const width = 600, height = 800, wpad = 40, bpad = 20, tpad = 20;

    const barchart = d3.select("#barChart") //where to put it
        .append("svg")
        .attr("viewBox", "0 140 " + width + " " + height);
        // .attr("width", width)
        // .attr("height", height)
        // .style("margin", "-15px auto");
        
    function makeBarChart(error, data){
        // const data = d3.csv("data.csv"); //inject dataset

        if (error) throw error;
        // set up some basic constants
        
        // set up our x and y vaiables
        const xValue = d => d.county_name;
        const yValue = d => d.percent_test_results_reported_positive_last_7_days;
        console.log(data);

        // a scale maps data values in some input range to (pixel) values in some output range

        console.log(data.map(xValue));
        const xScale = d3v4.scaleBand()
            .domain(data.map(xValue)) // transform data items to just their Rotor_Diameter
            .range([wpad, width - wpad])
            .paddingInner(0.25)
            .paddingOuter(0.5);

        const yScale = d3v4.scaleLinear()
            .domain([0, d3.max(data.map(yValue))]).nice() // transform data items to just their Rotor_Diameter // .nice() makes the domain end on nice index
            .range([height - bpad, tpad]);

        const bars = barchart.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", d => "translate(" + xScale(xValue(d)) + "," + yScale(yValue(d)) + ")" );

        bars.append("rect")
            .attr("height", d => yScale.range()[0] - yScale(yValue(d)))
            .attr("width", xScale.bandwidth())
            //.attr("x", d => xScale(xValue(d)))
            //.attr("y", d => yScale(yValue(d)))
            .attr("fill", "cornflowerblue");

        bars.append("text")
            .text(d => yValue(d))
            .attr("dx", "0.4em")
            .attr("dy", "0.6em")
            .attr("transform", "rotate(-90)");

        const xAxis = barchart.append("g")
            .attr("transform", "translate(0, " + (height - bpad) + ")") //translate(40,0)
            .call(d3.axisBottom().scale(xScale))
            .selectAll("text")
            .style("text-anchor", "end") //change anchor position of text
            .attr("dx", "-0.8em")
            .attr("dy", "-0.6em")
            .attr("transform", "rotate(-90)"); //rotate the xaxis text

        const yAxis = barchart.append("g")
            .attr("transform", "translate(" + wpad + ", 0)") //translate(40,0)
            .call(d3.axisLeft().scale(yScale));
        // const margin = 20;
        // barchart.append("g")
        //     .attr("transform", "translate(" + margin + "," + (height+margin) + ")")
        //     .attr("class","axis")
        //     .call(xAxis);
            
        // barchart.append("g")
        //     .attr("transform", "translate(" + margin + "," + margin + ")")
        //     .attr("class","axis")
        //     .call(yAxis);


        d3.select("figure")
            .append("figcaption")
            .text("Ranking vs Age of Richest")

        // Event handling for interactivity
        // bars.on("click", (evt) => {
        //     const bar = d3.select(evt.target.parentNode);
        //     bar.classed("selected", !bar.classed("selected"));
        // });

        // barchart.on("dblclick", sortBars); // attach the even listener

        // let sortCol = "Billionaires"; // define the initial column by which to sort

        // function sortBars() {
        //     //TODO figure out how ot actually sort the bars
        // }
    }
    queue()
    // console.log(1)
    .defer(d3.csv, "data/data.csv")
    // console.log(2)
    .await(makeBarChart);
    // console.log(3)
}

// function makeBarChart(){
//     var svg = d3.select("svg"),
//                 margin = 200,
//                 width = svg.attr("width") - margin,
//                 height = svg.attr("height") - margin


//     var xScale = d3v4.scaleBand().range([0, width]).padding(0.4),
//                 yScale = d3v4.scaleLinear().range([height, 0]);

//     var g = svg.append("g")
//                 .attr("transform", "translate(" + 100 + "," + 100 + ")");

//         d3.csv("data/data.csv", function(error, data) {
//             if (error) {
//                 throw error;
//             }

//             xScale.domain(data.map(function(d) { return d.county_name; }));
//             yScale.domain([0, d3.sum(data, function(d) { return +d.cases_per_100K_7_day_count_change; })]);

//             g.append("g")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(xScale));

//             g.append("g")
//             .call(d3.axisLeft(yScale).tickFormat(function(d){
//                 return "$" + d;
//             }).ticks(10));


//             g.selectAll(".bar")
//             .data(data)
//             .enter().append("rect")
//             .attr("class", "bar")
//             .attr("x", function(d) { return xScale(d.year); })
//             .attr("y", function(d) { return yScale(d.value); })
//             .attr("width", xScale.bandwidth())
//             .attr("height", function(d) { return height - yScale(d.value); });
//         });
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