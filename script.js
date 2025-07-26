// Bengali Shirt Store JavaScript

// Countdown Timer Functionality
class CountdownTimer {
  constructor() {
    this.targetDate = this.calculateTargetDate();
    this.elements = {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      minutes: document.getElementById("minutes"),
      seconds: document.getElementById("seconds"),
    };
    this.init();
  }

  calculateTargetDate() {
    const now = new Date().getTime();
    return (
      now +
      24 * 60 * 60 * 1000 +
      23 * 60 * 60 * 1000 +
      59 * 60 * 1000 +
      54 * 1000
    );
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance < 0) {
      this.displayZeros();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.elements.days.textContent = days.toString().padStart(2, "0");
    this.elements.hours.textContent = hours.toString().padStart(2, "0");
    this.elements.minutes.textContent = minutes.toString().padStart(2, "0");
    this.elements.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  displayZeros() {
    Object.values(this.elements).forEach((element) => {
      element.textContent = "00";
    });
  }

  init() {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
  }
}

// Reviews Carousel Handler
class ReviewsCarousel {
  constructor() {
    this.carousel = document.getElementById("reviewsCarousel");
    this.autoScrollInterval = null;
    this.init();
  }

  init() {
    if (!this.carousel) return;

    this.startAutoScroll();
    this.setupEventListeners();
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      this.scrollRight();

      // Reset to beginning if at the end
      if (
        this.carousel.scrollLeft >=
        this.carousel.scrollWidth - this.carousel.clientWidth
      ) {
        setTimeout(() => {
          this.carousel.scrollTo({ left: 0, behavior: "smooth" });
        }, 2000);
      }
    }, 4000);
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  setupEventListeners() {
    // Pause auto-scroll on hover
    this.carousel.addEventListener("mouseenter", () => {
      this.stopAutoScroll();
    });

    // Resume auto-scroll when not hovering
    this.carousel.addEventListener("mouseleave", () => {
      this.startAutoScroll();
    });

    // Touch events for mobile
    let startX = 0;
    let scrollLeft = 0;

    this.carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX - this.carousel.offsetLeft;
      scrollLeft = this.carousel.scrollLeft;
      this.stopAutoScroll();
    });

    this.carousel.addEventListener("touchend", () => {
      this.startAutoScroll();
    });

    this.carousel.addEventListener("touchmove", (e) => {
      if (!startX) return;
      e.preventDefault();
      const x = e.touches[0].pageX - this.carousel.offsetLeft;
      const walk = (x - startX) * 2;
      this.carousel.scrollLeft = scrollLeft - walk;
    });
  }

  scrollLeft() {
    const scrollAmount = 280;
    this.carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }

  scrollRight() {
    const scrollAmount = 280;
    this.carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}

// Form Handler Class
class OrderFormHandler {
  constructor() {
    this.form = document.getElementById("orderForm");
    this.orderButtons = document.querySelectorAll(".order-btn");
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.orderButtons.forEach((button) => {
      button.addEventListener("click", () => this.scrollToForm());
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = this.getFormData();

    if (this.validateForm(formData)) {
      this.showLoading();
      this.simulateOrderSubmission(formData);
    }
  }

  getFormData() {
    return {
      name: document.getElementById("customerName")?.value.trim() || "",
      phone: document.getElementById("phoneNumber")?.value.trim() || "",
      address: document.getElementById("address")?.value.trim() || "",
      size: document.querySelector('input[name="size"]:checked')?.value || "",
      shipping:
        document.querySelector('input[name="shipping"]:checked')?.value ||
        "dhaka",
    };
  }

  validateForm(data) {
    const errors = [];

    if (!data.name) errors.push("নাম প্রয়োজন");
    if (!data.phone) errors.push("মোবাইল নাম্বার প্রয়োজন");
    if (!data.address) errors.push("ঠিকানা প্রয়োজন");
    if (!data.size) errors.push("সাইজ নির্বাচন করুন");

    if (data.phone && !this.isValidPhoneNumber(data.phone)) {
      errors.push("সঠিক ১১ সংখ্যার মোবাইল নাম্বার দিন");
    }

    if (errors.length > 0) {
      alert("ত্রুটি:\n" + errors.join("\n"));
      return false;
    }

    return true;
  }

  isValidPhoneNumber(phone) {
    const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  }

  showLoading() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.classList.add("loading");
      submitButton.textContent = "অর্ডার প্রক্রিয়াকরণ...";
    }
  }

