var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * User Schema
 */

var UserSchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    username: { type: String, default: '' }
});


/**
 * Methods
 */

UserSchema.methods = {

}


mongoose.model('User', UserSchema);