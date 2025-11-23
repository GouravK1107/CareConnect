// Page Navigation
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page-content").forEach((page) => {
    page.classList.remove("active");
  });

  // Show selected page
  document.getElementById(`${pageId}-page`).classList.add("active");

  // Update active menu item
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Find and activate the corresponding menu item
  const menuItems = document.querySelectorAll(".menu-item");
  for (let item of menuItems) {
    if (item.textContent.includes(getPageTitle(pageId))) {
      item.classList.add("active");
      break;
    }
  }

  // Update page title and subtitle
  document.getElementById("pageTitle").textContent = getPageTitle(pageId);
  document.getElementById("pageSubtitle").textContent = getPageSubtitle(pageId);

  // Close mobile sidebar if open
  closeMobileSidebar();
}

function getPageTitle(pageId) {
  const titles = {
    dashboard: "Dashboard",
    chatbot: "AI Health Assistant",
    appointments: "My Appointments",
    medications: "Medications",
    reports: "Medical Reports",
    notifications: "Notifications",
    profile: "My Profile",
  };
  return titles[pageId] || "CareConnect";
}

function getPageSubtitle(pageId) {
  const subtitles = {
    dashboard: "Welcome back, John! Here's your health overview.",
    chatbot: "Get instant answers to your health questions",
    appointments: "Manage your upcoming medical appointments",
    medications: "View and manage your medications",
    reports: "Access your medical test results and reports",
    notifications: "Stay updated with important health alerts",
    profile: "View and manage your personal information",
  };
  return subtitles[pageId] || "";
}

// Mobile Sidebar Toggle
document
  .getElementById("mobileMenuBtn")
  .addEventListener("click", toggleMobileSidebar);
document
  .getElementById("sidebarOverlay")
  .addEventListener("click", closeMobileSidebar);
document
  .getElementById("closeSidebar")
  .addEventListener("click", closeMobileSidebar);

function toggleMobileSidebar() {
  document.getElementById("sidebar").classList.add("mobile-open");
  document.getElementById("sidebarOverlay").classList.add("active");

  // hide the button ONLY by adding a class (NOT display: none)
  document.getElementById("mobileMenuBtn").classList.add("hide-btn");
}

function closeMobileSidebar() {
  document.getElementById("sidebar").classList.remove("mobile-open");
  document.getElementById("sidebarOverlay").classList.remove("active");

  // show the button ONLY by removing the class
  document.getElementById("mobileMenuBtn").classList.remove("hide-btn");
}

// Call Selection Modal
function openCallSelectionModal() {
  document.getElementById("callSelectionModal").classList.add("active");
}

function closeCallSelectionModal() {
  document.getElementById("callSelectionModal").classList.remove("active");
}

function closeCallSelectionModal() {
  document.getElementById("callSelectionModal").classList.remove("active");
}

// Video Call Functionality
let videoCallTimerInterval;
let videoCallSeconds = 0;

function startVideoCall() {
  closeCallSelectionModal();
  document.getElementById("videoCallModal").classList.add("active");
  // Start call timer
  videoCallSeconds = 0;
  videoCallTimerInterval = setInterval(updateVideoCallTimer, 1000);
}

function endVideoCall() {
  document.getElementById("videoCallModal").classList.remove("active");
  // Stop call timer
  clearInterval(videoCallTimerInterval);
  showToast("Video call ended successfully");
}

