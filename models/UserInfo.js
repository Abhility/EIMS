const mongoose = require('mongoose');

const UserInfoSchema = mongoose.Schema({
      name: { type: String, require: true},
      email: { type: String, require: true,unique: true},
      phone: { type: String, require: true,unique: true},
      address: { type: String, require: true},
      team: { type: String, require: true},
      title: { type: String, require: true},    
      salary: { type: Number, require: true},
      photoUrl:{ type: String, require: true},
      leaveQuota: { type: Number, require: true},
      finances:[
      { type: mongoose.Schema.Types.ObjectId, ref: 'FinanceInfo'}
      ],
      leaves:[
        { type: mongoose.Schema.Types.ObjectId, ref: 'LeaveInfo'}
        ]
},{timestamps: true});


module.exports = mongoose.model('UserInfo',UserInfoSchema,'UserInfo');