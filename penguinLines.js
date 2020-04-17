var success = function(penguins)
{
    console.log("Data Collected", penguins);
    console.log(penguins[0].quizes[0].day);
 //   console.log(getquizgrades(penguins));
    console.log(getquizdates(penguins.quizes))
    
};

var failure = function(error)
{
    console.log("Something is wrong", error);
};

var penguinPromise = d3.json("classData.json");
penguinPromise.then(success, failure);

var getquizdates= function(quizes){quizes.map(function(dates){
    return dates.day
})}


var width= "500"
var height="250"

var svg= d3.select(svg)
    .attr("width", width)
    .attr("height", height)
    .attr("id", "graph")
var line= d3.svg.line()
    .x(function(penguins){return xScale(penguins.quizes.day)})
        .y(function(penguins){return yScale(penguins.quizes.day)
        })
   
    svg.append("path")
        .datum(penguin)
        .attr("class","line")
        .attr("d",line)

//var getquizgrades = function(penguin)
//{
//    var quizgrade=penguin.quizes.map(function(quiz){
//        return quiz.grade;
 //   });
//return quizgrade;
//}
