const themeBtn = document.querySelector(".theme-btn");
const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");

const transactionType = document.getElementById("transaction-type");
const category = document.getElementById("category");
const date = document.getElementById("date");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("total");
const searchInput = document.getElementById("search");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const transaction = {
        id: Date.now(),
        name: expenseName.value.trim(),
        amount: Number(expenseAmount.value),
        type: transactionType.value,
        category: category.value,
        date: date.value
    };

    if (
        transaction.name === "" ||
        transaction.amount <= 0 ||
        transaction.type === "" ||
        transaction.category === "" ||
        transaction.date === ""
    ) {
        return;
    }

    transactions.push(transaction);

    saveTransactions();
    renderTransactions();

    expenseForm.reset();
});

function renderTransactions(search = "") {

    expenseList.innerHTML = "";

    let income = 0;
    let expense = 0;

    const filteredTransactions = transactions.filter(transaction =>
        transaction.name.toLowerCase().includes(search.toLowerCase())
    );

    filteredTransactions.forEach(transaction => {

        if(transaction.type === "income"){
            income += transaction.amount;
        }else{
            expense += transaction.amount;
        }

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <h3>${getCategoryIcon(transaction.category)} ${transaction.name}</h3>
                <small>${transaction.category} • ${transaction.date}</small>
            </div>

            <div>

                <span class="amount"
                style="color:${transaction.type==="income" ? "#22c55e" : "#ef4444"}">

                ${transaction.type==="income" ? "+" : "-"}₹${transaction.amount}

                </span>

                <button class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        li.querySelector(".delete-btn").addEventListener("click", () => {
            deleteTransaction(transaction.id);
        });

        expenseList.appendChild(li);

    });

    incomeElement.textContent = income;

    expenseElement.textContent = expense;

    balanceElement.textContent = income - expense;

}

function deleteTransaction(id){

    transactions = transactions.filter(t => t.id !== id);

    saveTransactions();

    renderTransactions();

}

function saveTransactions(){

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

function getCategoryIcon(category){

    const icons = {

        Food:"🍔",
        Shopping:"🛍️",
        Transport:"🚕",
        Entertainment:"🎮",
        Education:"📚",
        Health:"💊",
        Salary:"💼",
        Others:"📦"

    };

    return icons[category] || "📌";

}

renderTransactions();

searchInput.addEventListener("input", () => {
    renderTransactions(searchInput.value);
});

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "light"){
    document.body.classList.add("light-mode");
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        localStorage.setItem("theme","light");

        themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }else{

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }

});