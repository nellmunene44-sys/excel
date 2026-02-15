const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const currentPage = document.body.dataset.page;

if (currentPage) {
  const navLink = document.querySelector(`[data-nav="${currentPage}"]`);

  if (navLink) {
    navLink.classList.add("active");
    navLink.setAttribute("aria-current", "page");
  }
}

const trackEvent = (eventName, props = {}) => {
  if (typeof window.plausible === "function") {
    window.plausible(eventName, { props });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, props);
  }
};

window.trackEvent = trackEvent;

const forms = document.querySelectorAll(".contact-form");
const directEmail = "thuomunene04@gmail.com";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

forms.forEach((form) => {
  const feedback = form.querySelector(".form-feedback");
  const requiredFields = form.querySelectorAll("input[required], textarea[required], select[required]");
  const deliveryMode = form.dataset.delivery || "";
  const nextInput = form.querySelector('input[name="_next"]');

  if (deliveryMode === "email" && nextInput && !nextInput.value) {
    const thankYouUrl = new URL("thank-you.html", window.location.href);
    thankYouUrl.searchParams.set("source", currentPage || "site");
    nextInput.value = thankYouUrl.toString();
  }

  const clearErrors = () => {
    requiredFields.forEach((field) => {
      field.classList.remove("input-error");
      const errorSlot = form.querySelector(`.field-error[data-for="${field.id}"]`);

      if (errorSlot) {
        errorSlot.textContent = "";
      }
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    requiredFields.forEach((field) => {
      const value = field.value.trim();
      const errorSlot = form.querySelector(`.field-error[data-for="${field.id}"]`);

      if (!value) {
        isValid = false;
        field.classList.add("input-error");

        if (errorSlot) {
          errorSlot.textContent = "This field is required.";
        }

        return;
      }

      if (field.type === "email" && !emailPattern.test(value)) {
        isValid = false;
        field.classList.add("input-error");

        if (errorSlot) {
          errorSlot.textContent = "Enter a valid email address.";
        }
      }
    });

    if (!isValid) {
      if (feedback) {
        feedback.textContent = "Please fix the highlighted fields and submit again.";
      }

      return;
    }

    trackEvent("form_submit", {
      page: currentPage || "unknown",
      form: form.id || form.className || "contact-form"
    });

    if (deliveryMode === "email") {
      if (feedback) {
        feedback.textContent = "Submitting your message...";
      }

      form.submit();
      return;
    }

    form.reset();

    if (feedback) {
      feedback.innerHTML = `Thanks. Your message is ready to review. You can also email me directly at <a href="mailto:${directEmail}">${directEmail}</a>.`;
    }
  });
});
