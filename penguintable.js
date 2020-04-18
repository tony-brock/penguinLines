var success= function(penguins){
    console.log("Data Collected",penguins)
console.log(penguins[0].quizes)
    createtable(penguins[0])
};
var penguinPromise= d3.json("classData.json");
penguinPromise.then(success, failure);

var failure= function(err){
    console.log("Something went wrong", err)
};

var createtable= function(penguin){
    
    var rows=d3.select("tbody")
        .selectAll("tr")
        .data(penguin.quizes)
        .enter()
        .append("tr")
    rows.append("td")
        .text(function(quiz){
        return quiz.day
    });
    rows.append("td")
        .text(function(quiz){
        return quiz.grade
    })
    
    
    
    
    
    }
    