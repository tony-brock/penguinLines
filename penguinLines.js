var success = function(penguins)
{
    console.log("Data Collected", penguins);
    console.log(penguins[0].quizes[0].day);
    console.log(penguins[0].quizes[0])
 //   console.log(getquizgrades(penguins));
    drawgraph(penguins)
    
};

var failure = function(error)
{
    console.log("Something is wrong", error);
};

var penguinPromise = d3.json("classData.json");
penguinPromise.then(success, failure);

var drawgraph= function(penguins){
    var width= "500"
var height="250"

var svg= d3.select("#line-Plot")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "graph");

    var xScale = d3.scaleLinear()
                    .domain([0,40])
                    .range([0, width]);
    var yScale = d3.scaleLinear()
                    .domain([0,10])
                    .range([height, 0]);
    
    //takes data that represents a point and creates a point in the line
     var linegen= d3.line()
    .y(function(quiz){return yScale(quiz.grade)})
        .x(function(quiz){return xScale(quiz.day)});
    
    //var getquizes=function(penguin){
        //return penguin.quizes
    //}
   
    var lines= d3.select("svg")
        .selectAll("g")
        .data(penguins)
        .enter()
        .append("g")
    
    lines.append("path")
        .datum(function(penguin){
        return penguin.quizes
    })
        .attr("class","line")
        .attr("d",linegen)
        .attr("fill", "none")
        .style("stroke","red");
    
}
        
//var getquizgrades = function(penguin)
//{
//    var quizgrade=penguin.quizes.map(function(quiz){
//        return quiz.grade;
 //   });
//return quizgrade;
//}

