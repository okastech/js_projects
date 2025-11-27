const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//Show input success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//Checking if email valid
const checkEmail = (input) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(input.value.trim()).toLowerCase())) {
    showSuccess(input);
    return true; // Indicate success
  } else {
    showError(input, "Email is not valid");
    return false; // Indicate failure
  }
};

//Check email match
function checkEmailMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "password do not match");
  }
}

//Check Required Filed
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFiledName(input)} 'is required'`);
    } else {
      showSuccess(input);
    }
  });
}

//Getting FiledName
function getFiledName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check input Length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFiledName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFiledName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//Event Listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkEmailMatch(password, password2);
});