  hideLoading() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.classList.remove("loading");
      submitButton.textContent = "🔒 কনফার্ম অর্ডার ৳ ১,৬০০";
    }
  }

  simulateOrderSubmission(formData) {
    setTimeout(() => {
      this.hideLoading();
      this.showSuccessMessage(formData);
      this.resetForm();
    }, 2000);
  }

  showSuccessMessage(formData) {
    const message = `
অর্ডার সফলভাবে জমা দেওয়া হয়েছে! 🎉

অর্ডারের বিবরণ:
নাম: ${formData.name}
ফোন: ${formData.phone}
সাইজ: ${formData.size}
শিপিং: ${formData.shipping === "dhaka" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"}

আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
ধন্যবাদ!
        `;
    alert(message);
  }

  resetForm() {
    this.form.reset();
  }

  scrollToForm() {
    const checkoutSection = document.querySelector(".bg-green-50");
    if (checkoutSection) {
      checkoutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
}

// Checkout Manager Class
class CheckoutManager {
  constructor() {
    this.form = document.getElementById("orderForm");
    this.totalAmountElement = document.getElementById("totalAmount");
    this.basePrice = 1470;
    this.shippingRates = {
      dhaka: 130,
      outside: 70,
    };
    this.init();
  }

  init() {
    if (!this.form) return;

    this.setupEventListeners();
    this.updateTotal();
  }

  setupEventListeners() {
    // Shipping option change
    const shippingInputs = document.querySelectorAll('input[name="shipping"]');
    shippingInputs.forEach((input) => {
      input.addEventListener("change", () => this.updateTotal());
    });

    // Real-time validation
    const inputs = this.form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearError(input));
    });
  }

  updateTotal() {
    const selectedShipping = document.querySelector(
      'input[name="shipping"]:checked'
    );
    const shippingCost = selectedShipping
      ? this.shippingRates[selectedShipping.value]
      : this.shippingRates.dhaka;
    const total = this.basePrice + shippingCost;

    if (this.totalAmountElement) {
      this.totalAmountElement.textContent = `৳ ${this.formatBengaliNumber(
        total
      )}`;
    }

    // Update button text
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton && !submitButton.classList.contains("loading")) {
      submitButton.textContent = `🔒 কনফার্ম অর্ডার ৳ ${this.formatBengaliNumber(
        total
      )}`;
    }
  }

  formatBengaliNumber(number) {
    return number.toLocaleString("bn-BD");
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    // Clear previous errors
    this.clearError(field);

    // Validation rules
    switch (field.id) {
      case "customerName":
        if (!value) {
          errorMessage = "নাম প্রয়োজন";
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
          isValid = false;
        }
        break;

      case "phoneNumber":
        if (!value) {
          errorMessage = "মোবাইল নম্বর প্রয়োজন";
          isValid = false;
        } else if (!this.isValidPhoneNumber(value)) {
          errorMessage = "সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন";
          isValid = false;
        }
        break;

      case "address":
        if (!value) {
          errorMessage = "ঠিকানা প্রয়োজন";
          isValid = false;
        } else if (value.length < 10) {
          errorMessage = "সম্পূর্ণ ঠিকানা দিন";
          isValid = false;
        }
        break;
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    }

    return isValid;
  }

  isValidPhoneNumber(phone) {
    const cleanPhone = phone.replace(/\s/g, "");
    const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;
    return phoneRegex.test(cleanPhone);
  }

  showError(field, message) {
    field.classList.add("error");

    // Remove existing error message
    const existingError = field.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    // Add new error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }

  clearError(field) {
    field.classList.remove("error");
    const errorMessage = field.parentNode.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  }
}

// Utility Functions
const Utils = {
  // Smooth scroll to top
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },

  // Format Bengali numbers
  formatBengaliNumber(number) {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
  },

  // Local storage helpers
  saveToLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  getFromLocalStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;

      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
};

// Analytics and Tracking
class OrderAnalytics {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
  }

  generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  track(eventName, data = {}) {
    const event = {
      name: eventName,
      data: data,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
    };

    this.events.push(event);
    console.log("Analytics Event:", event);

    // Here you would send to your analytics service
    // this.sendToAnalytics(event);
  }

  trackPageView() {
    this.track("page_view", {
      referrer: document.referrer,
      title: document.title,
    });
  }

  trackFieldFocus(fieldName) {
    this.track("field_focus", { field: fieldName });
  }

  trackSizeSelection(size) {
    this.track("size_selected", { size: size });
  }

  trackShippingSelection(shipping) {
    this.track("shipping_selected", { shipping: shipping });
  }

  trackOrderAttempt(formData) {
    this.track("order_attempt", {
      size: formData.size,
      shipping: formData.shipping,
      hasValidPhone: this.isValidPhone(formData.phone),
    });
  }

  trackOrderSuccess(formData) {
    this.track("order_success", {
      size: formData.size,
      shipping: formData.shipping,
    });
  }

  trackReviewsCarouselInteraction(action) {
    this.track("reviews_carousel", { action: action });
  }

  isValidPhone(phone) {
    const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  }
}

