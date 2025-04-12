// Function to handle form submission

//for showing diffrent skills dynamically
const roles = ["Web Developer", "Digital Marketer", "Front-End Developer", "Back-End Developer"];
let index = 0;
let textIndex = 0;
let isDeleting = false;
const roleElement = document.getElementById("dynamic-role");

function typeEffect() {
  let currentRole = roles[index];
  if (!isDeleting) {
    roleElement.textContent = currentRole.substring(0, textIndex + 1);
    textIndex++;
    if (textIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 500);
      return;
    }
  } else {
    roleElement.textContent = currentRole.substring(0, textIndex - 1);
    textIndex--;
    if (textIndex === 0) {
      isDeleting = false;
      index = (index + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 40 : 200);
}

typeEffect();

//seach function
function handleSearch() {
  const input = document.getElementById("search-input").value.trim().toLowerCase();
  if (!input) return;

  // Clear previous highlights
  document.querySelectorAll("mark").forEach(m => m.replaceWith(m.textContent));

  let scrolled = false, found = false;

  document.querySelectorAll("section, article, div:not(#search-bar)").forEach(block => {
    const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const i = node.nodeValue.toLowerCase().indexOf(input);
      if (i !== -1) {
        const span = document.createElement("span");
        span.innerHTML = node.nodeValue.slice(0, i) +
                         `<mark>${node.nodeValue.slice(i, i + input.length)}</mark>` +
                         node.nodeValue.slice(i + input.length);
        node.parentNode.replaceChild(span, node);

        if (!scrolled) {
          span.scrollIntoView({ behavior: "smooth", block: "center" });
          scrolled = true;
        }

        found = true;
        break;
      }
    }
  });

  if (!found) alert("No results found.");
}






//contact form

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  emailjs.sendForm("service_wgjfbym","template_s9euaau", this)
    .then(function() {
      document.getElementById("response-msg").innerText = "✅ Message sent successfully!";
    }, function(error) {
      document.getElementById("response-msg").innerText = "❌ Failed to send: " + error.text;
    });

  this.reset();
});
  

  // menu button

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const sideMenu = document.getElementById("side-menu");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close-btn");
const navItems = document.querySelectorAll('.nav-item');

// Open side menu
menuToggle.addEventListener("click", () => {
  sideMenu.classList.add("open");
  overlay.classList.add("active");
});

// Close side menu
closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("open");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  sideMenu.classList.remove("open");
  overlay.classList.remove("active");
});

// Animate menu items on click
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('clicked'));
    item.classList.add('clicked');

    // Auto-close side menu on mobile
    sideMenu.classList.remove("open");
    overlay.classList.remove("active");
  });
});

// dark mode toogle bubtton
const toggleBtn = document.getElementById('dark-mode-toggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
