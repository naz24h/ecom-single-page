// Countdown Timer
function updateCountdown() {
  const now = new Date().getTime();
  const targetDate =
    now +
    1 * 24 * 60 * 60 * 1000 +
    23 * 60 * 60 * 1000 +
    55 * 60 * 1000 +
    6 * 1000;

  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

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

  if (distance < 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Reviews Carousel Scroll
function scrollReviews(direction) {
  const carousel = document.getElementById("reviewsCarousel");
  const scrollAmount = 280; // Width of one review card plus gap

  if (direction === "left") {
    carousel.scrollLeft -= scrollAmount;
  } else {
    carousel.scrollLeft += scrollAmount;
  }
}

// Update total amount based on shipping selection
function updateTotal() {
  const shippingInputs = document.querySelectorAll('input[name="shipping"]');
  const totalElement = document.getElementById("totalAmount");
  const basePrice = 1470;

  let shippingCost = 130; // Default Dhaka shipping

  shippingInputs.forEach((input) => {
    if (input.checked) {
      shippingCost = input.value === "dhaka" ? 130 : 70;
    }
  });

  const total = basePrice + shippingCost;
  totalElement.textContent = `৳ ${total.toLocaleString()}`;

  // Update button text
  const submitButton = document.querySelector(".confirm-order-btn");
  if (submitButton) {
    submitButton.textContent = `🔒 কনফার্ম অর্ডার ৳ ${total.toLocaleString()}`;
  }
}

// Add event listeners for shipping options
document.addEventListener("DOMContentLoaded", () => {
  const shippingInputs = document.querySelectorAll('input[name="shipping"]');
  shippingInputs.forEach((input) => {
    input.addEventListener("change", updateTotal);
  });

  // Initial total calculation
  updateTotal();

  // Form submission
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(orderForm);
      const orderData = {
        name:
          formData.get("customerName") ||
          document.getElementById("customerName").value,
        phone:
          formData.get("phoneNumber") ||
          document.getElementById("phoneNumber").value,
        address:
          formData.get("address") || document.getElementById("address").value,
        size: formData.get("size"),
        shipping: formData.get("shipping"),
      };

      // Basic validation
      if (
        !orderData.name ||
        !orderData.phone ||
        !orderData.address ||
        !orderData.size
      ) {
        alert("দয়া করে সকল তথ্য পূরণ করুন");
        return;
      }

      // Phone number validation (11 digits)
      if (!/^\d{11}$/.test(orderData.phone)) {
        alert("দয়া করে ১১ সংখ্যার সঠিক মোবাইল নম্বর দিন");
        return;
      }

      // Show loading state
      const submitButton = document.querySelector(".confirm-order-btn");
      const originalText = submitButton.textContent;
      submitButton.classList.add("loading");
      submitButton.disabled = true;
      submitButton.textContent = "অর্ডার প্রসেসিং...";

      // Simulate order processing
      setTimeout(() => {
        alert(
          "আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।"
        );

        // Reset form
        orderForm.reset();
        updateTotal();

        // Reset button
        submitButton.classList.remove("loading");
        submitButton.disabled = false;
        submitButton.textContent = originalText;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 2000);
    });
  }
});

// Form validation styling
function addValidationStyling() {
  const inputs = document.querySelectorAll(
    "#orderForm input, #orderForm textarea"
  );

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.classList.add("error");
      } else {
        this.classList.remove("error");
        this.classList.add("success");
      }
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("error") && this.value.trim()) {
        this.classList.remove("error");
        this.classList.add("success");
      }
    });
  });
}

// Initialize validation styling
document.addEventListener("DOMContentLoaded", addValidationStyling);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add hover effects for interactive elements
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effect to shipping options
  const shippingLabels = document.querySelectorAll(".shipping-option");
  shippingLabels.forEach((label) => {
    label.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f9fafb";
    });
    label.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });

  // Add service icon hover effects
  const serviceItems = document.querySelectorAll(".service-item");
  serviceItems.forEach((item) => {
    const icon = item.querySelector(".service-icon");
    if (icon) {
      item.addEventListener("mouseenter", () => {
        icon.style.transform = "scale(1)";
        icon.style.transition = "transform 0.3s ease";
      });
      item.addEventListener("mouseleave", () => {
        icon.style.transform = "scale(1)";
      });
    }
  });
});

// Touch support for mobile carousel
let isDown = false;
let startX;
let scrollLeft;

const carousel = document.getElementById("reviewsCarousel");

if (carousel) {
  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    carousel.classList.add("active");
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
    carousel.classList.remove("active");
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
    carousel.classList.remove("active");
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });

  // Touch events for mobile
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!startX) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".product-card, .feature-item, .service-item"
  );
  animateElements.forEach((el) => observer.observe(el));
});
