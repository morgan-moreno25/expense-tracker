const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    id: Number,
    category: String,
    amount: Number,
});

module.exports = Income = mongoose.model('Income', IncomeSchema);