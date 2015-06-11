var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema =  new mongoose.Schema({
    uuid: {type: String, default: ''},
    title: {type: String, default: ''},
    mode: {type: String, default: ''},
    stickerUuid: {type: String, default: ''},
    creatorFbId: {type: String, default: ''},
    creatorFbName: {type: String, default: ''},
    date: {type: String, default: ''},
    finalDate: {type: String, default: ''},
    location: {
        altitude: {type: String, default: ''},
        longitude: {type: String, default: ''}
    },
    invited: [{
        fbId: {type: String, default: ''},
        fbName: {type: String, default: ''},
        participating: {type: String, default: ''},
        read: {type: String, default: ''}
    }]
});

var CardModel = mongoose.model('Card', CardSchema);



var Card = function(data){

};

Card.prototype.loadFromDb = function(callback){

};

Card.prototype.createCard = function(callback){

};

Card.prototype.updateTitle = function(title, callback){

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