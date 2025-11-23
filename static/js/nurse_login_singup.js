function toggleForm() {
  const signInForm = document.getElementById("signInForm");
  const signUpForm = document.getElementById("signUpForm");

  if (signInForm.classList.contains("active")) {
    signInForm.classList.remove("active");
    signUpForm.classList.add("active");
  } else {
    signUpForm.classList.remove("active");
    signInForm.classList.add("active");
  }

  clearAllErrors();
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const toggle = input.parentElement.querySelector(".password-toggle");
  const eyeOpen = toggle.querySelector(".eye-open");
  const eyeClosed = toggle.querySelector(".eye-closed");

  if (input.type === "password") {
    input.type = "text";
    eyeOpen.style.display = "none";
    eyeClosed.style.display = "block";
  } else {
    input.type = "password";
    eyeOpen.style.display = "block";
    eyeClosed.style.display = "none";
  }
}

function handleSocialLogin(provider) {
  alert(
    "Redirecting to " +
      provider.charAt(0).toUpperCase() +
      provider.slice(1) +
      " login...\n\n(This is a demo - actual integration would redirect to OAuth)"
  );
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[\d\s\-\+\(\)]{10,}$/;
  return re.test(phone);
}

function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]+/)) strength++;
  if (password.match(/[A-Z]+/)) strength++;
  if (password.match(/[0-9]+/)) strength++;
  if (password.match(/[$@#&!]+/)) strength++;

  return strength;
}

function updatePasswordStrength(input) {
  const password = input.value;
  const strengthBar = input.parentElement.querySelector(
    ".password-strength-bar"
  );
  const strengthContainer =
    input.parentElement.querySelector(".password-strength");

  if (password.length > 0) {
    strengthContainer.classList.add("show");
    const strength = checkPasswordStrength(password);

    strengthBar.className = "password-strength-bar";
    if (strength <= 2) {
      strengthBar.classList.add("weak");
    } else if (strength <= 4) {
      strengthBar.classList.add("medium");
    } else {
      strengthBar.classList.add("strong");
    }
  } else {
    strengthContainer.classList.remove("show");
  }
}

function showError(input, message) {
  const group = input.parentElement;
  const errorMsg = group.querySelector(".error-message");
  const successIcon = group.querySelector(".success-icon");

  // Add classes to input
  input.classList.add("error");
  input.classList.remove("success");

  // Add classes to group
  group.classList.add("error");
  group.classList.remove("success");

  if (errorMsg) {
    errorMsg.textContent = message;
    errorMsg.classList.add("show");
  }

  if (successIcon) {
    successIcon.classList.remove("show");
  }
}

function showSuccess(input) {
  const group = input.parentElement;
  const errorMsg = group.querySelector(".error-message");
  const successIcon = group.querySelector(".success-icon");

  // Add classes to input
  input.classList.add("success");
  input.classList.remove("error");

  // Add classes to group
  group.classList.add("success");
  group.classList.remove("error");

  if (errorMsg) {
    errorMsg.classList.remove("show");
  }

  if (successIcon) {
    successIcon.classList.add("show");
  }
}

function clearError(input) {
  input.classList.remove("error");
  const errorMsg = input.parentElement.querySelector(".error-message");
  if (errorMsg) {
    errorMsg.classList.remove("show");
  }
}

function clearAllErrors() {
  document.querySelectorAll("input").forEach((input) => {
    input.classList.remove("error", "success");
    const errorMsg = input.parentElement.querySelector(".error-message");
    const successIcon = input.parentElement.querySelector(".success-icon");
    if (errorMsg) errorMsg.classList.remove("show");
    if (successIcon) successIcon.classList.remove("show");
  });
}

// Setup password strength for signup password
const signUpPasswordInput = document.getElementById("signUpPassword");
if (signUpPasswordInput) {
  signUpPasswordInput.addEventListener("input", function (e) {
    updatePasswordStrength(e.target);
  });
}

// Setup blur validation for all inputs
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("blur", function (e) {
    if (e.target.value && e.target.id !== "confirmPassword") {
      validateField(e.target);
    }
  });

  input.addEventListener("input", function (e) {
    if (e.target.classList.contains("error")) {
      clearError(e.target);
    }
  });
});

