var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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

/**
 * Methods
 */

UserSchema.methods = {

}


mongoose.model('User', UserSchema);