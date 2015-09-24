var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tag = "user model - ";


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



var User = function (data) {

    this._fbId = data.fbId;
    this._fbName = data.fbName;
    this._token = data.deviceToken;
    this._platform = data.platform;
    if(data.email != undefined){
        this._email = data.email;
    }
};

User.prototype.load = function(callback){
    var token = this._token;
    var platform = this._platform;
    UserModel.findOne({ fbId: this._fbId}, function(err, user){
        if(err || user == undefined){
            callback(err, false);
            return;
        }
        if(!doesUserHasSameDevice(user, token)){
            user.device.push({token: token, platform: platform});
            user.save();
            callback(err, user);
        }else{
            callback(err, user);
        }


    });
};

User.prototype.createUser = function(callback){
    var newUser = new UserModel({
        fbName: this._fbName,
        fbId: this._fbId,
        email: this._email,
        date: getDate(),
        device: [{token: this._token, platform: this._platform}],
        cards: [],
        stickers: []
    });

    newUser.save();
    callback();

};

var doesUserHasSameDevice = function(user, token){
    for(var i = 0; i < user.device.length; i++){
        if(token == user.device[i].token){
            return true;
        }
    }
    return false;
};

var getDate = function(){

    return Math.floor((new Date().getTime()/1000));
};

User.isLoginDataValid = function (data){
    if(data == null || data == undefined){
        return false;
    }else if(data.deviceToken == undefined || data.fbName == undefined
        || data.platform == undefined || data.fbId == undefined){
        return false;
    }
    return true;
};


User.isRegistrationDataValid = function (data){
    if(data == null || data == undefined){
        return false;
    }else if(data.deviceToken == undefined || data.fbName == undefined
        || data.platform == undefined || data.fbId == undefined || data.email == undefined){
        return false;
    }
    return true;
};

//module.exports = {
//    User: User
//};
module.exports = User;

