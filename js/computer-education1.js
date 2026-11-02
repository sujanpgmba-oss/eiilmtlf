// 1. Switch Age Streams (Younger Learners vs Class 9 & 10)
function activateStream(streamId, clickedBtn) {
  const tabs = document.querySelectorAll('.ce-toggle-pill');
  tabs.forEach(tab => tab.classList.remove('active'));
  clickedBtn.classList.add('active');

  const youngerStream = document.getElementById('stream-younger');
  const advancedStream = document.getElementById('stream-advanced');

  if (streamId === 'younger') {
    advancedStream.style.display = 'none';
    youngerStream.style.display = 'flex';
  } else {
    youngerStream.style.display = 'none';
    advancedStream.style.display = 'flex';
  }
}

// 2. Interactive Branch Selection
function highlightBranch(cardElement) {
  document.querySelectorAll('.ce-branch-card').forEach(card => card.classList.remove('active'));
  cardElement.classList.add('active');
}

// 3. Smooth Intersection Count-Up Animation
document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.count-up');
  let animated = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(item => {
          const target = +item.getAttribute('data-target');
          let current = 0;
          const stepTime = 60;
          const step = Math.ceil(target / (1000 / stepTime)) || 1;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              item.innerText = target;
              clearInterval(timer);
            } else {
              item.innerText = current;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-section');
  if (statsSection) countObserver.observe(statsSection);
});