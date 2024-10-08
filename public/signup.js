document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle success
            alert('Registration successful!');
        } else {
            // Handle error
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
