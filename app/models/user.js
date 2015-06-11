var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tag = "user model - ";

/**
 * User Schema
 */

var UserSchema = new Schema({
    uuid: { type: String, default: '' },
    fbName: { type: String, default: '' },
    fbId: {type: String, default: ''},
    email: { type: String, default: '' },
    date: { type: Number, default: '' },
    device: { type: [{token: String, platform: String}]},
    cards: { type: [String]},
    stickers: { type: [String]}
});

var UserModel = mongoose.model('User', UserSchema);

var userData = {
    fbId : '',
    fbName : '',
    token : '',
    platform: ''
}


var User = function (data) {

    userData.fbId = data.fbId;
    userData.fbName = data.fbName;
    userData.token = data.deviceToken;
    userData.platform = data.platform;



};

User.prototype.loadFromDb = function(callback){
    UserModel.findOne({ fbId: userData.fbId}, function(err, user){
        if(err || user == undefined){
            callback(err, false);
            return;
        }
        if(!doesUserHasSameDevice(user)){
            user.device.push({token: userData.token, platform: userData.platform});
            user.save();
            callback(err, user);
        }else{
            callback(err, user);
        }


    });
};

var doesUserHasSameDevice = function(user){
    for(var i = 0; i < user.device.length; i++){
        if(userData.token == user.device[i].token){
            return true;
        }
    }
    return false;
};

module.exports = User;

