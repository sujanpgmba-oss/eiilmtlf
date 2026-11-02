// sliding card javascript

(function () {
  const slider = document.getElementById('slider');
  const cards = Array.from(slider.querySelectorAll('.card'));
  const dotsBox = document.getElementById('dots');
  const n = cards.length;
  const INTERVAL = 3000;
  let active = 0, timer = null, hovering = false;

  const dots = cards.map((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Go to card ' + (i + 1));
    b.onclick = () => { go(i); restart(); };
    dotsBox.appendChild(b);
    return b;
  });

  function render() {
    const step = parseFloat(getComputedStyle(slider).getPropertyValue('--step')) || 280;
    cards.forEach((card, i) => {
      // shortest circular distance from the active (centre) card
      let d = ((i - active) % n + n) % n;
      if (d > n / 2) d -= n;
      const abs = Math.abs(d);
      const scale = abs === 0 ? 1 : abs === 1 ? 0.86 : 0.72;
      const opacity = abs === 0 ? 1 : abs === 1 ? 0.5 : abs === 2 ? 0.2 : 0;
      card.style.transform = 'translateX(' + (d * step) + 'px) scale(' + scale + ')';
      card.style.opacity = opacity;
      card.style.zIndex = 10 - abs;
      card.style.filter = abs === 0 ? 'none' : 'blur(' + (abs * 0.7) + 'px) grayscale(.4)';
      card.style.pointerEvents = abs > 2 ? 'none' : 'auto';
      card.classList.toggle('is-active', abs === 0);
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === active));
  }

  function go(i) { active = (i + n) % n; render(); }
  function next() { go(active + 1); }
  function prev() { go(active - 1); }

  function start() { stop(); timer = setInterval(() => { if (!hovering) next(); }, INTERVAL); }
  function stop() { clearInterval(timer); }
  function restart() { if (!hovering) start(); }

  // Pause while the cursor is on any card
  cards.forEach((card, i) => {
    card.addEventListener('mouseenter', () => { hovering = true; stop(); });
    card.addEventListener('mouseleave', () => { hovering = false; start(); });
    // Clicking a faded side card brings it to the centre
    card.addEventListener('click', (e) => {
      if (!card.classList.contains('is-active') && !e.target.closest('.view-more-btn')) { e.preventDefault(); go(i); }
    });
  });

  document.getElementById('next').onclick = () => { next(); restart(); };
  document.getElementById('prev').onclick = () => { prev(); restart(); };
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); restart(); }
    if (e.key === 'ArrowLeft') { prev(); restart(); }
  });
  window.addEventListener('resize', render);

  render();
  start();
})();
const INTERVAL = 3000;              // 3 seconds
let active = 0, timer = null, hovering = false;

