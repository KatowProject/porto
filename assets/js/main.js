document.addEventListener("DOMContentLoaded", function () {
  // Matrix Background Effect - Optimized
  function createMatrixEffect() {
    const matrixBg = document.getElementById("matrix-bg");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    // Set canvas size to match jumbotron
    const jumbotron = document.querySelector('.jumbotron');
    canvas.width = jumbotron.offsetWidth;
    canvas.height = jumbotron.offsetHeight;
    matrixBg.appendChild(canvas);
    
    const matrix = "01";  // Simplified characters
    const matrixArray = matrix.split("");
    
    const fontSize = 16;  // Larger font = fewer characters
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.floor(Math.random() * canvas.height / fontSize);
    }
    
    let animationId;
    
    function draw() {
      ctx.fillStyle = "rgba(15, 103, 177, 0.08)";  // Lighter fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#00ffff";
      ctx.font = fontSize + "px monospace";
      
      // Draw fewer characters
      for (let i = 0; i < drops.length; i += 2) {  // Skip every other column
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationId = requestAnimationFrame(draw);
    }
    
    // Use requestAnimationFrame instead of setInterval
    draw();
    
    window.addEventListener("resize", function() {
      const jumbotron = document.querySelector('.jumbotron');
      canvas.width = jumbotron.offsetWidth;
      canvas.height = jumbotron.offsetHeight;
    });
    
    // Pause animation when not visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          cancelAnimationFrame(animationId);
        } else {
          draw();
        }
      });
    });
    
    observer.observe(canvas);
  }
  
  createMatrixEffect();

  // Auto-update copyright year
  function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = currentYear;
    }
  }
  
  updateCopyrightYear();

  document.querySelector(".hamburger").addEventListener("click", function () {
    document.querySelector(".nav-list").classList.toggle("active");
  });

  function typeEffect(element, speed, callback) {
    const text = element.innerHTML;
    element.innerHTML = "";
    let i = 0;
    const timer = setInterval(function () {
      if (i < text.length) {
        element.append(text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        if (callback) callback();
      }
    }, speed);
  }

  function addDots(element, interval) {
    let dots = "";
    setInterval(function () {
      if (dots.length < 3) {
        dots += ".";
      } else {
        dots = "";
      }
      element.innerHTML = element.innerHTML.replace(/\.*$/, dots);
    }, interval);
  }

  const title = document.getElementById("jumbotron-title");
  const description = document.getElementById("jumbotron-description");

  typeEffect(title, 100);
  setTimeout(() => {
    typeEffect(description, 100, () => {
      addDots(description, 500);
    });
  }, title.innerHTML.length * 100 + 500);

  const btnRedirect = document.querySelectorAll('a[href^="#"]');
  const navbarHeight = document.querySelector("nav").offsetHeight;

  btnRedirect.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      document.querySelector(".nav-list").classList.remove("active");
    });
  });

  // Optimized scroll reveal animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards with throttling
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Stagger observations to reduce initial load
    setTimeout(() => {
      observer.observe(card);
    }, index * 50);
  });
});
