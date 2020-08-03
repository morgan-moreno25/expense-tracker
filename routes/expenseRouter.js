const express = require('express');
const Expense = require('../model/Expense');

const router = express.Router();

/**
 * @route http://localhost:5000/expenses
 * @action GET
 * @info Gets all expenses
 */
router.get('/', (req, res) => {
    Expense.find()
        .then(expenses => res.json(expenses))
        .catch(err => console.log(err))
});

/**
 * @route http://localhost:5000/expenses
 * @action POST
 * @info Creates a new expense entry
 */
router.post('/', (req, res) => {
    let newExpense = new Expense({
        id: req.body.id,
        category: req.body.category,
        amount: req.body.title,
    });

    newExpense.save()
        .then(expense => res.json(expense))
        .catch(err => console.log(err))
});

/**
 * @route http://localhost:5000/expenses/:id
 * @action DELETE
 * @info Delets an expense entry at the specified id
 */
router.delete('/:id', (req, res) => {
    Expense.findByIdAndDelete({_id: req.params.id})
        .then(expense => res.json(expense))
        .catch(err => console.log(err))
});




module.exports = router;