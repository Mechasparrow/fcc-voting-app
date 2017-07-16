var Poll = require('../models/polls.js');
var User = require('../models/users.js');

module.exports = {
    createPoll: function (req, res, params) {
    
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
                res.redirect('/profile')
            })
        })

    },
    
    deletePoll: function (req, res, poll_id) {
        
        
        User.findOne({'twitter.id': req.user.twitter.id}, function (err, user) {
            
            var delete_poll = Poll.remove({_id: poll_id});
            
            var poll_location = user.polls.indexOf(poll_id);
            
            delete_poll.then(function (err) {
                
                user.polls.splice(poll_location, 1);
                
                user.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    res.redirect('/profile');
                })    
            })
            
            
        })
            
    }, 
    
    getPoll: function (poll_id) {
        
        var promise = new Promise(function (resolve, reject) {
           
           Poll.findOne({"_id": poll_id}, function (err, poll) {
            if (err) {
                reject(err);
            } 
            
            resolve(poll);
               
           })
            
        });
        
        return promise;
    },
    
    getPolls: function (poll_ids) {
    
        var promise = new Promise(function (resolve, reject) {
           
           var poll_length = poll_ids.length;
           var polls = [];
           
           
           for (var i = 0; i < poll_length; i ++ ){
            
              Poll.findOne({"_id": poll_ids[i]}, function (err, poll) {
                 polls.push(poll);
                 
                 if (polls.length == poll_length) {
                     resolve(polls);
                 }
              })
        
           }
           
        });
    
        return promise;
        
    }, 
    
    getAllPolls: function () {
        
        var promise = new Promise (function (resolve, reject) {
            
            Poll.find({}, function (err, polls) {
                if (err) {
                    reject(err);
                }
                
                resolve(polls);
            })
            
                
        });
        
        return promise;
        
    }
    
    
}