var Poll = require('../models/polls.js');

module.exports = {
    createPoll: function (req, res, params) {
        
        console.log(params['poll-choice']);
        
        var poll = new Poll({
            pollname: params.pollname,
            options: params['poll-choice'],
            votes: []
        })
        
        
        
        res.json(poll);
        
    }
}