const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    id: Number,
    category: String,
    amount: Number,
});

module.exports = Expense = mongoose.model('Expense', ExpenseSchema);