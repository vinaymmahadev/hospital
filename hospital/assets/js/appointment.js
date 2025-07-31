
  // Open popup
  document.querySelectorAll('.book-now-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('popup').style.display = 'flex';
    });
  });

  // Close popup
  document.getElementById('popupClose').onclick = () => {
    document.getElementById('popup').style.display = 'none';
  };

  // Get CSRF token from form
  function getCSRFToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]').value;
  }

  // Clear form and hide popup
  function clearFormInputs() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('popup').style.display = 'none';
  }

  // Submit form
  document.getElementById('popupForm').onsubmit = e => {
    e.preventDefault();
    const appointmentData = {
      name: document.getElementById('name').value.trim(),
      phone_number: document.getElementById('mobile').value.trim(),
      email_id: document.getElementById('email').value.trim(),
    };

    const missingFields = [];
    if (!appointmentData.name) missingFields.push('name');
    if (!appointmentData.phone_number) missingFields.push('phone_number');


    if (missingFields.length > 0) {
      alert('Please fill in: ' + missingFields.join(', '));
      return;
    }

    fetch('/appointment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken()
      },
      body: JSON.stringify(appointmentData)
    })
    .then(response => {
      if (response.ok) {
  // Show confirmation message
  const successBox = document.getElementById('bookingSuccess');
  successBox.style.display = 'block';

  // Optionally clear inputs
  document.querySelector('input[placeholder="Enter your name"]').value = '';
  document.querySelector('input[placeholder="📞 Phone Number"]').value = '';
  document.querySelector('#location').value = '';
  document.querySelector('input[placeholder="Treatments"]').value = '';

  // Hide the message after 3 seconds
  setTimeout(() => {
    successBox.style.display = 'none';
  }, 3000);

        clearFormInputs();
      } else {
        alert('Submission failed.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Something went wrong.');
    });
  };





    //   if (!name || !mobile) {
    //     document.getElementById('formError').textContent = "All fields are required.";
    //   } else {
    //     alert("Booking confirmed!");
    //     document.getElementById('popup').style.display = 'none';
    //   }
    
 



// const submitButton = document.querySelector('.appoint_ment');
// console.log(submitButton,);

// function handleClick(event) {
//     event.preventDefault();

//     const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

//     const appointmentData = {
//         name: document.getElementById('name').value.trim(),
//         phone_number: document.getElementById('mobile').value.trim(),
//         email_id: document.getElementById('email').value.trim(),
//     };

//         const missingFields = [];

//     if (!bookingData.name) {
//         missingFields.push('name');
//     }
//     if (!bookingData.phone_number) {
//         missingFields.push('phone_number');
//     }
//     if (!bookingData.location) {
//         missingFields.push('email_id');
//     }
   
    
//     if (missingFields.length > 0) {
//         alert('Please fill in the required field(s): ' + missingFields.join(', '));
//         return; 
//     }

//     fetch('/appointment/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken
//         },
//         body: JSON.stringify(appointmentData)
//     })
//     .then(response => {
//         if (response.ok) {
//             alert('Booking submitted successfully!');
//             clearFormInputs();
//         } else {
//             alert('Submission failed.');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Something went wrong.');
//     });
// }

// if (submitButton) {
//     submitButton.addEventListener('click', handleClick);
// }




// function clearFormInputs() {
//     document.querySelectorAll('input, select, textarea').forEach(input => input.value = '');
//     appointmentData = {};
// }

function initBookingForm() {
  const bookBtn = document.querySelector('.primary-btn');

  if (!bookBtn) {
    console.error('Book Now button not found');
    return;
  }

  bookBtn.addEventListener('click', async function () {
    const name = document.querySelector('input[placeholder="Enter your name"]').value;
    const phone_number = document.querySelector('input[placeholder="📞 Phone Number"]').value;
    const location = document.querySelector('#location').value; // updated: use select ID
    const treatment = document.querySelector('input[placeholder="Treatments"]').value;

    const payload = { name, phone_number, location, treatment };

    try {
   const response = await fetch('/submit-booking/', {
  method: 'POST',
  headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
    // ✅ Replace alert with this
    document.querySelector('.treatment-form').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
  } else {
    alert('Error: ' + result.error);
  }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  });
}

// Initialize the form once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initBookingForm);
function initBookingForm() {
  const bookBtn = document.querySelector('.primary-btn');
  const messageBox = document.getElementById('booking-message');

  if (!bookBtn) {
    console.error('Book Now button not found');
    return;
  }

  bookBtn.addEventListener('click', async function (event) {
    event.preventDefault();

    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;

    const name = document.querySelector('input[placeholder="Enter your name"]').value.trim();
    const phone_number = document.querySelector('input[placeholder="📞 Phone Number"]').value.trim();
    const location = document.querySelector('input[placeholder="Location"]').value.trim();
    const treatment = document.querySelector('input[placeholder="Treatments"]').value.trim();

    const payload = { name, phone_number, location, treatment };

    // Check for empty fields
    const missingFields = [];
    for (const [key, value] of Object.entries(payload)) {
      if (!value) missingFields.push(key);
    }

    if (missingFields.length > 0) {
      if (messageBox) {
        messageBox.style.color = 'red';
        messageBox.textContent =
          'Please fill in the required field(s): ' + missingFields.join(', ');
      }
      return;
    }

    try {
      const response = await fetch('/submit-booking/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken || ''
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        if (messageBox) {
          messageBox.style.color = 'green';
          messageBox.textContent =
            result.message || '✅ Booking submitted successfully!';
        }

        // Clear inputs
        document.querySelectorAll('.treatment-form input').forEach(input => {
          input.value = '';
        });

        // Auto-hide message after 3 seconds (optional)
        setTimeout(() => {
          messageBox.textContent = '';
        }, 3000);
      } else {
        if (messageBox) {
          messageBox.style.color = 'red';
          messageBox.textContent = result.error || '❌ Submission failed.';
        }
      }
    } catch (error) {
      if (messageBox) {
        messageBox.style.color = 'red';
        messageBox.textContent = '⚠️ Network error: ' + error.message;
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', initBookingForm);
