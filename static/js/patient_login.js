// patient_login.js
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

// Setup blur validation for inputs
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("blur", function (e) {
    if (e.target.value) {
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

  if (input.id === "signInPatientId" && value.length < 2) {
    showError(input, "Valid Patient ID is required");
    return false;
  }

  showSuccess(input);
  return true;
}

function handleSignIn(event) {
  event.preventDefault();

  const patientId = document.getElementById("signInPatientId");
  const password = document.getElementById("signInPassword");

  let isValid = true;

  // Validate Patient ID
  if (patientId.value.trim() === "") {
    showError(patientId, "Patient ID is required");
    isValid = false;
  }

  // Validate Password
  if (password.value.trim() === "") {
    showError(password, "Password is required");
    isValid = false;
  }

  if (!isValid) return;

  // For demo purposes - just show success message
  // In a real application, this would connect to a backend API
  alert(
    "Sign In Successful!\n" +
      "Patient ID: " + patientId.value + "\n" +
      "Redirecting to patient dashboard..."
  );

  // Redirect to patient dashboard (you can change this URL)
  window.location.href = "patient_dashboard.html";
}