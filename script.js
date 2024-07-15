document.addEventListener('DOMContentLoaded', function () {
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');

    expenseForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const expenseName = document.getElementById('expenseName').value;
        const expenseAmount = document.getElementById('expenseAmount').value;
        if (expenseName && expenseAmount) {
            addExpense(expenseName, expenseAmount);
            expenseForm.reset();
        } else {
            alert('Please fill in both fields.');
        }
    });

    function addExpense(name, amount) {
        const li = document.createElement('li');
        li.innerHTML = `<span>${name}</span>: ${amount} <button class="delete-btn">Delete</button>`;
        expenseList.appendChild(li);
        saveToLocalStorage(name, amount);
    }

    function saveToLocalStorage(name, amount) {
        let expenses;
        if (localStorage.getItem('expenses') === null) {
            expenses = [];
        } else {
            expenses = JSON.parse(localStorage.getItem('expenses'));
        }

        expenses.push({ name: name, amount: amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    document.addEventListener('DOMContentLoaded', function () {
        let expenses;
        if (localStorage.getItem('expenses') === null) {
            expenses = [];
        } else {
            expenses = JSON.parse(localStorage.getItem('expenses'));
            expenses.forEach(expense => {
                addExpense(expense.name, expense.amount);
            });
        }
    });

    // Delete expense
    expenseList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this expense?')) {
                e.target.parentElement.remove();
                removeFromLocalStorage(e.target.parentElement);
            }
        }
    });

    function removeFromLocalStorage(expenseItem) {
        let expenses;
        if (localStorage.getItem('expenses') === null) {
            expenses = [];
        } else {
            expenses = JSON.parse(localStorage.getItem('expenses'));
        }

        expenses.forEach((expense, index) => {
            if (expenseItem.firstChild.textContent === expense.name) {
                expenses.splice(index, 1);
            }
        });

        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
});
