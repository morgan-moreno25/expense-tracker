// Module that contains all code related to created UI components
const CreateComponent = (() => {
    const incomeTableBody = (data) => {
        const tableBody = document.createElement('tbody');

        for( let i = 0; i < data.length; i++ ){
            const dataRow = document.createElement('tr');
            dataRow.dataset.id = i;
            
            const id = document.createElement('td');
            id.scope = 'row';
            id.innerHTML = data[i].id;
            dataRow.appendChild(id);

            const category = document.createElement('td');
            category.innerHTML = data[i].category;
            dataRow.appendChild(category);

            const amount = document.createElement('td');
            amount.innerHTML = data[i].amount;
            dataRow.appendChild(amount);

            const del = document.createElement('td');
            dataRow.appendChild(del);

            const delBtn = document.createElement('button');
            delBtn.classList.add('btn', 'btn-danger');
            delBtn.addEventListener('click', () => {
                controller.deleteIncome(data[i].id);
                controller.view.clearIncomeTable();
                controller.view.renderIncomeTable();
                controller.view.renderBalanceDisplays();
            });
            delBtn.innerHTML = '<i class="fas fa-trash"></i>'
            del.appendChild(delBtn);

            tableBody.appendChild(dataRow);
        };

        return tableBody;
    };
    const expenseTableBody = (data) => {
        const tableBody = document.createElement('tbody');

        for( let i = 0; i < data.length; i++ ){
            const dataRow = document.createElement('tr');
            dataRow.dataset.id = i;
            
            const id = document.createElement('td');
            id.scope = 'row';
            id.innerHTML = data[i].id;
            dataRow.appendChild(id);

            const category = document.createElement('td');
            category.innerHTML = data[i].category;
            dataRow.appendChild(category);

            const amount = document.createElement('td');
            amount.innerHTML = data[i].amount;
            dataRow.appendChild(amount);

            const del = document.createElement('td');
            dataRow.appendChild(del);

            const delBtn = document.createElement('button');
            delBtn.classList.add('btn', 'btn-danger');
            delBtn.addEventListener('click', () => {
                controller.deleteExpense(data[i].id);
                controller.view.clearExpenseTable();
                controller.view.renderExpenseTable();
                controller.view.renderBalanceDisplays();
            });
            delBtn.innerHTML = '<i class="fas fa-trash"></i>'
            del.appendChild(delBtn);

            tableBody.appendChild(dataRow);
        };

        return tableBody;
    };

    return {
        expenseForm: () => {
            const expenseForm = document.createElement('form');
            expenseForm.id = 'expense-form';
            expenseForm.class = 'form';

            const formTitle = document.createElement('h3');
            formTitle.innerHTML = 'Expense';
            formTitle.id = "form-title";
            expenseForm.appendChild(formTitle);

            const categoryGroup = document.createElement('div');
            categoryGroup.classList.add('form-group');
            expenseForm.appendChild(categoryGroup);

            const categoryLabel = document.createElement('label');
            categoryLabel.innerHTML = 'Category:';
            categoryGroup.appendChild(categoryLabel);

            const categoryInput = document.createElement('input');
            categoryInput.id = 'expense-category';
            categoryInput.type = 'text';
            categoryGroup.appendChild(categoryInput);

            const amountGroup = document.createElement('div');
            amountGroup.classList.add('form-group');
            expenseForm.appendChild(amountGroup);

            const amountLabel = document.createElement('label');
            amountLabel.innerHTML = 'Amount:';
            amountGroup.appendChild(amountLabel);

            const amountInput = document.createElement('input');
            amountInput.id = 'expense-amount';
            amountInput.type = 'number';
            amountGroup.appendChild(amountInput);

            const submitBtn = document.createElement('button');
            submitBtn.type = 'button';
            submitBtn.classList.add('btn', 'btn-info');
            submitBtn.id = 'submit-expense-form';
            submitBtn.innerHTML = 'Add Expense';
            expenseForm.appendChild(submitBtn);

            return expenseForm;
        },
        incomeForm: () => {
            const incomeForm = document.createElement('form');
            incomeForm.id = 'income-form';
            incomeForm.class = 'form';

            const formTitle = document.createElement('h3');
            formTitle.innerHTML = 'Income';
            formTitle.id = "form-title";
            incomeForm.appendChild(formTitle);

            const categoryGroup = document.createElement('div');
            categoryGroup.classList.add('form-group');
            incomeForm.appendChild(categoryGroup);

            const categoryLabel = document.createElement('label');
            categoryLabel.innerHTML = 'Category:';
            categoryGroup.appendChild(categoryLabel);

            const categoryInput = document.createElement('input');
            categoryInput.id = 'income-category';
            categoryInput.type = 'text';
            categoryGroup.appendChild(categoryInput);

            const amountGroup = document.createElement('div');
            amountGroup.classList.add('form-group');
            incomeForm.appendChild(amountGroup);

            const amountLabel = document.createElement('label');
            amountLabel.innerHTML = 'Amount:';
            amountGroup.appendChild(amountLabel);

            const amountInput = document.createElement('input');
            amountInput.id = 'income-amount';
            amountInput.type = 'number';
            amountGroup.appendChild(amountInput);

            const submitBtn = document.createElement('button');
            submitBtn.type = 'button';
            submitBtn.classList.add('btn', 'btn-info');
            submitBtn.id = 'submit-income-form';
            submitBtn.innerHTML = 'Add Income';
            incomeForm.appendChild(submitBtn);

            return incomeForm;
        },
        incomeTable: (data) => {
            const incomeTable = document.createElement('table');
            incomeTable.classList.add('table');
            incomeTable.id = 'income-table';

            const tableHead = document.createElement('thead');
            tableHead.classList.add('thead-dark');
            incomeTable.appendChild(tableHead);

            const headRow = document.createElement('tr');
            tableHead.appendChild(headRow);

            const id = document.createElement('th');
            id.scope = 'col';
            id.innerHTML = 'ID';
            headRow.appendChild(id);

            const category = document.createElement('th');
            category.scope = 'col';
            category.innerHTML = 'CATEGORY';
            headRow.appendChild(category);

            const amount = document.createElement('th');
            amount.scope = 'col';
            amount.innerHTML = 'AMOUNT';
            headRow.appendChild(amount);

            const del = document.createElement('th');
            del.scope = 'col';
            del.innerHTML = 'DELETE';
            headRow.appendChild(del);

            const tbody = incomeTableBody(data);
            incomeTable.appendChild(tbody);

            return incomeTable;
        },
        expenseTable: (data) => {
            const expenseTable = document.createElement('table');
            expenseTable.classList.add('table');
            expenseTable.id = 'expense-table';

            const tableHead = document.createElement('thead');
            tableHead.classList.add('thead-dark');
            expenseTable.appendChild(tableHead);

            const headRow = document.createElement('tr');
            tableHead.appendChild(headRow);

            const id = document.createElement('th');
            id.scope = 'col';
            id.innerHTML = 'ID';
            headRow.appendChild(id);

            const category = document.createElement('th');
            category.scope = 'col';
            category.innerHTML = 'CATEGORY';
            headRow.appendChild(category);

            const amount = document.createElement('th');
            amount.scope = 'col';
            amount.innerHTML = 'AMOUNT';
            headRow.appendChild(amount);

            const del = document.createElement('th');
            del.scope = 'col';
            del.innerHTML = 'DELETE';
            headRow.appendChild(del);

            const tbody = expenseTableBody(data);
            expenseTable.appendChild(tbody);

            return expenseTable;
        },

    }
})();

