document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const messageDiv = document.getElementById('message'); // Get the message div

        if (response.ok) {
            const successMessage = await response.text(); // Get the success message
            messageDiv.style.color = 'green'; // Set message color to green
            messageDiv.textContent = successMessage; // Display success message
        } else {
            const errorMessage = await response.text(); // Get the error message
            messageDiv.style.color = 'red'; // Set message color to red
            messageDiv.textContent = errorMessage; // Display error message
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An unexpected error occurred.';
    }
});
