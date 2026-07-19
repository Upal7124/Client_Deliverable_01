function analytics(action) {
  console.log(
    `[Analytics] User interacted with Independent Bookstore Events Page (${action})`,
  );
}

function sanitize(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");
const loader = document.getElementById("loader");
const emptyState = document.getElementById("emptyState");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  analytics("Search");

  loader.hidden = false;

  emptyState.textContent = "";

  setTimeout(() => {
    loader.hidden = true;

    const keyword = sanitize(searchInput.value.trim().toLowerCase());

    let found = false;

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();

      if (keyword === "") {
        card.style.display = "flex";
        found = true;
      } else {
        const words = text.split(/\W+/);

        if (words.includes(keyword)) {
          card.style.display = "flex";
          found = true;
        } else {
          card.style.display = "none";
        }
      }
    });

    if (!found) {
      emptyState.textContent = "No matching events found.";
    } else {
      emptyState.textContent = "";
    }
  }, 1000);
});

const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!registrationForm.checkValidity()) {
    registrationForm.reportValidity();
    return;
  }

  const formData = new FormData(registrationForm);

  const data = {};

  formData.forEach((value, key) => {
    data[key] = sanitize(value);
  });

  console.log("Sanitized Data:", data);

  analytics("Registration");

  alert("Registration Successful!");

  registrationForm.reset();
});

const registerButtons = document.querySelectorAll(".register-btn");

registerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    analytics("Register Button");
  });
});
const menuToggle = document.getElementById("menu-toggle");

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.checked = false;
  });
});

const exploreBtn = document.querySelector(".hero .btn");

if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    analytics("Explore Events");
  });
}
