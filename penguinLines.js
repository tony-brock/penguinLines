var success = function(penguins)
{
    console.log("Data Collected", penguins);
    console.log(penguins[0].quizes[0].day);
    lineplot(penguins);
};

var failure = function(error)
{
    console.log("Something is wrong", error);
};

var penguinPromise = d3.json("classData.json");
penguinPromise.then(success, failure)

var lineplot= function(penguin){ 
    
var height= "500"
var width= "250"
var svg= d3.select("svg")
    .attr("width", width)
    .attr("height",height)
    .attr("id", "graph")

    
  var xScale = d3.scaleLinear()
                    .domain([d3.min(penguin, function(penguins){return penguins.quizes.day}),
                            d3.max(penguin,function(penguins){return penguins.quizes.day})])
                    .range([0, width]);
    var yScale = d3.scaleLinear()
                    .domain([d3.min(penguin,function(penguins){return penguins.quizes.grade}),
                            d3.max(penguin,function(penguins){return penguins.quizes.grade})])
                    .range([height, 0]);
    var line= d3.line()
        .x(function(penguins){return xScale(penguins.quizes.day)})
        .y(function(penguins){return yScale(penguins.quizes.day)
        })
    svg.append("path")
        .datum(penguin)
        .attr("class","line")
        .attr("d",line)
}
        
        