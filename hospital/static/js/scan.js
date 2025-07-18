
function openPopup() {
  document.getElementById('consultationModal').style.display = 'block';
}

function closePopup() {
  document.getElementById('consultationModal').style.display = 'none';
}

function validatePopupForm() {
  const name = document.getElementById('popup-name').value.trim();
  const phone = document.getElementById('popup-phone').value.trim();
  const email = document.getElementById('popup-email').value.trim();
  const error = document.getElementById('popup-error');

  if (!name || !phone || !email) {
    error.style.display = 'block';
  } else {
    error.style.display = 'none';
    alert("Form submitted successfully!");
    closePopup();
  }
}


window.onclick = function(event) {
  const modal = document.getElementById('consultationModal');
  if (event.target == modal) {
    closePopup();
  }
}