function validateField(input) {
  const value = input.value.trim();

  if (input.type === "email") {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) {
      showError(input, "Please enter a valid email");
      return false;
    }
  }

  if (input.id === "fullNameSignIn" && value.length < 2) {
    showError(input, "Full name is required");
    return false;
  }

  if (input.id === "signUpNurseId" && value.length < 2) {
    showError(input, "Valid Nurse ID is required");
    return false;
  }

  if (input.id === "signUpHospitalCode" && value.length < 1) {
    showError(input, "Hospital code is required");
    return false;
  }

  if (input.id === "phoneNumber") {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value)) {
      showError(input, "Valid phone number is required");
      return false;
    }
  }

  showSuccess(input);
  return true;
}

function handleSignIn(event) {
  event.preventDefault();

  const nurseId_signin = document.getElementById("signInNurseId");
  const hospitalCode_signin = document.getElementById("signInHospitalCode");
  const password = document.getElementById("signInPassword");

  let isValid = true;

  // Validate Nurse ID
  if (nurseId_signin.value.trim() === "") {
    showError(nurseId_signin, "Nurse ID is required");
    isValid = false;
  }

  // Validate Hospital Code
  if (hospitalCode_signin.value.trim() === "") {
    showError(hospitalCode_signin, "Hospital Code is required");
    isValid = false;
  }

  // Validate Password
  if (password.value.trim() === "") {
    showError(password, "Password is required");
    isValid = false;
  }

  if (!isValid) return;

  // Retrieve users from localStorage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user exists
  const foundUser = storedUsers.find(
    (user) =>
      user.nurseId === nurseId_signin.value &&
      user.hospitalCode === hospitalCode_signin.value &&
      user.password === password.value
  );

if (foundUser) {
  alert(
    "Sign In Successful!\n" +
      "Nurse ID: " +
      foundUser.nurseId +
      "\n" +
      "Hospital Code: " +
      foundUser.hospitalCode
  );

  // Redirect to dashboard
  window.location.href = "nurse_dashboard.html";
} else {
  alert("User not found or incorrect credentials");
}
}

function handleSignUp(event) {
  event.preventDefault();

  const fullName_signup = document.getElementById("fullNameSignIn");
  const nurseId_signup = document.getElementById("signUpNurseId");
  const hospitalCode_signup = document.getElementById("signUpHospitalCode");
  const email_signup = document.getElementById("signUpEmail");
  const phone = document.getElementById("phoneNumber");
  const password_signup = document.getElementById("signUpPassword");
  const confirmPassword = document.getElementById("confirmPassword");

  let isValid = true;

  // Basic validations
  if (!validateField(fullName_signup)) isValid = false;
  if (!validateField(nurseId_signup)) isValid = false;
  if (!validateField(hospitalCode_signup)) isValid = false;
  if (!validateField(email_signup)) isValid = false;
  if (!validateField(phone)) isValid = false;

  // Password length
  if (password_signup.value.trim().length < 8) {
    showError(password_signup, "Password must be at least 8 characters");
    isValid = false;
  }

  // Match passwords
  if (password_signup.value !== confirmPassword.value) {
    showError(confirmPassword, "Passwords do not match");
    isValid = false;
  } else if (confirmPassword.value.trim().length > 0) {
    showSuccess(confirmPassword);
  }

  if (!isValid) return;

  // Load existing users
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the nurse already exists
  const exists = users.some(
    (user) =>
      user.nurseId === nurseId_signup.value &&
      user.hospitalCode === hospitalCode_signup.value
  );

  if (exists) {
    alert("Account already exists for this Nurse ID + Hospital Code.");
    return;
  }

  // Create new user object
  const newUser = {
    fullName: fullName_signup.value.trim(),
    nurseId: nurseId_signup.value.trim(),
    hospitalCode: hospitalCode_signup.value.trim(),
    email: email_signup.value.trim(),
    phone: phone.value.trim(),
    password: password_signup.value.trim(),
  };

  // Save to localStorage
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Success message
  alert(
    "Account Created Successfully!\n\n" +
      "Welcome, " +
      newUser.fullName +
      "!\n" +
      "Nurse ID: " +
      newUser.nurseId +
      "\n" +
      "Hospital Code: " +
      newUser.hospitalCode
  );

  // Switch to sign-in form (your UI function)
  if (typeof toggleForm === "function") {
    toggleForm();
  }
}