/**
 * @View this class is used to control the views of the page
 * @attributes the attributes of this class are elements from the HTML doc skeleton
 * @methods the methods of this class are responsible for rendering elements and data to the page
 */
class View {
    htmlTag;
    toggleExpenseForm;
    toggleIncomeForm;
    formContainer;
    netBalance;
    netIncomes;
    netExpenses;
    incomeTableContainer;
    expenseTableContainer;

    constructor(){
        this.htmlTag = document.getElementsByTagName('html')[0];
        this.toggleExpenseForm = document.getElementById('expense-form-toggle');
        this.toggleIncomeForm = document.getElementById('income-form-toggle');
        this.formContainer = document.getElementById('form-container');
        this.netBalance = document.getElementById('net-balance');
        this.netIncomes = document.getElementById('net-income');
        this.netExpenses = document.getElementById('net-expenses');
        this.incomeTableContainer = document.getElementById('income-table-container');
        this.expenseTableContainer = document.getElementById('expense-table-container');
    };
    init(){
        this.addEventListeners();
        this.renderBalanceDisplays();
        this.renderIncomeTable();
        this.renderExpenseTable();
        this.initializeTheme();
    };
    initializeTheme(){
      let netBalance = controller.totalIncome() - controller.totalExpenses();
      if(netBalance > 0){
          this.htmlTag.setAttribute('data-theme', 'netGain');
          this.netBalance.style = "color: var(--green);";
      }else if(netBalance < 0){
          this.htmlTag.setAttribute('data-theme', 'netLoss');
          this.netBalance.style = "color: var(--red);";
      }else{
          this.htmlTag.setAttribute('data-theme', 'default');
          this.netBalance.style = "color: black;";
      }
    };
    clearFormContainer(){
        while(this.formContainer.children.length > 0){
            this.formContainer.removeChild(this.formContainer.firstChild);
        };
    };
    clearIncomeTable(){
        while(this.incomeTableContainer.children.length > 0){
            this.incomeTableContainer.removeChild(this.incomeTableContainer.firstChild);
        };
    };
    clearExpenseTable(){
        while(this.expenseTableContainer.children.length > 0){
            this.expenseTableContainer.removeChild(this.expenseTableContainer.firstChild);
        };
    };
    addEventListeners(){
        this.toggleExpenseForm.addEventListener('click', () => {
            this.clearFormContainer();
            this.renderExpenseForm();
        });
        this.toggleIncomeForm.addEventListener('click', () => {
            this.clearFormContainer();
            this.renderIncomeForm();
        });
    };
    renderExpenseForm(){
        let expenseForm = CreateComponent.expenseForm();
        this.formContainer.appendChild(expenseForm);
        document.getElementById('submit-expense-form').addEventListener('click', () => {
            let expenseCategory = document.getElementById('expense-category').value;
            let expenseAmount = document.getElementById('expense-amount').value;
            let newExpense = {
                id: controller.model.expenses.length,
                category: expenseCategory,
                amount: expenseAmount,
            };

            controller.addExpense(newExpense);
            this.clearExpenseTable();
            this.renderExpenseTable();
            this.renderBalanceDisplays();
        });
    };
    renderIncomeForm(){
        let incomeForm = CreateComponent.incomeForm();
        this.formContainer.appendChild(incomeForm);
        document.getElementById('submit-income-form').addEventListener('click', () => {
            let incomeCategory = document.getElementById('income-category').value;
            let incomeAmount = document.getElementById('income-amount').value;
            let newIncome = {
                id: controller.model.income.length,
                category: incomeCategory,
                amount: incomeAmount,
            };

            controller.addIncome(newIncome);
            this.clearIncomeTable();
            this.renderIncomeTable();
            this.renderBalanceDisplays();
        });
    };
    renderBalanceDisplays(){
        let netIncome = controller.totalIncome();
        let netExpenses = controller.totalExpenses();
        let netBalance = netIncome - netExpenses;

        this.netBalance.innerHTML = `$${netBalance}`;
        this.netIncomes.innerHTML = `$${netIncome}`;
        this.netExpenses.innerHTML = `$${netExpenses}`;

        this.initializeTheme();
    };
    renderIncomeTable(){
        const DATA = controller.model.income;
        let table = CreateComponent.incomeTable(DATA);
        this.incomeTableContainer.appendChild(table);
    };
    renderExpenseTable(){
        const DATA = controller.model.expenses;
        let table = CreateComponent.expenseTable(DATA);
        this.expenseTableContainer.appendChild(table);
    };
};