// Global function for reviews carousel navigation
function scrollReviews(direction) {
  const carousel = document.getElementById("reviewsCarousel");
  if (!carousel) return;

  const scrollAmount = 280; // Width of one review card plus gap

  if (direction === "left") {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }

  // Track interaction
  if (window.analytics) {
    window.analytics.trackReviewsCarouselInteraction(direction);
  }
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  const countdownTimer = new CountdownTimer();
  const reviewsCarousel = new ReviewsCarousel();
  const orderFormHandler = new OrderFormHandler();
  const checkoutManager = new CheckoutManager();

  // Initialize analytics
  window.analytics = new OrderAnalytics();
  window.analytics.trackPageView();

  // Track form interactions
  document.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("focus", () => {
      window.analytics.trackFieldFocus(field.id || field.name);
    });
  });

  // Track size selection
  document.querySelectorAll('input[name="size"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      window.analytics.trackSizeSelection(radio.value);
    });
  });

  // Track shipping selection
  document.querySelectorAll('input[name="shipping"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      window.analytics.trackShippingSelection(radio.value);
    });
  });

  // Add scroll to top functionality
  const scrollToTopButton = document.createElement("button");
  scrollToTopButton.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
  <path d="m12 6.414 7.293 7.293 1.414-1.414L12 3.586l-8.707 8.707 1.414 1.414L12 6.414z"/>
  <path d="m3.293 18.293 1.414 1.414L12 12.414l7.293 7.293 1.414-1.414L12 9.586l-8.707 8.707z"/>
</svg>
`;

  scrollToTopButton.className =
    "fixed bottom-4 right-4 bg-[#ef4444] text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50 hidden";
  scrollToTopButton.setAttribute("aria-label", "Scroll to top");
  scrollToTopButton.onclick = Utils.scrollToTop;
  document.body.appendChild(scrollToTopButton);

  // Show/hide scroll to top button with throttling
  const throttledScroll = Utils.throttle(() => {
    if (window.pageYOffset > 300) {
      scrollToTopButton.classList.remove("hidden");
    } else {
      scrollToTopButton.classList.add("hidden");
    }
  }, 100);

  window.addEventListener("scroll", throttledScroll);

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Close any modals or reset form focus
      document.activeElement.blur();
    }

    // Arrow key navigation for reviews carousel
    if (e.key === "ArrowLeft" && e.target.id === "reviewsCarousel") {
      scrollReviews("left");
    } else if (e.key === "ArrowRight" && e.target.id === "reviewsCarousel") {
      scrollReviews("right");
    }
  });

  // Performance monitoring
  window.addEventListener("load", () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    window.analytics.track("page_load_time", { loadTime: loadTime });
  });

  // Add smooth scrolling enhancement for mobile
  if (window.innerWidth <= 768) {
    const form = document.getElementById("orderForm");
    if (form) {
      const inputs = form.querySelectorAll("input, textarea");

      inputs.forEach((input) => {
        input.addEventListener("focus", () => {
          setTimeout(() => {
            input.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 300);
        });
      });
    }
  }

  // Add error handling for images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      this.src = "/placeholder.svg?height=200&width=200";
      this.alt = "ছবি লোড হচ্ছে না";
    });
  });

  // Add connection status indicator
  window.addEventListener("online", () => {
    console.log("Connection restored");
  });

  window.addEventListener("offline", () => {
    console.log("Connection lost");
    alert("ইন্টারনেট সংযোগ নেই। অনুগ্রহ করে আপনার সংযোগ চেক করুন।");
  });

  // Save form data to prevent loss
  const form = document.getElementById("orderForm");
  if (form) {
    const saveFormData = Utils.debounce(() => {
      const formData = {
        name: document.getElementById("customerName")?.value || "",
        phone: document.getElementById("phoneNumber")?.value || "",
        address: document.getElementById("address")?.value || "",
      };
      Utils.saveToLocalStorage("formData", formData);
    }, 1000);

    // Save on input
    form.addEventListener("input", saveFormData);

    // Restore form data on page load
    const savedData = Utils.getFromLocalStorage("formData");
    if (savedData) {
      const nameField = document.getElementById("customerName");
      const phoneField = document.getElementById("phoneNumber");
      const addressField = document.getElementById("address");

      if (nameField && savedData.name) nameField.value = savedData.name;
      if (phoneField && savedData.phone) phoneField.value = savedData.phone;
      if (addressField && savedData.address)
        addressField.value = savedData.address;
    }

    // Clear saved data on successful submission
    form.addEventListener("submit", () => {
      Utils.saveToLocalStorage("formData", null);
    });
  }
});

// Export for potential module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CountdownTimer,
    ReviewsCarousel,
    OrderFormHandler,
    CheckoutManager,
    Utils,
    OrderAnalytics,
  };
}
