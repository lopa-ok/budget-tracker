document.getElementById('add-transaction').addEventListener('click', addTransaction);

let balance = 0;
const transactions = [];

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
        updateBalance();
        displayTransactions();

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
