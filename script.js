const button = document.getElementById("add-button");

button.addEventListener("click", async function () {
    const amount = document.getElementById("amount-input").value;
    const category = document.getElementById("category-input").value;
    const type = document.getElementById("type-input").value;

    const transaction = {
    type: type.trim().toLowerCase(),
    amount: Number(amount),
    category: category.trim()
    };

    const response = await fetch("http://127.0.0.1:8000/transactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transaction)
    });

    const data = await response.json();

    console.log(data);
    loadTransactions();
});

async function loadTransactions() {
    const response = await fetch("http://127.0.0.1:8000/transactions");
    const transactions = await response.json();

    const container = document.getElementById("transactions-container");

    container.innerHTML = "";

    transactions.forEach(function (transaction) {
        const transactionElement = document.createElement("p");

        transactionElement.textContent =
            `${transaction.amount} euros | ${transaction.category} | ${transaction.type}`;

        container.appendChild(transactionElement);
    });
}

loadTransactions();