var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tag = "user model - ";

/**
 * User Schema
 */

var UserSchema = new Schema({
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
    platform: '',
    email: ''
}


var User = function (data) {

    userData.fbId = data.fbId;
    userData.fbName = data.fbName;
    userData.token = data.deviceToken;
    userData.platform = data.platform;
    if(data.email != undefined){
        userData.email = data.email;
    }
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

User.prototype.createUser = function(callback){
    var newUser = new UserModel({
        fbName: userData.fbName,
        fbId: userData.fbId,
        email: userData.email,
        date: getDate(),
        device: [{token: userData.token, platform: userData.platform}],
        cards: [],
        stickers: []
    });

    newUser.save();
    callback();

};

var doesUserHasSameDevice = function(user){
    for(var i = 0; i < user.device.length; i++){
        if(userData.token == user.device[i].token){
            return true;
        }
    }
    return false;
};

var getDate = function(){

    return Math.floor((new Date().getTime()/1000));
};

module.exports = User;

