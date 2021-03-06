
function createLineChart(id, data, lat1, lat2, long1, long2){

	var margin = {top: 30, right: 30, bottom: 30, left: 30}
	  , width = 230 - margin.left - margin.right  
	  , height = 230 - margin.top - margin.bottom;

	  // window.innerWidth 
	  //window.innerHeight

	var xScale = d3.scaleLinear()
	    .domain([long1, long2]) 
	    .range([0, width]); 


	var yScale = d3.scaleLinear()
	    .domain([lat2, lat1])  
	    .range([height, 0]); 

	// 7. d3's line generator
	var line = d3.line()
	    .x(function(d, i) { return xScale(d.Longitude); }) // set the x values for the line generator
	    .y(function(d) { return yScale(d.Latitude); }) // set the y values for the line generator 
	    .curve(d3.curveMonotoneX)
	    

	var svgLine = d3.select(id).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svgLine.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .attr("stroke", "black")
      .style("stroke-width", 2); 

	svgLine.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("" + data[0].Name_x + " " + data[0].Season);

    svgLine.append("text")
        .attr("x", 3)             
        .attr("y", 15)
        .style("font-size", "10px")   
        .text("" + parseInt(data[0].Deaths).toLocaleString('en') + " Deaths");

    svgLine.append("text")
        .attr("x", 3)             
        .attr("y", 25)
        .style("font-size", "10px")   
        .text("$" + (parseInt(data[0].Damages)*1000000).toLocaleString('en') + " Damages");

	svgLine.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(d3.axisBottom(xScale));

	svgLine.append("g")
	    .attr("class", "y axis")
	    .call(d3.axisLeft(yScale)); 


	for(var i = 0; i < data.length-1; i++){
		svgLine.append("line")
	      	.attr("x1", xScale(data[i].Longitude))
	      	.attr("y1", yScale(data[i].Latitude))
	      	.attr("x2", xScale(data[i+1].Longitude))
	      	.attr("y2", yScale(data[i+1].Latitude))
	      	.attr("stroke-width", 2)
	      	.attr("stroke", hurricaneColor(data[i].Wind))
    }

	

	return svgLine
}


