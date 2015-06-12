var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema =  new mongoose.Schema({
    hash: {type: String, default: ''},
    title: {type: String, default: ''},
    mode: {type: String, default: ''},
    stickerUuid: {type: String, default: ''},
    creatorFbId: {type: String, default: ''},
    creatorFbName: {type: String, default: ''},
    date: {type: Number, default: ''},
    finalDate: {type: Number, default: ''},
    location: {
        altitude: {type: String, default: ''},
        longitude: {type: String, default: ''},
        description: {type: String, default: ''}

    },
    invited: [{
        fbId: {type: String, default: ''},
        fbName: {type: String, default: ''},
        participating: {type: String, default: ''},
        read: {type: Boolean, default: ''}
    }]
});

var CardModel = mongoose.model('Card', CardSchema);



var Card = function(hash){
    this._hash = hash;
};


Card.prototype.load = function (callback){
    CardModel.findOne({hash: this._hash}, function(err, card){
        if(card == null){
            callback(err, false);
        }
        callback(err, card);
    });
};



Card.prototype.create = function(data, callback){
    CardModel.create(data, function(err){
        callback(err);
    });
};

Card.prototype.updateTitle = function(title, callback){

};

Card.prototype.updateSticker = function(title, callback){

};

Card.prototype.updateFinalDate = function(date, callback){

};

Card.prototype.updateLocation = function(location, callback){

};

Card.prototype.updateRead = function(user, callback){

};

Card.prototype.updateParticipating = function(user, participating,callback){

};

Card.prototype.addUser = function(user, callback){

};

Card.prototype.removeUser = function(user, callback){

};

loadUserCards = function(fbId, callback){

};

module.exports = Card;