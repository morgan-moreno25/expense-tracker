const express = require('express');
const Income = require('../model/Income');

const router = express.Router();


/**
 * @route http://localhost:5000/income
 * @action GET
 * @info Gets all income data
 */
router.get('/', (req, res) => {
    Income.find()
        .then(income => res.json(income))
        .catch(err => console.log(err));
});

/**
 * @route http://localhost:5000/income
 * @action POST
 * @info Creates a new income entry
 */
router.post('/', (req, res) => {
    let newIncome = new Income({
        id: req.body.id,
        category: req.body.category,
        amount: req.amount.id,
    });

    newIncome.save()
        .then(income => res.json(income))
        .catch(err => console.log(err))
});

/**
 * @route http://localhost:5000/:id
 * @action DELETE
 * @info Deletes an income entry at a specified id
 */
router.delete('/:id', (req, res) => {
    Income.findByIdAndDelete({_id: req.params.id})
        .then(income => res.json(income))
        .catch(err => console.log(err));
});

module.exports = router;