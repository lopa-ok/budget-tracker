document.getElementById('add-transaction').addEventListener('click', addTransaction);

let balance = 0;
const transactions = [];
const monthlyExpenses = {
    food: 0,
    transport: 0,
    entertainment: 0,
    utilities: 0,
    others: 0
};

function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (description && amount) {
        const transaction = {
            description,
            amount,
            category,
            id: Date.now()
        };

        transactions.push(transaction);
        monthlyExpenses[category] += amount;

        updateBalance();
        displayTransactions();
        updateChart();

        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('category').value = 'food';
    }
}

function updateBalance() {
    balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    document.getElementById('balance').innerText = balance.toFixed(2);
}

function displayTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${transaction.description} - $${transaction.amount.toFixed(2)}
            <span>[${transaction.category}]</span>
        `;
        transactionList.appendChild(li);
    });
}

const ctx = document.getElementById('expenses-chart').getContext('2d');
const expensesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Others'],
        datasets: [{
            label: 'Monthly Expenses',
            data: [
                monthlyExpenses.food,
                monthlyExpenses.transport,
                monthlyExpenses.entertainment,
                monthlyExpenses.utilities,
                monthlyExpenses.others
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateChart() {
    expensesChart.data.datasets[0].data = [
        monthlyExpenses.food,
        monthlyExpenses.transport,
        monthlyExpenses.entertainment,
        monthlyExpenses.utilities,
        monthlyExpenses.others
    ];
    expensesChart.update();
}
