/* ================= COMPUTER EDUCATION PAGE JS ================= */
/* All JS specific to Computer Education page goes here */

(function() {

  // ================= HERO SLIDER =================
  var currentSlide = 0;
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('#heroDots .dot');
  var slideInterval;
  var slideIntervalTime = 5000; // 5 seconds

  function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach(function(slide, i) {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach(function(dot, i) {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    var nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    var prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, slideIntervalTime);
  }

  function resetAutoPlay() {
    clearInterval(slideInterval);
    startAutoPlay();
  }

  // Arrow navigation
  var prevBtn = document.getElementById('heroPrevBtn');
  var nextBtn = document.getElementById('heroNextBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      prevSlide();
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      nextSlide();
      resetAutoPlay();
    });
  }

  // Dot navigation
  dots.forEach(function(dot) {
    dot.addEventListener('click', function(e) {
      var targetIndex = parseInt(e.target.getAttribute('data-index'), 10);
      showSlide(targetIndex);
      resetAutoPlay();
    });
  });

  // Start auto-play on load
  if (slides.length > 0) {
    startAutoPlay();
  }

  // ================= SMOOTH SCROLL =================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ================= PROGRAM CARD HOVER EFFECTS =================
  var programCards = document.querySelectorAll('.ce-program-card');
  programCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)';
    });
  });

})();
