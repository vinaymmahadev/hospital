const submitButton = document.querySelector('.book-btn');
console.log(submitButton);

// function handleClick() {
//     const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

//     const bookingData = {
//         name: document.getElementById('name').value.trim(),
//         phone_number: document.getElementById('phone_number').value.trim(),
//         location: document.getElementById('location').value.trim(),
//         treatment: document.getElementById('treatment').value.trim()
//     };

//     console.log(bookingData, 'gyhb');
// }


// if (submitButton) {
//     submitButton.addEventListener('click', handleClick);
// }

function handleClick(event) {
    event.preventDefault();

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    const bookingData = {
        name: document.getElementById('name').value.trim(),
        phone_number: document.getElementById('phone_number').value.trim(),
        treatment :document.getElementById('treatment')?.value.trim(),
        location: document.getElementById('location').value.trim(),
        
    };
    const treatment = document.getElementById('treatment')?.value.trim();
console.log("Treatment value:", treatment);

        const missingFields = [];

    if (!bookingData.name) {
        missingFields.push('name');
    }
    if (!bookingData.phone_number) {
        missingFields.push('phone_number');
    }
    if (!bookingData.location) {
        missingFields.push('location');
    }
    if (!bookingData.treatment) {
        missingFields.push('treatment');
    }

    if (missingFields.length > 0) {
        alert('Please fill in the required field(s): ' + missingFields.join(', '));
        return; 
    }

    fetch('/submit-booking/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(bookingData)
    })
    .then(response => {
        if (response.ok) {
            alert('Booking submitted successfully!');
            clearFormInputs();
        } else {
            alert('Submission failed.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong.');
    });
}

if (submitButton) {
    submitButton.addEventListener('click', handleClick);
}




function clearFormInputs() {
    document.querySelectorAll('input, select, textarea').forEach(input => input.value = '');
    bookingData = {};
}