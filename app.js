const express = require('express');
const mongoose = require('mongoose');

const incomeRouter = require('./routes/incomeRouter');
const expenseRouter = require('./routes/expenseRouter');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) throw err;
    console.log('DB Connected');
});

app.use(express.static('docs'));
app.use('/income', incomeRouter);
app.use('/expense', expenseRouter);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/docs/index.html');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Listening at port ${PORT}`);
} )


