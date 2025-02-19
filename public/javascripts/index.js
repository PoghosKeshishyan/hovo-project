// SELECTORS
const form = document.querySelector('form');


// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    const localData = localStorage.getItem('specific_number');

    if (localData) {
        show_specific_number(localData);
        form.style.display = 'none';
    }
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = form.querySelector('input[name="email"]').value;
    const specific_number = generateRandomNumber();

    const data = { email, specific_number };

    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            await response.json();
            localStorage.setItem('specific_number', specific_number);
            show_specific_number(specific_number);
            form.style.display = 'none';
        } else {
            console.error('Failed to add data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


// FUNCTIONS
function generateRandomNumber() {
    const now = Date.now().toString().slice(-6);
    return now.slice(0, 3) + '-' + now.slice(3);
}

function show_specific_number(specific_number) {
    const div = document.createElement('div');
    div.classList.add('specific_number');
    div.innerHTML = `
       <p>Your ID number:</p>
       <p>${specific_number}</p>
    `;
    document.body.appendChild(div);
}