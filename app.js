// Toggle between Login and Register forms
function toggleForms(formType) {
  if (formType === 'register') {
      document.getElementById('registerForm').style.display = 'block';
      document.getElementById('loginForm').style.display = 'none';
  } else {
      document.getElementById('registerForm').style.display = 'none';
      document.getElementById('loginForm').style.display = 'block';
  }
}

// Register a user
function registerUser() {
const email = document.getElementById('registerEmail').value;
const password = document.getElementById('registerPassword').value;

fetch('http://localhost:3000/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
.then(response => response.json())
.then(data => {
  alert(data.message);
  if (data.message === 'User registered successfully') {
    toggleForms('login');
  }
})
.catch(error => {
  console.error('Error:', error);
});
}

// Log in a user
function loginUser() {
const email = document.getElementById('loginEmail').value;
const password = document.getElementById('loginPassword').value;

fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
.then(response => response.json())
.then(data => {
  if (data.token) {
    localStorage.setItem('token', data.token); // Store the JWT token
    alert('Login successful');
  } else {
    alert(data.message);
  }
})
.catch(error => {
  console.error('Error:', error);
});
}

// Handle clicking Login/Register Links
document.getElementById('loginLink').addEventListener('click', function(event) {
  event.preventDefault();
  toggleForms('login');
});

document.getElementById('registerLink').addEventListener('click', function(event) {
  event.preventDefault();
  toggleForms('register');
});
