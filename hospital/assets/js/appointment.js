
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
    if (!appointmentData.email_id) missingFields.push('email_id');

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
  };





    //   if (!name || !email || !mobile) {
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