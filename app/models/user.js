var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    fbName: { type: String, default: '' },
    fbId: {type: String, default: ''},
    fbPictureLink: {type: String},
    age: {type: Number},
    email: { type: String, default: '' },
    city: {type: String},
    date: { type: Number, default: '' },
    device: { type: [{token: String, platform: String}]},
    gender: {type: String}
});

var UserModel = mongoose.model('User', UserSchema);

var User = function () {
};


User.createUser = function(data, callback){
    if(!isUserDataValid(data)){
        callback('data not valid', 400);
        return;
    }

    var newUser = new UserModel({
        fbId: data.fbId,
        fbName: data.fbName,
        fbPictureLink: data.fbPictureLink,
        age: data.age,
        email: data.email,
        city: data.city,
        device: [{token: data.deviceToken, platform: data.platform}],
        date: getDate(),
        gender: data.gender
    });

    newUser.save(function(err){
        if(err){
            callback('server error', 500);
        }else{
            callback('user created', 201);
        }
    });
};

User.login = function(data, callback){

    if(data == null || data == undefined || data.fbId == undefined
    || data.deviceToken == undefined || data.platform == undefined
    || data.fbName == undefined){
        callback('data not valid', 400);
        return;
    }

    this.load(data, function(err, statusCode, user){
        if(err){
            callback(err, statusCode);
        }else{
            User.updateDeviceToken(data, user, function(err){
                if(err){
                    callback('server error', 500);
                }else{
                    callback('user login succeeded', 200);
                }
            });
        }
    });
};

User.updateDeviceToken = function(data, user, callback){
    if(!doesUserHasSameDevice(user, data.deviceToken)){
        user.device.push({token: data.deviceToken, platform: data.platform});
        user.save(function(err){
            callback(err);
        });
    }else{
        callback();
    }
};

User.load = function(data, callback){
    if(data == null || data == undefined || data.fbId == undefined){
        callback('data not valid', 400);
        return;
    }

    UserModel.findOne({fbId: data.fbId}, function(err, user){
        if(err){
            callback('server error', 500);
        }else if(!user){
            callback('user not found', 204);
        }else{
            callback(false, 200, user);
        }
    });
};


var isUserDataValid = function(data){
    if(data == null || data == undefined){
        return false;
    }else if(data.deviceToken == undefined || data.fbName == undefined
        || data.platform == undefined || data.fbId == undefined ||
        data.age == undefined || data.city == undefined ||
        data.email == undefined || data.fbPictureLink == undefined
    || data.gender == undefined){
        return false;
    }else{
        return true;
    }
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

module.exports = User;

