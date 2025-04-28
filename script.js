// JavaScript for Bootstrap (This line is a comment and doesn't affect the code)

// Ensure the DOM is fully loaded before running any JavaScript
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Preloader functionality (No direct matching element in HTML, will still run)
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(preloader);

    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });

    // Scroll Progress Bar functionality (No direct matching element in HTML, will still run)
    const progressBar = document.createElement('div');
    progressBar.className = 'progress'; // Changed class name to 'progress'
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });

    // Smooth Scrolling for Navigation Links functionality
    document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(anchor => { // Corrected selector
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Dynamic Navbar Highlighting functionality
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link'); // Corrected selector
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    // Dark Mode Toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const toggleIcon = themeToggle.querySelector('i');

      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        toggleIcon.className = isDarkMode ? 'bi bi-sun' : 'bi bi-moon';

        document.querySelectorAll('section, footer').forEach(section => {
          section.classList.toggle('bg-dark', isDarkMode);
          section.classList.toggle('text-white', isDarkMode);
          if (!isDarkMode) {
            if (section.id === 'services' || section.id === 'projects' || section.id === 'contact') {
              section.classList.add('bg-light');
            } else {
              section.classList.remove('bg-light');
            }
          }
        });

        document.querySelectorAll('.card').forEach(card => {
          card.classList.toggle('bg-secondary', isDarkMode);
          card.classList.toggle('text-white', isDarkMode);
        });
      });
    }

    // Search Modal and Functionality
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
      const searchModal = document.createElement('div');
      searchModal.className = 'search-modal';
      searchModal.innerHTML = `
        <div class="search-modal-content">
          <span class="close-search">×</span>
          <input type="text" id="search-input" placeholder="Search projects (e.g., Portfolio, Landing Page)" />
          <button id="search-submit">Search</button>
        </div>
      `;

      document.body.appendChild(searchModal);

      const closeSearch = searchModal.querySelector('.close-search');
      const searchInput = searchModal.querySelector('#search-input');
      const searchSubmit = searchModal.querySelector('#search-submit');

      searchBtn.addEventListener('click', () => {
        searchModal.style.display = 'flex';
        searchInput.focus();
      });

      closeSearch.addEventListener('click', () => {
        searchModal.style.display = 'none';
        searchInput.value = '';
        document.querySelectorAll('#projects .card').forEach(project => {
          project.style.display = 'block';
          project.classList.remove('highlight');
        });
      });

      searchSubmit.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
          const projects = document.querySelectorAll('#projects .card');
          let found = false;
          projects.forEach(project => {
            const title = project.querySelector('.card-title').textContent.toLowerCase();
            project.style.display = 'none';
            project.classList.remove('highlight');
            if (title.includes(searchTerm.toLowerCase())) {
              project.style.display = 'block';
              project.classList.add('highlight');
              found = true;
            }
          });
          if (!found) {
            alert('No projects found matching your search.');
            projects.forEach(project => {
              project.style.display = 'block';
              project.classList.remove('highlight');
            });
          }
          searchModal.style.display = 'none';
          searchInput.value = '';
        }
      });

      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          searchSubmit.click();
        }
      });
    }

    // Contact Form Submission (No form element with id 'contact-form' found in HTML)
    // This part of the script will not find a matching element and thus won't execute.
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      const submitButton = contactForm.querySelector('button[type="submit"]');

      if (nameInput && emailInput && messageInput && submitButton) {
        [nameInput, emailInput, messageInput].forEach(input => {
          input.disabled = false;
          input.readOnly = false;
          input.setAttribute('autocomplete', 'off');
        });

        contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          console.log('Form submission triggered');

          const name = nameInput.value.trim();
          const email = emailInput.value.trim();
          const message = messageInput.value.trim();

          if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
          }

          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
          }

          const scrollY = window.scrollY;
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';

          setTimeout(() => {
            alert(`Message sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We’ll get back to you soon.';
            contactForm.parentElement.appendChild(successMessage);

            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';

            setTimeout(() => {
              if (successMessage.parentElement) {
                successMessage.remove();
              }
            }, 5000);

            window.scrollTo({ top: scrollY, behavior: 'instant' });
          }, 1000);
        });
      }
    }

    // Back-to-Top Button (No direct matching element in HTML, will still run)
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTopBtn.className = 'btn btn-primary back-to-top';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hover Effects on Cards
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
      });
      card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
      });
    });

    // Intersection Observer for Section Animations (No specific classes for 'visible' animation in HTML)
    const observerOptions = {
      threshold: 0.2
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Assuming you have CSS rule for .visible
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    // Carousel Indicators for Testimonials
    const carousel = document.getElementById('testimonialCarousel');
    if (carousel) {
      const items = carousel.querySelectorAll('.carousel-item');
      const indicators = document.createElement('div');
      indicators.className = 'carousel-indicators';

      items.forEach((item, index) => {
        const indicator = document.createElement('button');
        indicator.setAttribute('type', 'button');
        indicator.setAttribute('data-bs-target', '#testimonialCarousel');
        indicator.setAttribute('data-bs-slide-to', index);
        if (index === 0) indicator.className = 'active';
        indicators.appendChild(indicator);
      });
      carousel.appendChild(indicators);
    }

  } catch (error) {
    console.error('Error in script.js:', error);
  }
});