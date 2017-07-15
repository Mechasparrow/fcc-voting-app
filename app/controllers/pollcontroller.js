var Poll = require('../models/polls.js');
var User = require('../models/users.js');

module.exports = {
    createPoll: function (req, res, params) {
        
        console.log(params['poll-choice']);
        
        var poll = new Poll({
            pollname: params.pollname,
            options: params['poll-choice'],
            votes: []
        })
        
        poll.save(function (err) {
            if (err) return err;
        });
        
        User.findOne({'twitter.id': req.user.twitter.id}, function (err, user) {
            user.polls.push(poll);
            user.save(function (err) {
                if (err) {
                    throw err;
                }
                res.json(user);
            })
        })

    }
}