/**
 * @Controller this class is used to control the data that is passed to the view
 * @attributes the attributes of this class are instances of both the view and model classes
 * @methods the methods of this class include CRUD operations for both income and expenses
 */
class Controller {
    
    constructor(view, model){
        this.view = view;
        this.model = model;
    };
    init(){
        this.view.init();
    };
    toggleTheme(){
        let netBalance = this.totalIncome() - this.totalExpenses();
        if(netBalance > 0){
            this.model.theme = 'netGain';
        }else if (netBalance < 0){
            this.model.theme = 'netLoss';
        }else {
            this.model.theme = 'default';
        }
    };
    addExpense(expense){
        this.model.expenses.push(expense);
        this.model.saveExpensesLS();
    };
    addIncome(income){
        this.model.income.push(income);
        this.model.saveIncomeLS();
    };
    deleteExpense(id){
        this.model.expenses = this.model.expenses.filter(expense => expense.id !== id);
        this.model.saveExpensesLS();
    };
    deleteIncome(id){
        this.model.income = this.model.income.filter(income => income.id !== id);
        this.model.saveIncomeLS();
    };
    totalExpenses(){
        let expenseTotal = this.model.expenses.reduce((prev, cur) => prev + Number(cur.amount), 0);
        console.log(expenseTotal);
        return expenseTotal;
    };
    totalIncome(){
        let incomeTotal = this.model.income.reduce((prev, cur) => prev + Number(cur.amount), 0);
        console.log(incomeTotal);
        return incomeTotal;
    };

};

/**
 * @Model this class is used to store the data for the application
 * @attributes the attributes of this class are income and expenses and they contain the applications respective data
 * @methods the methods of this class are responsible for fetching the data from the backend
 */
class Model {
    expenses;
    income;
    constructor(){
        if(localStorage.getItem('income')){
            this.income = JSON.parse(localStorage.getItem('income'));
        }else {
            localStorage.setItem('income', JSON.stringify([{ id: 0, category: 'Paycheck', amount: 1000 }]));
            this.income = JSON.parse(localStorage.getItem('income'));
        };

        if(localStorage.getItem('expenses')){
            this.expenses = JSON.parse(localStorage.getItem('expenses'));
        }else {
            localStorage.setItem('expenses', JSON.stringify([{ id: 0, category: 'Rent', amount: 500 }]));
            this.expenses = JSON.parse(localStorage.getItem('expenses'));
        }
    };
    init(){

    };
    saveIncomeLS(){
        localStorage.setItem('income', JSON.stringify(this.income));
    };
    saveExpensesLS(){
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    };
};

const view = new View();
const model = new Model();
const controller = new Controller(view, model);
controller.init();