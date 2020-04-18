var success = function(penguins)
{
    console.log("Data Collected", penguins);
    console.log(penguins[0].quizes[0].day);
    console.log(penguins[0].quizes[0])
 //   console.log(getquizgrades(penguins));
    console.log(getquiz(penguins[0]))
    drawgraph(penguins)
    
};

var failure = function(error)
{
    console.log("Something is wrong", error);
};

var penguinPromise = d3.json("classData.json");
penguinPromise.then(success, failure);

var getquiz= function(penguin){
var quizgrades= penguin.quizes.map(function(quiz){
        return quiz.grade})
return quizgrades
}

var getdates= function(penguin){
var quizdates= penguin.quizes.map(function(quiz){
        return quiz.date})
return quizdates
}
    





var drawgraph= function(penguins){
    var width= "500"
var height="250"

var svg= d3.select("#line-Plot")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "graph");
   
    svg.append("path")
        .datum(penguins)
        .attr("class","line")
        .attr("d",linegen)
        .style("stroke","red");
   
    var linegen= d3.line()
    .y(function(penguin){return yScale(getquiz(penguin))})
        .x(function(penguin){return xScale(getdates(penguin))})
    
    var xScale = d3.scaleLinear()
                    .domain([0,40])
                    .range([0, width]);
    var yScale = d3.scaleLinear()
                    .domain([0,10])
                    .range([height, 0]);
    

        
}
        
//var getquizgrades = function(penguin)
//{
//    var quizgrade=penguin.quizes.map(function(quiz){
//        return quiz.grade;
 //   });
//return quizgrade;
//}

