const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalElement = document.getElementById("total");


let total = 0;

expenseForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (name === "" || amount<=0) {
        return;
    }

    // Create A List

    const li = document.createElement("li")

    li.innerHTML = `
        <span>${name}</span>
        <span>₹${amount}</span>
        <button class="delete-btn">Delete</button>
    `;

    expenseList.appendChild(li);

    // Update total
    total += amount;
    totalElement.textContent = total;

    // Delete expense
    li.querySelector(".delete-btn").addEventListener("click", function () {
        total -= amount;
        totalElement.textContent = total;
        li.remove();
    });

    // Clear inputs
    expenseName.value = "";
    expenseAmount.value = "";
});