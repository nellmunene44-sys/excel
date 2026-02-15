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

const forms = document.querySelectorAll(".contact-form");
const directEmail = "thuomunene04@gmail.com";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlParams = new URLSearchParams(window.location.search);

if (document.body.dataset.page === "contact" && urlParams.get("submitted") === "1") {
  const successBanner = document.getElementById("contact-success");

  if (successBanner) {
    successBanner.hidden = false;
  }
}

forms.forEach((form) => {
  const feedback = form.querySelector(".form-feedback");
  const requiredFields = form.querySelectorAll("input[required], textarea[required]");
  const deliveryMode = form.dataset.delivery || "";
  const nextInput = form.querySelector('input[name="_next"]');

  if (deliveryMode === "email" && nextInput && !nextInput.value) {
    const cleanPath = `${window.location.origin}${window.location.pathname}`;
    nextInput.value = `${cleanPath}?submitted=1#contact-main`;
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

const sampleFilters = document.querySelectorAll(".sample-filter");
const sampleCards = document.querySelectorAll(".sample-card");
const sampleSort = document.getElementById("sample-sort");
const sampleGrid = document.querySelector(".project-type-grid");
const sampleExternalLinks = document.querySelectorAll(".sample-external-link");
let activeSampleFilter = "all";

const getCardTags = (card) => {
  const rawTags = card.dataset.tags || "";
  return rawTags.split(",").map((tag) => tag.trim()).filter(Boolean);
};

const applySampleVisibility = () => {
  sampleCards.forEach((card) => {
    const tags = getCardTags(card);
    const isVisible = activeSampleFilter === "all" || tags.includes(activeSampleFilter);
    card.classList.toggle("sample-card-hidden", !isVisible);
  });
};

const applySampleSort = () => {
  if (!sampleGrid) {
    return;
  }

  const sortValue = sampleSort ? sampleSort.value : "most-relevant";
  const cards = Array.from(sampleCards);

  cards.sort((a, b) => {
    const aRank = Number(a.dataset.rank || 999);
    const bRank = Number(b.dataset.rank || 999);

    if (sortValue === "most-relevant") {
      return aRank - bRank;
    }

    const aTags = getCardTags(a);
    const bTags = getCardTags(b);
    const aMatch = aTags.includes(sortValue) ? 0 : 1;
    const bMatch = bTags.includes(sortValue) ? 0 : 1;

    if (aMatch !== bMatch) {
      return aMatch - bMatch;
    }

    return aRank - bRank;
  });

  cards.forEach((card) => {
    sampleGrid.appendChild(card);
  });
};

if (sampleFilters.length > 0 && sampleCards.length > 0) {
  sampleFilters.forEach((button) => {
    button.addEventListener("click", () => {
      activeSampleFilter = button.dataset.filter || "all";
      sampleFilters.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      applySampleVisibility();
    });
  });

  applySampleSort();
  applySampleVisibility();
}

if (sampleSort && sampleCards.length > 0) {
  sampleSort.addEventListener("change", () => {
    applySampleSort();
    applySampleVisibility();
  });
}

if (sampleExternalLinks.length > 0) {
  sampleExternalLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const currentCount = Number(localStorage.getItem("sample_link_click_count") || "0");
      localStorage.setItem("sample_link_click_count", String(currentCount + 1));
    });
  });
}
