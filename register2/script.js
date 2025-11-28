const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show error message
function showError(input, message) {
  const formControl = input.closest(".form-control");
  formControl.className = "form-control error";
  formControl.querySelector("small").innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.closest(".form-control");
  formControl.className = "form-control success";
}

// Validate email format
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, "Email is not valid");
    return false;
  }
}

// Check required fields
function checkRequired(fields) {
  fields.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${input.id} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${input.id} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${input.id} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Check password match
function checkPasswordMatch(p1, p2) {
  if (p1.value !== p2.value) {
    showError(p2, "Passwords do not match");
  }
}

// Toggle show/hide password
document.querySelectorAll(".toggle").forEach((icon) => {
  icon.addEventListener("click", () => {
    const target = document.getElementById(icon.dataset.target);
    target.type = target.type === "password" ? "text" : "password";
  });
});

// Submit validation
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
