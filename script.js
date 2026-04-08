let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget = JSON.parse(localStorage.getItem("budget")) || 0;

function saveData() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("budget", JSON.stringify(budget));
}

function setBudget() {
  const budgetInput = document.getElementById("budgetInput").value;

  if (budgetInput === "" || Number(budgetInput) <= 0) {
    alert("Please enter a valid budget.");
    return;
  }

  budget = Number(budgetInput);
  saveData();
  document.getElementById("budgetInput").value = "";
  updateUI();
}

function addExpense() {
  const name = document.getElementById("expenseName").value.trim();
  const amount = document.getElementById("expenseAmount").value;
  const category = document.getElementById("expenseCategory").value;
  const date = document.getElementById("expenseDate").value;

  if (!name || amount === "" || !category || !date) {
    alert("Please fill all fields.");
    return;
  }

  const expense = {
    id: Date.now(),
    name,
    amount: Number(amount),
    category,
    date
  };

  expenses.push(expense);
  saveData();
  clearInputs();
  updateUI();
}

function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  saveData();
  updateUI();
}

function clearInputs() {
  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseCategory").value = "";
  document.getElementById("expenseDate").value = "";
}

function updateUI() {
  const expenseList = document.getElementById("expenseList");
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = budget - totalSpent;

  document.getElementById("budgetDisplay").textContent = `₹${budget}`;
  document.getElementById("totalSpent").textContent = `₹${totalSpent}`;
  document.getElementById("remainingBudget").textContent = `₹${remaining}`;

  expenseList.innerHTML = "";

  expenses.forEach(expense => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${expense.name}</td>
      <td>₹${expense.amount}</td>
      <td>${expense.category}</td>
      <td>${expense.date}</td>
      <td><button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button></td>
    `;

    expenseList.appendChild(row);
  });
}

updateUI();
