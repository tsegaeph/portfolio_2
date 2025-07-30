document.addEventListener("DOMContentLoaded", () => {
  const aboutTextEl = document.getElementById("aboutText");

  // Function to run typing
  function typeEffect(el, fullText, index = 0) {
    if (index < fullText.length) {
      if (fullText.substring(index, index + 4) === "<br>") {
        el.innerHTML += "<br>";
        index += 4;
      } else {
        el.innerHTML += fullText.charAt(index);
        index++;
      }
      setTimeout(() => typeEffect(el, fullText, index), 40);
    }
  }

  // Scroll Observer for About Typing
  if (aboutTextEl) {
    const fullText = aboutTextEl.getAttribute("data-text");

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeEffect(aboutTextEl, fullText);
          observer.unobserve(entry.target); // run only once
        }
      });
    }, {
      threshold: 0.5
    });

    observer.observe(aboutTextEl);
  }

  // Animate status boxes on scroll
  const statusBoxes = document.querySelectorAll(".status-box");

  const boxObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statusBoxes.forEach((box, index) => {
          setTimeout(() => {
            box.classList.add("show");
          }, index * 150); // stagger animation
        });
        observer.disconnect(); // only run once
      }
    });
  }, { threshold: 0.5 });

  const aboutSection = document.querySelector(".about-container");
  if (aboutSection) {
    boxObserver.observe(aboutSection);
  }

  // Typing effect for hero section
  const typedText = document.querySelector(".typed-text");
  const words = ["developer", "designer", "software engineer"];
  let wordIndex = 0;
  let charIndex = 0;
  let typing = true;

  function loopTyping() {
    const currentWord = words[wordIndex];

    if (typing) {
      typedText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        typing = false;
        setTimeout(loopTyping, 1200);
        return;
      }
    } else {
      typedText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        typing = true;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(loopTyping, typing ? 100 : 60);
  }

  if (typedText) loopTyping();

  // -------------------------------
  // 🖼️ Hobby Section: Manual Image Slider + Modal
  // -------------------------------

  const slider = document.querySelector('.slider');
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");

  if (slider) {
    // Buttons
    document.querySelector(".slide-btn.prev")?.addEventListener("click", () => {
      slider.scrollBy({ left: -300, behavior: 'smooth' });
    });

    document.querySelector(".slide-btn.next")?.addEventListener("click", () => {
      slider.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Image Zoom Modal
    slider.querySelectorAll("img").forEach(img => {
      img.addEventListener("click", () => {
        // Only enable modal if screen is larger than 768px
        if (window.innerWidth > 768) {
          modal.style.display = "block";
          modalImg.src = img.src;
        }
      });
    });
  }

  // Close modal on click anywhere
  if (modal) {
    modal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');

  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('show');
  });


});
