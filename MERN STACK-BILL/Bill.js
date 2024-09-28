const mongoose = require('mongoose');
const schema = mongoose.Schema({
    BillDate:Date,
    Income:Number,
    Expense:Number
})
module.exports = mongoose.model('Bill',schema);