function start() {
  stop();
  timer = setInterval(() => {
    if (!hovering) next();          // skip the tick while the cursor is on a card
  }, INTERVAL);
}
function stop() { clearInterval(timer); }
// ===================================================
      // 8. 24/7 AI CHATBOT LOGIC ENGINE
      // ===================================================
      function toggleTlfChat() {
        const win = document.getElementById('tlfChatWindow');
        const icon = document.getElementById('tlfChatIcon');
        if (win.style.display === 'flex') {
          win.style.display = 'none';
          icon.className = 'icon-chat';
        } else {
          win.style.display = 'flex';
          icon.className = 'icon-close';
          document.getElementById('tlfChatInput').focus();
        }
      }

      function sendSuggestedQuery(text) {
        document.getElementById('tlfChatInput').value = text;
        handleChatSubmit(new Event('submit'));
      }

      function handleChatSubmit(e) {
        if (e) e.preventDefault();
        const input = document.getElementById('tlfChatInput');
        const query = input.value.trim();
        if (!query) return false;

        appendChatMessage(query, 'user');
        input.value = '';

        const indicator = document.getElementById('tlfTypingIndicator');
        indicator.style.display = 'block';
        scrollChatToBottom();

        // 24/7 AI Response Engine
        setTimeout(() => {
          indicator.style.display = 'none';
          const reply = generateAiResponse(query);
          appendChatMessage(reply, 'bot');
          scrollChatToBottom();
        }, 600);

        return false;
      }

      function appendChatMessage(text, sender) {
        const body = document.getElementById('tlfChatBody');
        const msgDiv = document.createElement('div');
        msgDiv.className = `tlf-chat-msg ${sender}`;
        msgDiv.innerHTML = text;
        body.insertBefore(msgDiv, document.getElementById('tlfTypingIndicator'));
      }

      function scrollChatToBottom() {
        const body = document.getElementById('tlfChatBody');
        body.scrollTop = body.scrollHeight;
      }

      function generateAiResponse(input) {
        const text = input.toLowerCase();
        
        if (text.includes('donate') || text.includes('donation') || text.includes('payment') || text.includes('upi')) {
          return 'You can donate directly to Towards Life Foundation using our <a href="donate.html" style="color:#027bb9; font-weight:bold;">Donate Section</a> via UPI, Credit/Debit Cards, or Bank Transfer. Every rupee supports education and nutritional drives for street children!';
        }
        else if (text.includes('volunteer') || text.includes('join') || text.includes('teacher')) {
          return 'TLF accepts volunteer teachers exclusively from <strong>EIILM Kolkata</strong> (BCA, BBA, MCA, MBA). You can sign up through our <a href="volunteer.html" style="color:#027bb9; font-weight:bold;">Volunteer Section</a>!';
        }
        else if (text.includes('shop') || text.includes('product') || text.includes('tote') || text.includes('candle') || text.includes('buy')) {
          return 'Our children craft wonderful handmade items including painted Tote Bags (₹450) and Organic Scented Candles (₹120). Check out <a href="shop.html" style="color:#027bb9; font-weight:bold;">Our Shop</a> or visit the full marketplace!';
        }
        else if (text.includes('centre') || text.includes('center') || text.includes('location') || text.includes('where')) {
          return 'TLF runs 8 active learning centres across Kolkata, including Tollygunge, Chetla, Bidhannagar, Shyambazar, and Dum Dum, serving over 1,000 pavement children.';
        }
        else if (text.includes('about') || text.includes('who') || text.includes('mission') || text.includes('tlf')) {
          return 'Towards Life Foundation (TLF) is a CSR initiative originated at EIILM Kolkata dedicated to providing education, health, and economic self-reliance to pavement dwellers.';
        }
        else if (text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('address')) {
          return 'Reach us at <strong>info@towardslifefoundation.org</strong> or call <strong>+91 33 2289 7780</strong> at the EIILM Kolkata campus.';
        }
        else {
          return "I'm sorry, I don't have information about that. Please contact our office directly:\n\nOffice Address: EIILM Kolkata Campus, Kolkata, West Bengal, India\nPhone: +91 33 2289 7780\nEmail: info@towardslifefoundation.org";
        }
      }







// navbar javascript

 // Dynamic Single Section Isolation Handler
      function renderActiveView() {
        var urlParams = new URLSearchParams(window.location.search);
        var view = urlParams.get('view') || 'overview';

        var subviews = document.querySelectorAll('.about-subview');
        subviews.forEach(function(el) { el.classList.remove('active-view'); });

        var activeEl = document.getElementById('view-' + view);
        if (activeEl) {
          activeEl.classList.add('active-view');
        } else {
          document.getElementById('view-overview').classList.add('active-view');
        }
      }

      // testimonial auto slide//

      
(function () {
  const section = document.querySelector('.clients');
  if (!section) return;

  const radios = section.querySelectorAll('.clients__radio');
  const delay = 4000; // milliseconds between slides
  let timer;

  const next = () => {
    const i = [...radios].findIndex(r => r.checked);
    radios[(i + 1) % radios.length].checked = true; // loops back to slide 1
  };
  const start = () => { stop(); timer = setInterval(next, delay); };
  const stop = () => clearInterval(timer);

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    start();
    section.addEventListener('mouseenter', stop);   // pause on hover
    section.addEventListener('mouseleave', start);
    section.addEventListener('focusin', stop);      // pause on keyboard focus
    section.addEventListener('focusout', start);
    radios.forEach(r => r.addEventListener('change', start)); // restart timer after a dot click
  }
})();
