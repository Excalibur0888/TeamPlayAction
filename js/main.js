// TeamPlayAction - Fantasy Basketball Website

// Helper functions
const selectElement = (selector) => {
  return document.querySelector(selector);
};

const selectAllElements = (selector) => {
  return document.querySelectorAll(selector);
};

// DOM Elements
const header = selectElement('.header');
const menuToggle = selectElement('.menu-toggle');
const navMenu = selectElement('.nav-menu');
const scrollTopBtn = selectElement('.scroll-top');
const body = document.body;

// Toggle scroll lock for mobile menu
const toggleScrollLock = (isLocked) => {
  if (isLocked) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = '';
  }
};

// Mobile menu toggle
const toggleMenu = () => {
  navMenu.classList.toggle('active');
  // Toggle scroll lock based on menu state
  toggleScrollLock(navMenu.classList.contains('active'));
};

// Handle header scroll
const handleScroll = () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

// Initialize the website
const init = () => {
  // Event listeners
  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
  
  // Add scroll event listener for header
  window.addEventListener('scroll', handleScroll);
  
  // Execute once to set initial state
  handleScroll();
  
  // Close mobile menu and unlock scroll when clicking outside the menu
  document.addEventListener('click', (event) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(event.target) && 
        !menuToggle.contains(event.target)) {
      navMenu.classList.remove('active');
      toggleScrollLock(false);
    }
  });
  
  if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Initialize testimonial slider
  initTestimonialSlider();
  
  // Update news dates
  updateNewsDates();
  
  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = selectAllElements('.nav-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || 
        (currentPage === 'index.html' && linkHref === '/') || 
        (currentPage === '' && linkHref === '/')) {
      link.classList.add('active');
    }
  });
};

// Initialize testimonial slider
const initTestimonialSlider = () => {
  const navButtons = selectAllElements('.testimonial-nav-button');
  const slides = selectAllElements('.testimonial-slide');
  const prevButton = selectElement('.testimonial-prev');
  const nextButton = selectElement('.testimonial-next');
  
  if (!navButtons.length) return;
  
  // Функция для переключения на конкретный слайд
  const switchToSlide = (slideIndex) => {
    // Remove active class from all slides and buttons
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    navButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to the selected slide and button
    slides[slideIndex].classList.add('active');
    navButtons[slideIndex].classList.add('active');
  };
  
  // Обработчики для точек навигации
  navButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      switchToSlide(index);
    });
  });
  
  // Обработчики для стрелок
  if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
      // Находим текущий активный слайд
      let currentIndex = 0;
      slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
          currentIndex = index;
        }
      });
      
      // Определяем предыдущий слайд (с циклическим переходом)
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = slides.length - 1;
      }
      
      switchToSlide(prevIndex);
    });
    
    nextButton.addEventListener('click', () => {
      // Находим текущий активный слайд
      let currentIndex = 0;
      slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
          currentIndex = index;
        }
      });
      
      // Определяем следующий слайд (с циклическим переходом)
      let nextIndex = (currentIndex + 1) % slides.length;
      
      switchToSlide(nextIndex);
    });
  }
};

// Update news dates to current dates
const updateNewsDates = () => {
  const newsDateElements = selectAllElements('.news-date');
  if (!newsDateElements.length) return;
  
  // Get current date
  const currentDate = new Date();
  
  // Prepare dates for the news items (current date and dates for previous news)
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  
  // Update dates for all news items
  newsDateElements.forEach((dateElement, index) => {
    // Create a date that's 5*index days before the current date for older news
    const newsDate = new Date(currentDate);
    newsDate.setDate(currentDate.getDate() - (5 * index));
    
    // Format date as "Month Day, Year"
    const formattedDate = newsDate.toLocaleDateString('en-US', dateOptions);
    
    // Update the element
    dateElement.textContent = formattedDate;
  });
};

// Call the init function when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 