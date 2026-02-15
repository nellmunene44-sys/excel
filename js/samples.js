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

      if (typeof window.trackEvent === "function") {
        window.trackEvent("samples_filter", { filter: activeSampleFilter });
      }
    });
  });

  applySampleSort();
  applySampleVisibility();
}

if (sampleSort && sampleCards.length > 0) {
  sampleSort.addEventListener("change", () => {
    applySampleSort();
    applySampleVisibility();

    if (typeof window.trackEvent === "function") {
      window.trackEvent("samples_sort", { sort: sampleSort.value });
    }
  });
}

if (sampleExternalLinks.length > 0) {
  sampleExternalLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (typeof window.trackEvent === "function") {
        window.trackEvent("sample_open", {
          sample: link.closest(".sample-card")?.id || "unknown"
        });
      }
    });
  });
}
