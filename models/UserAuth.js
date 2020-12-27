const mongoose = require('mongoose');

const UserAuthSchema = mongoose.Schema({
      email: { type: String, require: true,unique: true},
      password: { type: String, require: true},
      role:{ type: String, require: true}
},{timestamps: true});


module.exports = mongoose.model('UserAuth',UserAuthSchema,'UserAuth');