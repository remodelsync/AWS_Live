document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const emailInput = form.querySelector('input[name="email"]');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('Please enter a valid email address.');
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || 'Thank you for signing up!');
                emailInput.value = '';
            } else {
                throw new Error(result.error || 'An error occurred.');
            }
        } catch (error) {
            alert(error.message || 'An error occurred.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Notify Me';
        }
    });
});
