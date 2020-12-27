const mongoose = require('mongoose');

const FinanceInfoSchema = mongoose.Schema({
      startDate: { type: Date, require: true},
      endDate: { type: Date, require: true},
      reason: { type: String, require: true},
      days: { type: String, require: true},
      remainingQuota: { type: Number, require: true},
      isApproved: { type: Boolean, require: true},    
      user:{ type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo'} 
},{timestamps: true});


module.exports = mongoose.model('FinanceInfo',FinanceInfoSchema,'FinanceInfo);