function updateVideoCallTimer() {
  videoCallSeconds++;
  const minutes = Math.floor(videoCallSeconds / 60);
  const seconds = videoCallSeconds % 60;
  document.getElementById("videoCallTimer").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Voice Call Functionality
let voiceCallTimerInterval;
let voiceCallSeconds = 0;

function startVoiceCall() {
  closeCallSelectionModal();
  document.getElementById("voiceCallModal").classList.add("active");
  // Start call timer
  voiceCallSeconds = 0;
  voiceCallTimerInterval = setInterval(updateVoiceCallTimer, 1000);
}

function endVoiceCall() {
  document.getElementById("voiceCallModal").classList.remove("active");
  // Stop call timer
  clearInterval(voiceCallTimerInterval);
  showToast("Voice call ended successfully");
}

function updateVoiceCallTimer() {
  voiceCallSeconds++;
  const minutes = Math.floor(voiceCallSeconds / 60);
  const seconds = voiceCallSeconds % 60;
  document.getElementById("voiceCallTimer").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function addSymptom() {
  showToast("Symptom added to your medical record");
}

// Button Actions
function bookAppointment() {
  showToast("Appointment booking page opened");
  // In a real app, this would open a booking form
}

function viewAppointmentDetails() {
  showToast("Appointment details opened");
  // In a real app, this would show detailed appointment info
}

function addMedication() {
  showToast("Add medication form opened");
  // In a real app, this would open a medication form
}

function viewMedicationDetails() {
  showToast("Medication details opened");
  // In a real app, this would show detailed medication info
}

function requestReport() {
  showToast("Report request submitted");
  // In a real app, this would submit a report request
}

function viewReport() {
  showToast("Medical report opened");
  // In a real app, this would open the actual report
}

function markAllAsRead() {
  document.querySelectorAll(".notification-badge").forEach((badge) => {
    badge.style.display = "none";
  });
  showToast("All notifications marked as read");
}

function viewNotification() {
  showToast("Notification details opened");
  // In a real app, this would show notification details
}

function editProfile() {
  showToast("Profile edit mode activated");
  // In a real app, this would enable profile editing
}

// Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  toastMessage.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Chat Functionality
document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("chatInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();

  if (message === "") return;

  // Add user message
  addMessage("user", message, "chatMessages");
  input.value = "";

  // Show typing indicator
  const typingIndicator = document.getElementById("typingIndicator");
  typingIndicator.classList.add("active");

  // Scroll to bottom
  scrollToBottom("chatMessages");

  // Simulate AI response after delay
  setTimeout(() => {
    typingIndicator.classList.remove("active");
    const response = getAIResponse(message);
    addMessage("bot", response, "chatMessages");
    scrollToBottom("chatMessages");
  }, 1500);
}

function addMessage(sender, text, containerId) {
  const container = document.getElementById(containerId);
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;

  const avatar = sender === "user" ? "You" : sender === "bot" ? "AI" : "DR";

  messageDiv.innerHTML = `
                <div class="message-avatar">${avatar}</div>
                <div class="message-content">
                    <div class="message-bubble">${text}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            `;

  container.appendChild(messageDiv);
}

function scrollToBottom(containerId) {
  const container = document.getElementById(containerId);
  container.scrollTop = container.scrollHeight;
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// AI Response Data
function getAIResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("headache")) {
    return "Headaches can have various causes. Common ones include tension, dehydration, or eye strain. Make sure you're drinking enough water and taking breaks from screens. If the headache is severe or persistent, it's best to consult with a healthcare provider.";
  } else if (
    lowerMessage.includes("fever") ||
    lowerMessage.includes("temperature")
  ) {
    return "A fever is usually a sign that your body is fighting an infection. Make sure to rest, stay hydrated, and monitor your temperature. If it's above 102°F (39°C) or lasts more than 3 days, you should see a doctor.";
  } else if (lowerMessage.includes("cold") || lowerMessage.includes("flu")) {
    return "For cold or flu symptoms, rest and hydration are key. You can try over-the-counter remedies for symptom relief. If you have difficulty breathing, chest pain, or symptoms worsen after a week, seek medical attention.";
  } else if (
    lowerMessage.includes("blood pressure") ||
    lowerMessage.includes("bp")
  ) {
    return "Normal blood pressure is typically around 120/80 mmHg. If your readings are consistently high or low, it's important to discuss this with your doctor as it may require medication or lifestyle changes.";
  } else if (
    lowerMessage.includes("sleep") ||
    lowerMessage.includes("insomnia")
  ) {
    return "Good sleep hygiene includes maintaining a consistent sleep schedule, avoiding screens before bed, and creating a comfortable sleep environment. Adults typically need 7-9 hours of sleep per night.";
  } else if (
    lowerMessage.includes("diet") ||
    lowerMessage.includes("nutrition")
  ) {
    return "A balanced diet with plenty of fruits, vegetables, lean proteins, and whole grains is important for overall health. Limit processed foods, sugar, and saturated fats. If you have specific dietary concerns, a nutritionist can provide personalized advice.";
  } else if (
    lowerMessage.includes("exercise") ||
    lowerMessage.includes("workout")
  ) {
    return "The American Heart Association recommends at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening activities at least 2 days per week.";
  } else {
    const responses = [
      "I understand you're asking about health concerns. For personalized medical advice, it's always best to consult with a healthcare professional who can evaluate your specific situation.",
      "That's an important health question. While I can provide general information, please remember that I'm an AI assistant and not a substitute for professional medical advice.",
      "Thank you for sharing your health concern. For accurate diagnosis and treatment, I recommend scheduling an appointment with your healthcare provider.",
      "I'd be happy to help with general health information. However, for specific medical concerns, it's important to consult with a qualified healthcare professional.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

// Initialize the dashboard
document.addEventListener("DOMContentLoaded", function () {
  showPage("dashboard");
});


// Toggle Manager for Patient Dashboard
class PatientToggleManager {
    constructor() {
        this.init();
    }

    init() {
        this.initAllToggles();
        this.loadToggleStates();
    }

    initAllToggles() {
        // Initialize all toggle switches EXCEPT dark mode
        const toggles = document.querySelectorAll('.toggle-switch:not(.dark-mode-toggle)');
        toggles.forEach(toggle => {
            // Remove any existing onclick handlers
            toggle.removeAttribute('onclick');
            
            // Add event listener
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleToggleClick(toggle);
            });
        });

        // Initialize dark mode toggle separately
        this.initDarkModeToggle();
    }

    initDarkModeToggle() {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        if (darkModeToggle) {
            // Remove any existing event listeners
            const newToggle = darkModeToggle.cloneNode(true);
            darkModeToggle.parentNode.replaceChild(newToggle, darkModeToggle);
            
            // Set initial state
            this.updateDarkModeToggle();
            
            // Add click event listener
            newToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                if (window.patientDarkModeManager) {
                    window.patientDarkModeManager.toggle();
                    // Update the toggle state after dark mode change
                    setTimeout(() => {
                        const isDark = localStorage.getItem('patientDarkMode') === 'true';
                        this.updateToggleState(newToggle, isDark);
                    }, 100);
                }
            });
        }
    }

    handleToggleClick(toggle) {
        // Don't handle dark mode toggle here
        if (toggle.classList.contains('dark-mode-toggle')) {
            return;
        }

        const isActive = toggle.classList.contains('active');
        const newState = !isActive;
        
        // Update visual state
        this.updateToggleState(toggle, newState);
        
        // Handle the toggle action
        this.handleToggleAction(toggle, newState);
    }

    handleToggleAction(toggle, state) {
        const toggleType = Array.from(toggle.classList).find(cls => 
            cls.includes('-toggle') && cls !== 'toggle-switch' && cls !== 'toggle-slider'
        ) || 'default';
        
        const messages = {
            'appointment-toggle': state ? 'Appointment reminders enabled' : 'Appointment reminders disabled',
            'medication-toggle': state ? 'Medication alerts enabled' : 'Medication alerts disabled',
            'healthtips-toggle': state ? 'Health tips enabled' : 'Health tips disabled',
            'twofactor-toggle': state ? 'Two-factor authentication enabled' : 'Two-factor authentication disabled',
            'datasharing-toggle': state ? 'Data sharing enabled' : 'Data sharing disabled',
            'largetext-toggle': state ? 'Large text enabled' : 'Large text disabled',
            'default': state ? 'Setting enabled' : 'Setting disabled'
        };
        
        const message = messages[toggleType] || messages.default;
        
        // Show notification
        this.showNotification(message);
        
        // Save toggle state
        this.saveToggleState(toggleType, state);
    }

    updateToggleState(toggle, isActive) {
        if (isActive) {
            toggle.classList.add('active');
        } else {
            toggle.classList.remove('active');
        }
    }

    updateDarkModeToggle() {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        if (darkModeToggle) {
            const isDarkMode = localStorage.getItem('patientDarkMode') === 'true';
            this.updateToggleState(darkModeToggle, isDarkMode);
        }
    }

    saveToggleState(toggleType, state) {
        try {
            const toggleStates = JSON.parse(localStorage.getItem('patientToggleStates') || '{}');
            toggleStates[toggleType] = state;
            localStorage.setItem('patientToggleStates', JSON.stringify(toggleStates));
        } catch (error) {
            console.error('Error saving toggle state:', error);
        }
    }

    loadToggleStates() {
        try {
            const toggleStates = JSON.parse(localStorage.getItem('patientToggleStates') || '{}');
            Object.keys(toggleStates).forEach(toggleType => {
                const toggle = document.querySelector(`.${toggleType}`);
                if (toggle && !toggle.classList.contains('dark-mode-toggle')) {
                    this.updateToggleState(toggle, toggleStates[toggleType]);
                }
            });
        } catch (error) {
            console.error('Error loading toggle states:', error);
        }
    }

    showNotification(message) {
        // Use the existing toast notification system
        showToast(message, 'success');
    }
}

