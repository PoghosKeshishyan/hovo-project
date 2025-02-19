document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button');

    button.addEventListener('click', async () => {
        button.disabled = true;
        button.textContent = 'Generating...';

        setTimeout(async () => {
            try {
                const response = await fetch('/random-person');
                const person = await response.json();

                if (!person) {
                    throw new Error('No persons found!');
                }

                button.textContent = 'Generate Random ID number';
                button.disabled = false;

                Swal.fire({
                    title: 'Generated ID Number',
                    html: `
                        <p class="modal_text">Email: <strong>${person.email}</strong></p>
                        <p class="modal_text">Specific Number: <strong>${person.specific_number}</strong></p>
                    `,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

            } catch (error) {
                console.error(error);
                button.textContent = 'Generate Random ID number';
                button.disabled = false;
                Swal.fire('Error', 'Failed to fetch person data!', 'error');
            }
        }, 2000);
    });
});