  const form = document.getElementById('msgform');
  const successMessage = document.getElementById('successMessage');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Stop default form submission (which breaks layout)

    const formData = new FormData(form);

    fetch('https://formsubmit.co/8f29426c3879747cc918e807a1c694c2', {  // Send to FormSubmit
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        form.reset(); // Clear form
        successMessage.style.display = 'block'; // Show success message
      } else {
        alert('Something went wrong. Please try again.');
      }
    }).catch(error => {
      alert('Error! Please try again later.');
    });
  });
