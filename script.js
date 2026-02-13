// Grab elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show error
function showError(el, msg) {
  const parent = el.parentElement;
  parent.className = 'form-control error';
  parent.querySelector('small').textContent = `❌ ${msg}`;
}

// Show success
function showSuccess(el) {
  const parent = el.parentElement;
  parent.className = 'form-control success';
  parent.querySelector('small').textContent = '✅';
}

// Simple email check
function validateEmail(el) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  re.test(el.value.trim()) ? showSuccess(el) : showError(el, 'Enter a valid email');
}

// Required fields
function checkRequired(fields) {
  fields.forEach(f => {
    f.value.trim() === '' ? showError(f, `${capitalize(f.id)} is required`) : showSuccess(f);
  });
}

// Length check
function checkLength(el, min, max) {
  if (el.value.length < min) showError(el, `${capitalize(el.id)} needs at least ${min} chars`);
  else if (el.value.length > max) showError(el, `${capitalize(el.id)} max ${max} chars`);
  else showSuccess(el);
}

// Password rules
function checkPassword(el) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,25}$/;
  !re.test(el.value) 
    ? showError(el, 'Password needs uppercase, lowercase & number') 
    : showSuccess(el);
}

// Match passwords
function passwordsMatch(p1, p2) {
  p1.value !== p2.value ? showError(p2, 'Passwords do not match') : showSuccess(p2);
}

// Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Event: submit
form.addEventListener('submit', e => {
  e.preventDefault();
  
  const fields = [username, email, password, password2];
  checkRequired(fields);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  validateEmail(email);
  checkPassword(password);
  passwordsMatch(password, password2);
});

// Real-time check
[username, email, password, password2].forEach(f => {
  f.addEventListener('input', () => {
    if (!f.value) return;
    if (f === email) validateEmail(f);
    if (f === password) checkPassword(f);
    if (f === password2) passwordsMatch(password, password2);
    if (f === username) checkLength(f, 3, 15);
  });
});
