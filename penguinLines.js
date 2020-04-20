var success = function(penguins)
{
    console.log("Data Collected", penguins);
    console.log(penguins[0].quizes[0].day);
    console.log(penguins[0].quizes[0]);
 //   console.log(getquizgrades(penguins));
    drawgraph(penguins);
};

var failure = function(error)
{
    console.log("Something is wrong", error);
};

var penguinPromise = d3.json("classData.json");
penguinPromise.then(success, failure);

//create the axes
var createAxes = function(screen,margins,graph,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = d3.select("svg")
                .append("g")
                .attr("class", "axes");
    //xAxis
    axes.append("g")
        .attr("transform","translate("+margins.left+","+(graph.height-margins.top-14.9)+")")
        .call(xAxis)
    //yAxis
    axes.append("g")
            .attr("transform", "translate("+margins.left+","+(margins.top)+")")
            .call(yAxis);
};

//Create the Labels    
var createLabels = function(screen, margins, graph, penguins)
{
    var labels = d3.select("svg")
                .append("g")
                .classed("labels", true);
    //title
    labels.append("text")
        .text("Quiz Score Over Time")
        .classed("title", true)
        .attr("text-anchor", "middle")
        .attr("x", margins.left + (graph.width/2))
        .attr("y", margins.top/2);
    //x-axis
    labels.append("text")
        .text("Day")
        .classed("label", true)
        .attr("text-anchor", "middle")
        .attr("x", margins.left + (graph.width/2))
        .attr("y", screen.height-8);
    //y-axis
    labels.append("g")
        .attr("transform","translate(20,"+ 
              (margins.top+(graph.height/2))+")")
        .append("text")
        .text("Grade")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
 
};

//draw the Graph
var drawgraph= function(penguins)
{    
    var screen = {width:500, height:400};
    var margins = {top:25, bottom:40, left:70, right:40};
    var graph = {width:screen.width-margins.left-margins.right, height:screen.height-margins.top-margins.bottom};
    
var svg= d3.select("#line-Plot")
    .attr("width", screen.width)
    .attr("height", screen.height)
    .attr("id", "graph");
var g = d3.select("#graph")
    .append("g")
    .classed("graph", true)
    .attr("transform", "translate("+margins.left+","+margins.top+")");

    var xScale = d3.scaleLinear()
                    .domain([0,40])
                    .range([0, graph.width]);
    var yScale = d3.scaleLinear()
                    .domain([0,10])
                    .range([graph.height, 0]);
    
    //takes data that represents a point and creates a point in the line
     var linegen= d3.line()
    .y(function(quiz){return yScale(quiz.grade)})
        .x(function(quiz){return xScale(quiz.day)});
    

    var lines= d3.select("g.graph")
        .selectAll("g")
        .data(penguins)
        .enter()
        .append("g")
        .attr("id", "lines");
    
    lines.append("path")
        .datum(function(penguin){
        return penguin.quizes
                                })
        .attr("class","line")
        .attr("d",linegen)
        .attr("fill", "none")
        .style("stroke","red")
        .on("mouseover", tooltip)
        .on("mouseout", function(){d3.select("#tooltip")
        .classed("hidden", true)});
    
createLabels(screen, margins, graph, penguins);
createAxes(graph,margins,screen, xScale,yScale);
    


};

var tooltip= function(penguins){
        d3.select("img")
            var xPosition= d3.event.pageX
            var yPosition= d3.event.pageY
            
            var base= d3.select("#tooltip")
            .style("top", yPosition+"px")
            .style("left", xPosition+"px")
            .classed("hidden", false)
            
            base.select("img")
                .attr("src", function(){
                return "imgs/"+ penguins.picture
            })};