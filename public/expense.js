document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');

    // Function to display expenses with a delete button
    const displayExpenses = (expenses) => {
        expenseList.innerHTML = ''; // Clear the list first
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.id='exli';
            li.textContent = `${expense.description} - ${expense.amount} [${expense.category}]`;

            // Create a delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.style.marginLeft = '10px';
            deleteBtn.addEventListener('click', async () => {
                await deleteExpense(expense.id); // Delete expense when clicked
                fetchExpenses(); // Refresh the list after deletion
            });

            li.appendChild(deleteBtn);
            expenseList.appendChild(li);
        });
    };

    // Fetch and display expenses when the page loads
    const fetchExpenses = async () => {
        try {
            const response = await fetch('/expenses');
            const expenses = await response.json();
            displayExpenses(expenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    // Call fetchExpenses on page load
    fetchExpenses();

    // Handle form submission to add new expense
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const expenseData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expenseData)
            });
            if (response.ok) {
                form.reset(); // Reset the form after submission
                fetchExpenses(); // Refresh the expense list
            } else {
                console.error('Failed to add expense');
            }
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    });

    // Function to delete an expense by ID
    const deleteExpense = async (id) => {
        try {
            const response = await fetch(`/expenses/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                console.error('Failed to delete expense');
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };
});
