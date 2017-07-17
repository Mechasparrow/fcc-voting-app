$(document).ready (function (){
    
    var poll_id = $("#viewpollid").text();
    
    var poll_request = getPoll(poll_id);
    
    poll_request.then (function (poll) {
        graphChart(poll);
    })
    
    
})

function getPoll(poll_id) {
    
    var promise = new Promise(function (resolve, reject) {
        
        $.get("/polls/json/" + poll_id, function (data) {
            resolve(data);
        })
        
    });
    
    return promise;
    
}

function graphChart(poll) {
    
    var data = calculatePollVotes(poll);
    
    var ctx = document.getElementById('pollchart').getContext('2d');
    
    /**var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "My First dataset",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45],
            }]
        },
    
        // Configuration options go here
        options: {}
    });**/
    
    var chartdata = {
        datasets: [{
            data: data, 
            backgroundColor: [
                getRandomColor(), 
                getRandomColor(), 
                getRandomColor()
            
            ]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: poll.options
    };
        
    var piechart = new Chart(ctx, {
        type: 'pie', 
        data: chartdata,
        options: {}
    });
    
    
}

function calculatePollVotes(poll) {
    votes = poll.votes
    choices = poll.options;
    
    var counts = [];
    
    for (var i = 0; i < choices.length; i ++) {
        
        var matching_votes = votes.filter(function (vote) {
            return vote == choices[i];
        })
        
        counts.push(matching_votes.length);
        
    }
    
    return counts;
    
    
}




function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}