// Dark Mode Manager for Patient Dashboard
// Dark Mode Manager for Patient Dashboard
class PatientDarkModeManager {
    constructor() {
        this.isDarkMode = localStorage.getItem('patientDarkMode') === 'true';
        this.init();
    }

    init() {
        this.applyTheme();
        this.initDarkModeToggle();
    }

    initDarkModeToggle() {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        if (darkModeToggle) {
            // Set initial state
            this.updateDarkModeToggle();
            
            // Add click event listener
            darkModeToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });
        }
    }

    applyTheme() {
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        
        this.updateDarkModeToggle();
    }

    updateDarkModeToggle() {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        if (darkModeToggle) {
            if (this.isDarkMode) {
                darkModeToggle.classList.add('active');
            } else {
                darkModeToggle.classList.remove('active');
            }
        }
    }

    toggle() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('patientDarkMode', this.isDarkMode);
        this.applyTheme();
        
        // Show notification
        this.showNotification(this.isDarkMode ? 
            'Dark mode enabled' : 'Light mode enabled');
    }

    showNotification(message) {
        // Use existing toast system
        if (typeof showToast === 'function') {
            showToast(message, 'info');
        } else {
            console.log('Notification:', message);
        }
    }
}

// Initialize dark mode when DOM is loaded
let patientDarkModeManager;

document.addEventListener('DOMContentLoaded', function() {
    patientDarkModeManager = new PatientDarkModeManager();
});