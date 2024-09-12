document.addEventListener("DOMContentLoaded", function () {
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
});
