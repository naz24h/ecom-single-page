// Countdown Timer with more accurate timing
function initCountdown() {
  // Set target date - 24 hours from now
  const now = new Date();
  const targetDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  function updateTimer() {
    const currentTime = new Date().getTime();
    const timeLeft = targetDate.getTime() - currentTime;

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Update display with leading zeros
      document.getElementById("days").textContent = days
        .toString()
        .padStart(2, "0");
      document.getElementById("hours").textContent = hours
        .toString()
        .padStart(2, "0");
      document.getElementById("minutes").textContent = minutes
        .toString()
        .padStart(2, "0");
      document.getElementById("seconds").textContent = seconds
        .toString()
        .padStart(2, "0");
    } else {
      // Timer expired
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
    }
  }

  // Update immediately and then every second
  updateTimer();
  setInterval(updateTimer, 1000);
}

// Enhanced Review Slider
let slideIndex = 1;
const totalSlides = 6;

function showSlides(n) {
  const slider = document.getElementById("reviewSlider");
  const dots = document.querySelectorAll(".dot");

  if (n > totalSlides) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = totalSlides;
  }

  // Calculate transform based on slide index
  const translateX = -(slideIndex - 1) * (200 + 15); // image width + gap
  slider.style.transform = `translateX(${translateX}px)`;

  // Update dots
  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add("active");
  }
}

function changeSlide(n) {
  slideIndex += n;
  showSlides(slideIndex);
}

function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

// Auto-slide functionality
function autoSlide() {
  slideIndex++;
  showSlides(slideIndex);
}

// Quantity Control
function initQuantityControls() {
  const decreaseBtn = document.querySelector(".qty-decrease");
  const increaseBtn = document.querySelector(".qty-increase");
  const qtyInput = document.querySelector(".qty-number");

  if (decreaseBtn && increaseBtn && qtyInput) {
    decreaseBtn.addEventListener("click", function () {
      let currentValue = parseInt(qtyInput.value);
      if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
        updateOrderSummary();
      }
    });

    increaseBtn.addEventListener("click", function () {
      let currentValue = parseInt(qtyInput.value);
      qtyInput.value = currentValue + 1;
      updateOrderSummary();
    });

    qtyInput.addEventListener("change", function () {
      let value = parseInt(this.value);
      if (isNaN(value) || value < 1) {
        this.value = 1;
      }
      updateOrderSummary();
    });
  }
}

// Update Order Summary
function updateOrderSummary() {
  const quantity = parseInt(document.querySelector(".qty-number").value) || 1;
  const unitPrice = 1250;
  const shippingCost = 60;

  const subtotal = unitPrice * quantity;
  const total = subtotal + shippingCost;

  // Update subtotal
  const subtotalElement = document.querySelector(".subtotal-amount");
  if (subtotalElement) {
    subtotalElement.textContent = `৳${subtotal.toLocaleString()}`;
  }

  // Update total
  const totalElement = document.querySelector(".total-amount");
  if (totalElement) {
    totalElement.textContent = `৳${total.toLocaleString()}`;
  }

  // Update item price if quantity > 1
  const itemPriceElement = document.querySelector(".item-price");
  if (itemPriceElement) {
    itemPriceElement.textContent = `৳${subtotal.toLocaleString()}`;
  }
}

// Smooth Scroll to Order Form
function initOrderButtons() {
  const orderButtons = document.querySelectorAll(".order-now-btn");
  const orderForm = document.querySelector(".order-form-wrapper");

  orderButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      if (orderForm) {
        orderForm.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Add a subtle animation to the form
        orderForm.style.transform = "scale(1.02)";
        setTimeout(() => {
          orderForm.style.transform = "scale(1)";
        }, 200);
      }
    });
  });
}

// Form Validation
function initFormValidation() {
  const completeOrderBtn = document.querySelector(".complete-order-btn");
  const form = document.querySelector(".checkout-form");

  if (completeOrderBtn && form) {
    completeOrderBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const requiredFields = form.querySelectorAll("[required]");
      let isValid = true;
      let firstInvalidField = null;

      // Reset previous error states
      requiredFields.forEach((field) => {
        field.style.borderColor = "#ced4da";
      });

      // Validate each required field
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          field.style.borderColor = "#dc3545";
          field.style.boxShadow = "0 0 0 0.2rem rgba(220,53,69,.25)";
          isValid = false;

          if (!firstInvalidField) {
            firstInvalidField = field;
          }
        }
      });

      if (isValid) {
        // Show success message
        showSuccessMessage();
      } else {
        // Focus on first invalid field
        if (firstInvalidField) {
          firstInvalidField.focus();
          firstInvalidField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        // Show error message
        showErrorMessage("দয়া করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।");
      }
    });
  }
}

// Success Message
function showSuccessMessage() {
  const message = document.createElement("div");
  message.className = "success-message";
  message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #28a745;
            color: white;
            padding: 20px 30px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            text-align: center;
            font-size: 16px;
            font-weight: 600;
        ">
            ✅ অর্ডার সফলভাবে সম্পন্ন হয়েছে!<br>
            <small style="font-size: 14px; opacity: 0.9;">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</small>
        </div>
    `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 4000);
}

// Error Message
function showErrorMessage(text) {
  const message = document.createElement("div");
  message.className = "error-message";
  message.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 15px 20px;
            border-radius: 6px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            z-index: 1000;
            font-size: 14px;
            font-weight: 500;
        ">
            ❌ ${text}
        </div>
    `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 3000);
}

// Button Click Animations
function initButtonAnimations() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });
}

// Touch/Swipe support for mobile slider
function initTouchSupport() {
  const slider = document.querySelector(".review-images-container");
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  if (slider) {
    slider.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    slider.addEventListener("touchmove", function (e) {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", function (e) {
      if (!isDragging) return;
      isDragging = false;

      const diffX = startX - currentX;

      if (Math.abs(diffX) > 50) {
        // Minimum swipe distance
        if (diffX > 0) {
          changeSlide(1); // Swipe left - next slide
        } else {
          changeSlide(-1); // Swipe right - previous slide
        }
      }
    });
  }
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initCountdown();
  initQuantityControls();
  initOrderButtons();
  initFormValidation();
  initButtonAnimations();
  initTouchSupport();

  // Initialize slider
  showSlides(slideIndex);

  // Auto-slide every 4 seconds
  setInterval(autoSlide, 4000);

  // Initial order summary update
  updateOrderSummary();

  console.log("🚀 Page initialized successfully!");
});

// Handle window resize for responsive adjustments
window.addEventListener("resize", function () {
  // Recalculate slider position on resize
  showSlides(slideIndex);
});
