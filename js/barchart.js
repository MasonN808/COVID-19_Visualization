function buildBarchart(data){
    // set up some basic constants
    const width = 600, height = 800, wpad = 40, bpad = 20, tpad = 20;

    const barchart = d3.select("figure") //where to put it
        .append("svg")
        .attr("viewBox", "0 140 " + width + " " + height);
    
    // set up our x and y vaiables
    const xValue = d => d.county_name;
    const yValue = d => d.percent_test_results_reported_positive_last_7_days;

    // a scale maps data values in some input range to (pixel) values in some output range
    
    // remove the first element in data since its 0
    data.shift();
    console.log(data.map(xValue));
    const xScale = d3.scaleBand()
        .domain(data.map(xValue)) // transform data items to just their Rotor_Diameter
        .range([wpad, width - wpad])
        .paddingInner(0.25)
        .paddingOuter(0.5);

    const yScale = d3.scaleLinear()
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

    d3.select("figure")
        .append("figcaption")
        .text("Ranking vs Age of Richest")

    // Event handling for interactivity
    bars.on("click", (evt) => {
        const bar = d3.select(evt.target.parentNode);
        bar.classed("selected", !bar.classed("selected"));
    });

    barchart.on("dblclick", sortBars); // attach the even listener

    let sortCol = "Billionaires"; // define the initial column by which to sort

    function sortBars() {
        //TODO figure out how ot actually sort the bars
    }
}